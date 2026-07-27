/*
 * File: schema.sql
 * Description: Database schema creation for Netflix SQL Analysis project.
 * Includes main table creation, indexes, and structures for normalized data.
 * Author context: Generated for Netflix SQL Analysis project.
 */

CREATE DATABASE IF NOT EXISTS netflix_db;
USE netflix_db;

-- Main table
CREATE TABLE IF NOT EXISTS netflix_titles (
    show_id VARCHAR(50) PRIMARY KEY,
    type ENUM('Movie', 'TV Show'),
    title VARCHAR(255),
    director TEXT,
    cast TEXT,
    country TEXT,
    date_added DATE,
    release_year INT,
    rating VARCHAR(20),
    duration VARCHAR(50),
    duration_numeric INT, -- Extracted numeric duration (minutes/seasons)
    listed_in TEXT,
    description TEXT
);

-- Indexes for performance
CREATE INDEX idx_type ON netflix_titles(type);
CREATE INDEX idx_release_year ON netflix_titles(release_year);
CREATE INDEX idx_rating ON netflix_titles(rating);
CREATE INDEX idx_date_added ON netflix_titles(date_added);

-- Normalized helper tables
CREATE TABLE IF NOT EXISTS genres (
    show_id VARCHAR(50),
    genre VARCHAR(100),
    FOREIGN KEY (show_id) REFERENCES netflix_titles(show_id) ON DELETE CASCADE
);
CREATE INDEX idx_genres_genre ON genres(genre);

CREATE TABLE IF NOT EXISTS countries (
    show_id VARCHAR(50),
    country VARCHAR(100),
    FOREIGN KEY (show_id) REFERENCES netflix_titles(show_id) ON DELETE CASCADE
);
CREATE INDEX idx_countries_country ON countries(country);

CREATE TABLE IF NOT EXISTS directors (
    show_id VARCHAR(50),
    director VARCHAR(255),
    FOREIGN KEY (show_id) REFERENCES netflix_titles(show_id) ON DELETE CASCADE
);
CREATE INDEX idx_directors_director ON directors(director);

CREATE TABLE IF NOT EXISTS cast_members (
    show_id VARCHAR(50),
    cast_member VARCHAR(255),
    FOREIGN KEY (show_id) REFERENCES netflix_titles(show_id) ON DELETE CASCADE
);
CREATE INDEX idx_cast_member ON cast_members(cast_member);

