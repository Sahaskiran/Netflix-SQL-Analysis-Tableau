/*
 * File: 09_duration_analysis.sql
 * Description: Analysis of title durations (movies and TV shows) for the Netflix SQL Analysis project.
 * Author context: Generated for Netflix SQL Analysis project.
 */

USE netflix_db;

-- Q1: Duration distribution - movie duration ranges (Under 60min, 60-90min, 90-120min, Over 120min) with counts
SELECT 
    CASE 
        WHEN duration_numeric < 60 THEN 'Under 60min'
        WHEN duration_numeric BETWEEN 60 AND 89 THEN '60-90min'
        WHEN duration_numeric BETWEEN 90 AND 120 THEN '90-120min'
        ELSE 'Over 120min'
    END AS duration_range,
    COUNT(*) AS title_count
FROM netflix_titles
WHERE type = 'Movie' AND duration_numeric IS NOT NULL
GROUP BY duration_range
ORDER BY 
    CASE duration_range
        WHEN 'Under 60min' THEN 1
        WHEN '60-90min' THEN 2
        WHEN '90-120min' THEN 3
        WHEN 'Over 120min' THEN 4
    END;

-- Q2: Average movie duration by year (trend)
SELECT 
    release_year,
    ROUND(AVG(duration_numeric), 2) AS avg_duration_minutes,
    COUNT(*) AS movie_count
FROM netflix_titles
WHERE type = 'Movie' AND duration_numeric IS NOT NULL
GROUP BY release_year
ORDER BY release_year DESC;

-- Q3: Average TV show seasons by year (trend)
SELECT 
    release_year,
    ROUND(AVG(duration_numeric), 2) AS avg_seasons,
    COUNT(*) AS show_count
FROM netflix_titles
WHERE type = 'TV Show' AND duration_numeric IS NOT NULL
GROUP BY release_year
ORDER BY release_year DESC;

-- Q4: Longest and shortest movies/shows (top 10 each)
-- Longest Movies
SELECT title, duration_numeric AS duration_minutes, release_year
FROM netflix_titles
WHERE type = 'Movie' AND duration_numeric IS NOT NULL
ORDER BY duration_numeric DESC
LIMIT 10;

-- Shortest Movies
SELECT title, duration_numeric AS duration_minutes, release_year
FROM netflix_titles
WHERE type = 'Movie' AND duration_numeric IS NOT NULL
ORDER BY duration_numeric ASC
LIMIT 10;

-- Longest TV Shows
SELECT title, duration_numeric AS seasons, release_year
FROM netflix_titles
WHERE type = 'TV Show' AND duration_numeric IS NOT NULL
ORDER BY duration_numeric DESC
LIMIT 10;

-- Q5: Duration by genre - average movie duration per genre (top 10 genres)
SELECT 
    g.genre,
    ROUND(AVG(t.duration_numeric), 2) AS avg_duration_minutes,
    COUNT(t.show_id) AS movie_count
FROM netflix_titles t
JOIN genres g ON t.show_id = g.show_id
WHERE t.type = 'Movie' AND t.duration_numeric IS NOT NULL
GROUP BY g.genre
ORDER BY movie_count DESC
LIMIT 10;

-- Q6: Duration by country - average movie duration per country (top 10 countries)
SELECT 
    c.country,
    ROUND(AVG(t.duration_numeric), 2) AS avg_duration_minutes,
    COUNT(t.show_id) AS movie_count
FROM netflix_titles t
JOIN countries c ON t.show_id = c.show_id
WHERE t.type = 'Movie' AND t.duration_numeric IS NOT NULL
GROUP BY c.country
ORDER BY movie_count DESC
LIMIT 10;
