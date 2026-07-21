/*
 * File: import_data.sql
 * Description: Data import instructions and data cleaning queries.
 * Populates main table and extracts normalized data.
 * Author context: Generated for Netflix SQL Analysis project.
 */

USE netflix_db;

-- 1. Import Data
-- Note: Update the path to the actual location of netflix_titles.csv
LOAD DATA INFILE '/path/to/netflix_titles.csv'
INTO TABLE netflix_titles
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(show_id, type, title, director, cast, country, @var_date_added, release_year, rating, duration, listed_in, description)
SET 
    -- Clean and parse date_added
    date_added = STR_TO_DATE(TRIM(@var_date_added), '%M %d, %Y'),
    -- Extract numeric duration (minutes or seasons)
    duration_numeric = CAST(REGEXP_SUBSTR(duration, '^[0-9]+') AS UNSIGNED);

-- 2. Populate Normalized Tables
-- We use recursive CTEs (MySQL 8.0+) to split comma-separated values

-- Populate genres
WITH RECURSIVE split_genres AS (
    SELECT 
        show_id,
        TRIM(SUBSTRING_INDEX(listed_in, ',', 1)) AS genre,
        SUBSTRING(listed_in, LENGTH(SUBSTRING_INDEX(listed_in, ',', 1)) + 2) AS remaining
    FROM netflix_titles
    WHERE listed_in IS NOT NULL AND listed_in != ''
    UNION ALL
    SELECT 
        show_id,
        TRIM(SUBSTRING_INDEX(remaining, ',', 1)),
        IF(LOCATE(',', remaining) > 0, SUBSTRING(remaining, LENGTH(SUBSTRING_INDEX(remaining, ',', 1)) + 2), NULL)
    FROM split_genres
    WHERE remaining IS NOT NULL
)
INSERT INTO genres (show_id, genre)
SELECT DISTINCT show_id, genre FROM split_genres;

-- Populate countries
WITH RECURSIVE split_countries AS (
    SELECT 
        show_id,
        TRIM(SUBSTRING_INDEX(country, ',', 1)) AS country,
        SUBSTRING(country, LENGTH(SUBSTRING_INDEX(country, ',', 1)) + 2) AS remaining
    FROM netflix_titles
    WHERE country IS NOT NULL AND country != ''
    UNION ALL
    SELECT 
        show_id,
        TRIM(SUBSTRING_INDEX(remaining, ',', 1)),
        IF(LOCATE(',', remaining) > 0, SUBSTRING(remaining, LENGTH(SUBSTRING_INDEX(remaining, ',', 1)) + 2), NULL)
    FROM split_countries
    WHERE remaining IS NOT NULL
)
INSERT INTO countries (show_id, country)
SELECT DISTINCT show_id, country FROM split_countries;

-- Populate directors
WITH RECURSIVE split_directors AS (
    SELECT 
        show_id,
        TRIM(SUBSTRING_INDEX(director, ',', 1)) AS director,
        SUBSTRING(director, LENGTH(SUBSTRING_INDEX(director, ',', 1)) + 2) AS remaining
    FROM netflix_titles
    WHERE director IS NOT NULL AND director != ''
    UNION ALL
    SELECT 
        show_id,
        TRIM(SUBSTRING_INDEX(remaining, ',', 1)),
        IF(LOCATE(',', remaining) > 0, SUBSTRING(remaining, LENGTH(SUBSTRING_INDEX(remaining, ',', 1)) + 2), NULL)
    FROM split_directors
    WHERE remaining IS NOT NULL
)
INSERT INTO directors (show_id, director)
SELECT DISTINCT show_id, director FROM split_directors;
