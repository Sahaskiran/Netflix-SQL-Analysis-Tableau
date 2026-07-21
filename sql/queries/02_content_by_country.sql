/*
 * File: 02_content_by_country.sql
 * Description: Geographic analysis of Netflix content.
 * Author context: Generated for Netflix SQL Analysis project.
 */

USE netflix_db;

-- Q1: Top 20 countries by content count
SELECT 
    c.country, 
    COUNT(c.show_id) AS total_content
FROM countries c
GROUP BY c.country
ORDER BY total_content DESC
LIMIT 20;

-- Q2: Movies vs TV Shows breakdown per country (top 15)
WITH top_countries AS (
    SELECT country 
    FROM countries 
    GROUP BY country 
    ORDER BY COUNT(show_id) DESC 
    LIMIT 15
)
SELECT 
    c.country,
    SUM(CASE WHEN t.type = 'Movie' THEN 1 ELSE 0 END) AS movie_count,
    SUM(CASE WHEN t.type = 'TV Show' THEN 1 ELSE 0 END) AS tv_show_count,
    COUNT(t.show_id) AS total_count
FROM countries c
JOIN netflix_titles t ON c.show_id = t.show_id
JOIN top_countries tc ON c.country = tc.country
GROUP BY c.country
ORDER BY total_count DESC;

-- Q3: Country content growth over time (top 5 countries, yearly)
WITH top_5_countries AS (
    SELECT country 
    FROM countries 
    GROUP BY country 
    ORDER BY COUNT(show_id) DESC 
    LIMIT 5
)
SELECT 
    YEAR(t.date_added) AS added_year,
    c.country,
    COUNT(t.show_id) AS content_added
FROM countries c
JOIN netflix_titles t ON c.show_id = t.show_id
JOIN top_5_countries tc ON c.country = tc.country
WHERE t.date_added IS NOT NULL
GROUP BY added_year, c.country
ORDER BY added_year DESC, c.country;

-- Q4: Multi-country co-production analysis (titles with multiple countries)
WITH country_counts AS (
    SELECT 
        show_id, 
        COUNT(country) AS num_countries
    FROM countries
    GROUP BY show_id
)
SELECT 
    num_countries,
    COUNT(show_id) AS titles_count
FROM country_counts
GROUP BY num_countries
ORDER BY num_countries;
