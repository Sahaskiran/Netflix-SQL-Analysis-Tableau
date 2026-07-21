# 🎬 Netflix SQL Analysis + Tableau Dashboard

A portfolio-grade data analytics project analyzing **8,800+ Netflix titles** using **MySQL** for data analysis and a **Tableau-style interactive web dashboard** for stunning visualizations.

![Tech](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Tech](https://img.shields.io/badge/Tableau_Style-E97627?style=for-the-badge&logo=tableau&logoColor=white)
![Tech](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white)
![Tech](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ⭐ Features

### 📊 Dashboard Pages
| Page | Description | Charts |
|------|-------------|--------|
| 🎬 **Movies vs TV Shows** | Content type distribution & trends | Donut, Stacked Bar, Grouped Bar |
| 🌎 **Content by Country** | Geographic distribution analysis | Horizontal Bar, Line Trend, Donut |
| 📅 **Content Over Time** | Historical growth & seasonality | Area, Line, Bar, Combined |
| 🎭 **Genre Distribution** | Genre popularity & trends | Horizontal Bar, Line, Donut |
| ⭐ **Rating Distribution** | Age rating patterns | Donut, Grouped Bar, Polar Area |
| 🎥 **Top Directors** | Prolific creators analysis | Horizontal Bar, Radar, Combined |

### 📈 Key Performance Indicators (KPIs)
| KPI | Value |
|-----|-------|
| Total Titles | 8,807 |
| Movies | 6,131 (69.6%) |
| TV Shows | 2,676 (30.4%) |
| Avg Movie Duration | 99.6 min |
| Avg TV Show Duration | 1.7 seasons |
| Top Genre | International Movies |
| Top Country | United States |
| Unique Directors | 4,528 |
| Unique Countries | 748 |
| YoY Growth Rate | 38.2% |

---

## 🗂️ Project Structure

```
Netflix SQL Analysis + Tableau/
├── 📁 sql/
│   ├── schema.sql              # Database & table creation
│   ├── import_data.sql         # CSV import & data cleaning
│   └── 📁 queries/
│       ├── 01_movies_vs_tvshows.sql
│       ├── 02_content_by_country.sql
│       ├── 03_content_over_time.sql
│       ├── 04_genre_distribution.sql
│       ├── 05_rating_distribution.sql
│       ├── 06_top_directors.sql
│       └── 07_kpis.sql
├── 📁 dashboard/
│   ├── index.html              # Dashboard SPA
│   ├── styles.css              # Netflix dark theme + glassmorphism
│   ├── app.js                  # Chart.js visualizations + routing
│   └── data.js                 # Pre-computed analysis data
└── README.md
```

---

## 🚀 Getting Started

### View the Dashboard (No Setup Required)
Simply open `dashboard/index.html` in any modern browser — the dashboard works standalone with embedded data.

### Run the SQL Analysis

#### Prerequisites
- MySQL 8.0+ (required for recursive CTEs and window functions)
- Netflix Titles dataset CSV from [Kaggle](https://www.kaggle.com/datasets/shivamb/netflix-shows)

#### Steps

1. **Create the database & tables:**
   ```sql
   source sql/schema.sql;
   ```

2. **Import the CSV data** (update the file path in `import_data.sql`):
   ```sql
   source sql/import_data.sql;
   ```

3. **Run any analysis query:**
   ```sql
   source sql/queries/01_movies_vs_tvshows.sql;
   ```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **MySQL** | Data storage, cleaning & SQL analysis |
| **Chart.js 4** | Interactive chart visualizations |
| **HTML/CSS/JS** | Tableau-style dashboard interface |
| **Google Fonts** | Inter typography |

---

## 📋 SQL Analysis Overview

### Schema Design
- **Main table**: `netflix_titles` with 12 columns + `duration_numeric`
- **Normalized tables**: `genres`, `countries`, `directors` — exploded from comma-separated values using recursive CTEs
- **Indexes**: On `type`, `release_year`, `rating`, `date_added` for query performance

### Query Highlights
- **CTEs & Window Functions** for ranking, YoY growth, and row numbering
- **CASE expressions** for conditional aggregation
- **Recursive CTEs** for splitting multi-value fields
- **Subqueries** for percentage calculations
- **12 KPIs** computed in a single query file

---

## 🎨 Dashboard Design

- **Theme**: Netflix dark mode (`#0D0D0D`, `#1A1A2E`, `#E50914`)
- **Effects**: Glassmorphism cards, gradient text, glow effects
- **Animations**: Fade transitions, animated counter numbers, hover transforms
- **Layout**: Fixed sidebar navigation + scrollable content area
- **Responsive**: Stacks sidebar on mobile, adjusts chart grid
- **Charts**: 24 interactive charts across 6 pages

---

## 📊 Dataset

The analysis uses the **Netflix Movies and TV Shows** dataset from Kaggle containing ~8,800 titles with information about content type, title, director, cast, country, date added, release year, rating, duration, genre, and description.

**Source**: [Kaggle — Netflix Movies and TV Shows](https://www.kaggle.com/datasets/shivamb/netflix-shows)

---

## 📄 License

This project is for educational and portfolio purposes.
