/*
 * File: 10_top_movies_by_genre.sql
 * Description: Deep dive into genre-based analysis of Netflix content.
 * Author context: Generated for Netflix SQL Analysis project.
 */

USE netflix_db;

-- Q1: Top 5 movies in each genre by release year (most recent)
-- Showing the top 5 most recent movies for the top 10 most popular genres
WITH TopGenres AS (
    SELECT g.genre, COUNT(*) AS genre_count
    FROM genres g
    JOIN netflix_titles t ON g.show_id = t.show_id
    WHERE t.type = 'Movie'
    GROUP BY g.genre
    ORDER BY genre_count DESC
    LIMIT 10
),
RankedMovies AS (
    SELECT 
        g.genre,
        t.title,
        t.release_year,
        ROW_NUMBER() OVER (PARTITION BY g.genre ORDER BY t.release_year DESC, t.title) AS rn
    FROM genres g
    JOIN netflix_titles t ON g.show_id = t.show_id
    JOIN TopGenres tg ON g.genre = tg.genre
    WHERE t.type = 'Movie'
)
SELECT 
    genre,
    rn AS `rank`,
    title,
    release_year
FROM RankedMovies
WHERE rn <= 5
ORDER BY genre, rn;

-- Q2: Highest rated genres (genres with the highest percentage of mature content TV-MA or R)
WITH GenreCounts AS (
    SELECT 
        g.genre,
        COUNT(*) AS total_titles,
        SUM(CASE WHEN t.rating IN ('TV-MA', 'R') THEN 1 ELSE 0 END) AS mature_titles
    FROM genres g
    JOIN netflix_titles t ON g.show_id = t.show_id
    GROUP BY g.genre
    HAVING COUNT(*) > 50 -- Minimum threshold for meaningful percentage
)
SELECT 
    genre,
    total_titles,
    mature_titles,
    ROUND((mature_titles * 100.0) / total_titles, 2) AS mature_percentage
FROM GenreCounts
ORDER BY mature_percentage DESC
LIMIT 10;

-- Q3: Top 5 most popular genres for movies vs TV shows separately
WITH RankedGenres AS (
    SELECT 
        t.type,
        g.genre,
        COUNT(*) AS title_count,
        ROW_NUMBER() OVER (PARTITION BY t.type ORDER BY COUNT(*) DESC) AS rn
    FROM genres g
    JOIN netflix_titles t ON g.show_id = t.show_id
    GROUP BY t.type, g.genre
)
SELECT 
    type,
    genre,
    title_count
FROM RankedGenres
WHERE rn <= 5
ORDER BY type, rn;

-- Q4: Genre-wise average release year (newer vs older content)
SELECT 
    g.genre,
    COUNT(*) AS total_titles,
    ROUND(AVG(t.release_year)) AS avg_release_year
FROM genres g
JOIN netflix_titles t ON g.show_id = t.show_id
GROUP BY g.genre
HAVING COUNT(*) > 50
ORDER BY avg_release_year DESC;

-- Q5: Exclusive genre titles — movies that belong to only one genre
WITH TitleGenreCounts AS (
    SELECT 
        show_id,
        COUNT(genre) AS genre_count,
        MAX(genre) AS single_genre
    FROM genres
    GROUP BY show_id
    HAVING COUNT(genre) = 1
)
SELECT 
    tgc.single_genre AS genre,
    COUNT(*) AS exclusive_movies_count
FROM TitleGenreCounts tgc
JOIN netflix_titles t ON tgc.show_id = t.show_id
WHERE t.type = 'Movie'
GROUP BY tgc.single_genre
ORDER BY exclusive_movies_count DESC;
