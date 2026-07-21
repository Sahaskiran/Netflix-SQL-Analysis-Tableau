/*
 * File: 03_content_over_time.sql
 * Description: Temporal analysis of content additions and release years.
 * Author context: Generated for Netflix SQL Analysis project.
 */

USE netflix_db;

-- Q1: Monthly content additions (last 5 years)
WITH last_5_years AS (
    SELECT MAX(YEAR(date_added)) - 4 AS start_year 
    FROM netflix_titles
)
SELECT 
    DATE_FORMAT(date_added, '%Y-%m') AS addition_month,
    COUNT(*) AS total_added
FROM netflix_titles
CROSS JOIN last_5_years
WHERE YEAR(date_added) >= last_5_years.start_year
GROUP BY addition_month
ORDER BY addition_month DESC;

-- Q2: Yearly content additions with cumulative total
WITH yearly_additions AS (
    SELECT 
        YEAR(date_added) AS year_added,
        COUNT(*) AS content_added
    FROM netflix_titles
    WHERE date_added IS NOT NULL
    GROUP BY YEAR(date_added)
)
SELECT 
    year_added,
    content_added,
    SUM(content_added) OVER (ORDER BY year_added) AS cumulative_total
FROM yearly_additions
ORDER BY year_added;

-- Q3: Release year distribution (content release year, not date added)
SELECT 
    release_year,
    COUNT(*) AS titles_released
FROM netflix_titles
GROUP BY release_year
ORDER BY release_year DESC;

-- Q4: Seasonal patterns (which months see most additions)
SELECT 
    MONTH(date_added) AS month_number,
    MONTHNAME(date_added) AS month_name,
    COUNT(*) AS total_additions
FROM netflix_titles
WHERE date_added IS NOT NULL
GROUP BY month_number, month_name
ORDER BY total_additions DESC;
