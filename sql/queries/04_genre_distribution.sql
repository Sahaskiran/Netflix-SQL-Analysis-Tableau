/*
 * File: 04_genre_distribution.sql
 * Description: Analysis of genre popularity and trends.
 * Author context: Generated for Netflix SQL Analysis project.
 */

USE netflix_db;

-- Q1: Top 15 genres by title count
SELECT 
    genre,
    COUNT(show_id) AS total_titles
FROM genres
GROUP BY genre
ORDER BY total_titles DESC
LIMIT 15;

-- Q2: Genre trends over time (top 5 genres, yearly)
WITH top_5_genres AS (
    SELECT genre 
    FROM genres 
    GROUP BY genre 
    ORDER BY COUNT(show_id) DESC 
    LIMIT 5
)
SELECT 
    YEAR(t.date_added) AS added_year,
    g.genre,
    COUNT(t.show_id) AS titles_added
FROM genres g
JOIN netflix_titles t ON g.show_id = t.show_id
JOIN top_5_genres tg ON g.genre = tg.genre
WHERE t.date_added IS NOT NULL
GROUP BY added_year, g.genre
ORDER BY added_year DESC, g.genre;

-- Q3: Genre split by content type (Movies vs TV Shows per genre)
SELECT 
    g.genre,
    SUM(CASE WHEN t.type = 'Movie' THEN 1 ELSE 0 END) AS movies_count,
    SUM(CASE WHEN t.type = 'TV Show' THEN 1 ELSE 0 END) AS tv_shows_count,
    COUNT(t.show_id) AS total_count
FROM genres g
JOIN netflix_titles t ON g.show_id = t.show_id
GROUP BY g.genre
ORDER BY total_count DESC;

-- Q4: Average titles per genre, multi-genre titles analysis
WITH genres_per_title AS (
    SELECT 
        show_id, 
        COUNT(genre) AS num_genres
    FROM genres
    GROUP BY show_id
)
SELECT 
    num_genres,
    COUNT(show_id) AS total_titles
FROM genres_per_title
GROUP BY num_genres
ORDER BY num_genres;
