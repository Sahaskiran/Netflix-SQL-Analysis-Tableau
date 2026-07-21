/*
 * File: 01_movies_vs_tvshows.sql
 * Description: Analysis of Movies vs TV Shows on Netflix.
 * Author context: Generated for Netflix SQL Analysis project.
 */

USE netflix_db;

-- Q1: Count and percentage of Movies vs TV Shows
WITH total_count AS (
    SELECT COUNT(*) AS total FROM netflix_titles
)
SELECT 
    type, 
    COUNT(*) AS count,
    ROUND((COUNT(*) * 100.0) / (SELECT total FROM total_count), 2) AS percentage
FROM netflix_titles
GROUP BY type;

-- Q2: Year-over-year trend (Movies vs TV Shows added per year)
SELECT 
    YEAR(date_added) AS added_year,
    SUM(CASE WHEN type = 'Movie' THEN 1 ELSE 0 END) AS movies_added,
    SUM(CASE WHEN type = 'TV Show' THEN 1 ELSE 0 END) AS tv_shows_added,
    COUNT(*) AS total_added
FROM netflix_titles
WHERE date_added IS NOT NULL
GROUP BY YEAR(date_added)
ORDER BY added_year DESC;

-- Q3: Average duration comparison (avg minutes for movies, avg seasons for shows)
SELECT 
    type,
    ROUND(AVG(duration_numeric), 2) AS avg_duration,
    CASE 
        WHEN type = 'Movie' THEN 'Minutes'
        WHEN type = 'TV Show' THEN 'Seasons'
    END AS unit
FROM netflix_titles
WHERE duration_numeric IS NOT NULL
GROUP BY type;

-- Q4: Rating distribution per content type
SELECT 
    type,
    rating,
    COUNT(*) AS count
FROM netflix_titles
WHERE rating IS NOT NULL
GROUP BY type, rating
ORDER BY type, count DESC;
