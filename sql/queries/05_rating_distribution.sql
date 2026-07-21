/*
 * File: 05_rating_distribution.sql
 * Description: Content rating distribution and trends.
 * Author context: Generated for Netflix SQL Analysis project.
 */

USE netflix_db;

-- Q1: Overall rating distribution (count per rating)
SELECT 
    rating,
    COUNT(*) AS total_titles
FROM netflix_titles
WHERE rating IS NOT NULL
GROUP BY rating
ORDER BY total_titles DESC;

-- Q2: Rating trends over time (yearly)
SELECT 
    YEAR(date_added) AS added_year,
    rating,
    COUNT(*) AS total_titles
FROM netflix_titles
WHERE date_added IS NOT NULL AND rating IS NOT NULL
GROUP BY added_year, rating
ORDER BY added_year DESC, total_titles DESC;

-- Q3: Rating by content type (heatmap-ready: rating × type with counts)
SELECT 
    rating,
    SUM(CASE WHEN type = 'Movie' THEN 1 ELSE 0 END) AS movie_count,
    SUM(CASE WHEN type = 'TV Show' THEN 1 ELSE 0 END) AS tv_show_count,
    COUNT(*) AS total_count
FROM netflix_titles
WHERE rating IS NOT NULL
GROUP BY rating
ORDER BY total_count DESC;

-- Q4: Most common rating per top 10 genres
WITH top_10_genres AS (
    SELECT genre 
    FROM genres 
    GROUP BY genre 
    ORDER BY COUNT(show_id) DESC 
    LIMIT 10
),
genre_ratings AS (
    SELECT 
        g.genre,
        t.rating,
        COUNT(t.show_id) AS rating_count,
        ROW_NUMBER() OVER(PARTITION BY g.genre ORDER BY COUNT(t.show_id) DESC) as rn
    FROM genres g
    JOIN netflix_titles t ON g.show_id = t.show_id
    JOIN top_10_genres tg ON g.genre = tg.genre
    WHERE t.rating IS NOT NULL
    GROUP BY g.genre, t.rating
)
SELECT 
    genre, 
    rating AS most_common_rating, 
    rating_count
FROM genre_ratings
WHERE rn = 1;
