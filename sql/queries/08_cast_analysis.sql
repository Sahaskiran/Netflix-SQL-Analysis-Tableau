/*
 * File: 08_cast_analysis.sql
 * Description: Analysis of cast members using the netflix_titles table and cast_members normalized table.
 * Author context: Generated for Netflix SQL Analysis project.
 */

USE netflix_db;

-- Q1: Top 20 cast members by number of titles they appear in
SELECT 
    cast_member,
    COUNT(show_id) AS title_count
FROM cast_members
GROUP BY cast_member
ORDER BY title_count DESC
LIMIT 20;

-- Q2: Most versatile actors - top 10 actors who appear across the most distinct genres
SELECT 
    c.cast_member,
    COUNT(DISTINCT g.genre) AS distinct_genres,
    GROUP_CONCAT(DISTINCT g.genre SEPARATOR ', ') AS genres_list
FROM cast_members c
JOIN genres g ON c.show_id = g.show_id
GROUP BY c.cast_member
ORDER BY distinct_genres DESC, c.cast_member ASC
LIMIT 10;

-- Q3: Top 10 actor pairs - pairs of actors who most frequently co-appear
SELECT 
    c1.cast_member AS actor_1,
    c2.cast_member AS actor_2,
    COUNT(*) AS co_appearances
FROM cast_members c1
JOIN cast_members c2 ON c1.show_id = c2.show_id
WHERE c1.cast_member < c2.cast_member -- Prevents duplicates like (A,B) and (B,A) and self-pairs
GROUP BY c1.cast_member, c2.cast_member
ORDER BY co_appearances DESC
LIMIT 10;

-- Q4: Top actors by content type - top 10 actors in Movies vs top 10 in TV Shows
WITH ActorTypeCounts AS (
    SELECT 
        c.cast_member,
        t.type,
        COUNT(c.show_id) AS appearance_count,
        RANK() OVER(PARTITION BY t.type ORDER BY COUNT(c.show_id) DESC) AS rnk
    FROM cast_members c
    JOIN netflix_titles t ON c.show_id = t.show_id
    GROUP BY c.cast_member, t.type
)
SELECT 
    cast_member,
    type,
    appearance_count
FROM ActorTypeCounts
WHERE rnk <= 10
ORDER BY type, appearance_count DESC;
