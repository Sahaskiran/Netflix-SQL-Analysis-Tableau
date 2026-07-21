/*
 * File: 07_kpis.sql
 * Description: Key Performance Indicators for Netflix dataset.
 * Author context: Generated for Netflix SQL Analysis project.
 */

USE netflix_db;

-- Q1: Total Titles
SELECT COUNT(*) AS total_titles FROM netflix_titles;

-- Q2: Movies count + percentage
SELECT 
    COUNT(*) AS movies_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM netflix_titles), 2) AS movies_percentage
FROM netflix_titles
WHERE type = 'Movie';

-- Q3: TV Shows count + percentage
SELECT 
    COUNT(*) AS tv_shows_count,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM netflix_titles), 2) AS tv_shows_percentage
FROM netflix_titles
WHERE type = 'TV Show';

-- Q4: Average Movie Duration (minutes)
SELECT ROUND(AVG(duration_numeric), 2) AS avg_movie_duration_minutes
FROM netflix_titles
WHERE type = 'Movie' AND duration_numeric IS NOT NULL;

-- Q5: Average TV Show Duration (seasons)
SELECT ROUND(AVG(duration_numeric), 2) AS avg_tv_show_duration_seasons
FROM netflix_titles
WHERE type = 'TV Show' AND duration_numeric IS NOT NULL;

-- Q6: Top Genre (most common)
SELECT genre, COUNT(*) AS title_count
FROM genres
GROUP BY genre
ORDER BY title_count DESC
LIMIT 1;

-- Q7: Top Country (most content)
SELECT country, COUNT(*) AS title_count
FROM countries
GROUP BY country
ORDER BY title_count DESC
LIMIT 1;

-- Q8: Unique Directors count
SELECT COUNT(DISTINCT director) AS unique_directors
FROM directors;

-- Q9: Unique Countries count
SELECT COUNT(DISTINCT country) AS unique_countries
FROM countries;

-- Q10: Year-over-Year content growth rate (latest year vs previous year)
WITH yearly_counts AS (
    SELECT 
        YEAR(date_added) AS added_year,
        COUNT(*) AS content_count
    FROM netflix_titles
    WHERE date_added IS NOT NULL
    GROUP BY YEAR(date_added)
),
latest_years AS (
    SELECT added_year, content_count,
           LAG(content_count) OVER (ORDER BY added_year) as prev_count
    FROM yearly_counts
)
SELECT 
    added_year,
    content_count,
    prev_count,
    ROUND(((content_count - prev_count) / prev_count) * 100.0, 2) AS yoy_growth_percentage
FROM latest_years
ORDER BY added_year DESC
LIMIT 1;

-- Q11: Most Prolific Director
SELECT director, COUNT(*) AS title_count
FROM directors
GROUP BY director
ORDER BY title_count DESC
LIMIT 1;

-- Q12: Newest Content Year
SELECT MAX(release_year) AS newest_content_year
FROM netflix_titles;
