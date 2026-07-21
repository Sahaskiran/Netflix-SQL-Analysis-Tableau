/*
 * File: 06_top_directors.sql
 * Description: Analysis of directors and their content.
 * Author context: Generated for Netflix SQL Analysis project.
 */

USE netflix_db;

-- Q1: Top 20 directors by title count
SELECT 
    director,
    COUNT(show_id) AS total_titles
FROM directors
GROUP BY director
ORDER BY total_titles DESC
LIMIT 20;

-- Q2: Top directors' genre diversity (top 10 directors with their genre counts)
WITH top_10_directors AS (
    SELECT director 
    FROM directors 
    GROUP BY director 
    ORDER BY COUNT(show_id) DESC 
    LIMIT 10
)
SELECT 
    d.director,
    COUNT(DISTINCT g.genre) AS unique_genres_directed
FROM directors d
JOIN genres g ON d.show_id = g.show_id
JOIN top_10_directors td ON d.director = td.director
GROUP BY d.director
ORDER BY unique_genres_directed DESC;

-- Q3: Top directors' preferred ratings
WITH top_directors AS (
    SELECT director 
    FROM directors 
    GROUP BY director 
    ORDER BY COUNT(show_id) DESC 
    LIMIT 10
),
director_ratings AS (
    SELECT 
        d.director,
        t.rating,
        COUNT(t.show_id) AS rating_count,
        ROW_NUMBER() OVER(PARTITION BY d.director ORDER BY COUNT(t.show_id) DESC) as rn
    FROM directors d
    JOIN netflix_titles t ON d.show_id = t.show_id
    JOIN top_directors td ON d.director = td.director
    WHERE t.rating IS NOT NULL
    GROUP BY d.director, t.rating
)
SELECT 
    director,
    rating AS most_frequent_rating,
    rating_count
FROM director_ratings
WHERE rn = 1;

-- Q4: Prolific directors timeline (titles per year for top 5)
WITH top_5_directors AS (
    SELECT director 
    FROM directors 
    GROUP BY director 
    ORDER BY COUNT(show_id) DESC 
    LIMIT 5
)
SELECT 
    d.director,
    YEAR(t.date_added) AS added_year,
    COUNT(t.show_id) AS titles_added
FROM directors d
JOIN netflix_titles t ON d.show_id = t.show_id
JOIN top_5_directors td ON d.director = td.director
WHERE t.date_added IS NOT NULL
GROUP BY d.director, added_year
ORDER BY d.director, added_year;
