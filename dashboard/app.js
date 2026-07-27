// Register Chart.js datalabels plugin if available
if (typeof ChartDataLabels !== 'undefined') {
  Chart.register(ChartDataLabels);
}

// Chart.js Global Defaults
Chart.defaults.color = '#E5E5E5';
Chart.defaults.font.family = 'Inter';
Chart.defaults.plugins.legend.labels.color = '#E5E5E5';
Chart.defaults.scale.grid.color = 'rgba(255,255,255,0.06)';
Chart.defaults.scale.ticks.color = '#A3A3A3';

const netflixPalette = [
  '#E50914', '#B20710', '#FF6B6B', '#4ECDC4', '#45B7D1', 
  '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', 
  '#BB8FCE', '#85C1E9', '#F1948A', '#82E0AA', '#F8C471'
];

let activeCharts = [];

// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');
const kpiContainer = document.getElementById('kpi-container');
const chartsContainer = document.getElementById('charts-container');

// Page Configs
const pages = {
  'page-0': {
    title: 'Overview',
    subtitle: 'Netflix Content Library at a Glance',
    kpis: [
      { title: 'Total Titles', value: NETFLIX_DATA.kpis.totalTitles, icon: '🎬' },
      { title: 'Movies', value: NETFLIX_DATA.kpis.movies, icon: '🎞️', suffix: ` (${NETFLIX_DATA.kpis.moviePercentage}%)` },
      { title: 'TV Shows', value: NETFLIX_DATA.kpis.tvShows, icon: '📺', suffix: ` (${NETFLIX_DATA.kpis.tvShowPercentage}%)` },
      { title: 'Countries', value: NETFLIX_DATA.kpis.uniqueCountries, icon: '🌍' },
      { title: 'Directors', value: NETFLIX_DATA.kpis.uniqueDirectors, icon: '🎥' },
      { title: 'Cast Members', value: NETFLIX_DATA.insights.totalCastMembers, icon: '👥' }
    ],
    renderCharts: renderOverviewPage
  },
  'page-1': {
    title: 'Movies vs TV Shows',
    subtitle: 'Analysis of content type distribution and trends',
    kpis: [
      { title: 'Total Titles', value: NETFLIX_DATA.kpis.totalTitles, icon: '🎬' },
      { title: 'Movies', value: NETFLIX_DATA.kpis.movies, icon: '🎞️' },
      { title: 'TV Shows', value: NETFLIX_DATA.kpis.tvShows, icon: '📺' },
      { title: 'Movie %', value: NETFLIX_DATA.kpis.moviePercentage, icon: 'pie_chart', suffix: '%' },
      { title: 'Avg Movie Length', value: NETFLIX_DATA.kpis.avgMovieDuration, icon: '⏱️', suffix: 'm' },
      { title: 'Avg TV Show Seasons', value: NETFLIX_DATA.kpis.avgTVShowDuration, icon: '📚', suffix: 's' }
    ],
    renderCharts: renderPage1Charts
  },
  'page-2': {
    title: 'Content by Country',
    subtitle: 'Geographical distribution of Netflix content',
    kpis: [
      { title: 'Unique Countries', value: NETFLIX_DATA.kpis.uniqueCountries, icon: '🌍' },
      { title: 'Top Country', value: NETFLIX_DATA.kpis.topCountry, icon: '🇺🇸', isString: true },
      { title: 'US Content', value: 2818, icon: '📊' },
      { title: 'India Content', value: 972, icon: '📊' },
      { title: 'Total Titles', value: NETFLIX_DATA.kpis.totalTitles, icon: '🎬' },
      { title: 'Newest Year', value: NETFLIX_DATA.kpis.newestYear, icon: '📅' }
    ],
    renderCharts: renderPage2Charts
  },
  'page-3': {
    title: 'Content Over Time',
    subtitle: 'Historical growth and addition trends',
    kpis: [
      { title: 'YoY Growth Rate', value: NETFLIX_DATA.kpis.growthRate, icon: '📈', suffix: '%' },
      { title: 'Total Titles', value: NETFLIX_DATA.kpis.totalTitles, icon: '🎬' },
      { title: '2021 Additions', value: 1005, icon: '📅' },
      { title: '2019 Additions (Peak)', value: 1634, icon: '🚀' },
      { title: 'Top Month', value: 'Nov', icon: '📆', isString: true },
      { title: 'Avg Monthly', value: 483, icon: '📊' }
    ],
    renderCharts: renderPage3Charts
  },
  'page-4': {
    title: 'Genre Distribution',
    subtitle: 'Analysis of content genres and categories',
    kpis: [
      { title: 'Top Genre', value: NETFLIX_DATA.kpis.topGenre, icon: '🎭', isString: true },
      { title: 'Intl Movies', value: 2752, icon: '🌍' },
      { title: 'Dramas', value: 2427, icon: '😢' },
      { title: 'Comedies', value: 1674, icon: '😂' },
      { title: 'Total Genres', value: 42, icon: '📑' },
      { title: 'Kids TV', value: 451, icon: '🧸' }
    ],
    renderCharts: renderPage4Charts
  },
  'page-5': {
    title: 'Rating Distribution',
    subtitle: 'Content age ratings and maturity levels',
    kpis: [
      { title: 'Top Rating', value: 'TV-MA', icon: '🔞', isString: true },
      { title: 'TV-MA Count', value: 3207, icon: '📊' },
      { title: 'TV-14 Count', value: 2160, icon: '📊' },
      { title: 'Mature Content %', value: 46.2, icon: 'pie_chart', suffix: '%' },
      { title: 'Kids Content %', value: 12.5, icon: 'pie_chart', suffix: '%' },
      { title: 'Unrated', value: 10, icon: '❓' }
    ],
    renderCharts: renderPage5Charts
  },
  'page-6': {
    title: 'Top Directors',
    subtitle: 'Prolific creators and their content',
    kpis: [
      { title: 'Unique Directors', value: NETFLIX_DATA.kpis.uniqueDirectors, icon: '🎥' },
      { title: 'Top Director', value: NETFLIX_DATA.kpis.mostProlificDirector, icon: '🏆', isString: true },
      { title: 'Top Dir. Titles', value: 19, icon: '🎬' },
      { title: 'Avg Titles/Dir', value: 1.3, icon: '📊' },
      { title: 'Scorsese Titles', value: 12, icon: '🎞️' },
      { title: 'Spielberg Titles', value: 11, icon: '🎞️' }
    ],
    renderCharts: renderPage6Charts
  },
  'page-7': {
    title: 'Cast Analysis',
    subtitle: 'Top actors and their appearances across Netflix content',
    kpis: [
      { title: 'Total Cast Members', value: NETFLIX_DATA.insights.totalCastMembers, icon: '👥' },
      { title: 'Top Actor', value: NETFLIX_DATA.insights.topCastMember, icon: '⭐', isString: true },
      { title: 'Top Actor Titles', value: 39, icon: '🎬' },
      { title: 'Avg Cast/Title', value: NETFLIX_DATA.insights.avgCastPerTitle, icon: '📊' },
      { title: 'Unique Directors', value: NETFLIX_DATA.kpis.uniqueDirectors, icon: '🎥' },
      { title: 'Total Titles', value: NETFLIX_DATA.kpis.totalTitles, icon: '🎞️' }
    ],
    renderCharts: renderPage7Charts
  },
  'page-8': {
    title: 'Duration Deep Dive',
    subtitle: 'Content length patterns and trends',
    kpis: [
      { title: 'Avg Movie Duration', value: NETFLIX_DATA.kpis.avgMovieDuration, icon: '⏱️', suffix: ' min' },
      { title: 'Avg TV Seasons', value: NETFLIX_DATA.kpis.avgTVShowDuration, icon: '📚' },
      { title: 'Under 60 min', value: NETFLIX_DATA.durationRanges.data[0], icon: '⚡' },
      { title: 'Over 2 Hours', value: NETFLIX_DATA.durationRanges.data[3], icon: '🎥' },
      { title: 'Longest Avg (India)', value: 132, icon: '🇮🇳', suffix: ' min' },
      { title: 'Shortest Avg (Comedy)', value: 68, icon: '😂', suffix: ' min' }
    ],
    renderCharts: renderPage8Charts
  },
  'page-9': {
    title: 'Top Movies by Genre',
    subtitle: 'Curated picks — highest rated and most popular movies in each genre',
    kpis: [
      { title: 'Total Movies', value: NETFLIX_DATA.kpis.movies, icon: '🎞️' },
      { title: 'Total Genres', value: 42, icon: '🎭' },
      { title: 'Top Genre', value: NETFLIX_DATA.kpis.topGenre, icon: '🌍', isString: true },
      { title: 'Dramas', value: 2950, icon: '😢' },
      { title: 'Comedies', value: 1980, icon: '😂' },
      { title: 'Action', value: 1020, icon: '💥' }
    ],
    renderCharts: renderPage9Charts
  }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  loadPage('page-0');
  initParticles();
  
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) loader.classList.add('hidden');
  }, 2000);
  
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('chart-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      themeBtn.textContent = isLight ? '🌙 Dark Mode' : '☀️ Light Mode';
      
      const textColor = isLight ? '#1a1a1a' : '#E5E5E5';
      const gridColor = isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.06)';
      Chart.defaults.color = textColor;
      Chart.defaults.plugins.legend.labels.color = textColor;
      Chart.defaults.scale.grid.color = gridColor;
      Chart.defaults.scale.ticks.color = isLight ? '#666' : '#A3A3A3';
      
      const activePage = document.querySelector('.nav-item.active')?.getAttribute('data-page');
      if (activePage) loadPage(activePage);
    });
  }
});

function initNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remove active class
      navItems.forEach(nav => nav.classList.remove('active'));
      // Add active class
      item.classList.add('active');
      // Load page
      const pageId = item.getAttribute('data-page');
      loadPage(pageId);
    });
  });
}

function loadPage(pageId) {
  const config = pages[pageId];
  
  // Update header
  pageTitle.textContent = config.title;
  pageSubtitle.textContent = config.subtitle;
  
  // Clear existing
  kpiContainer.innerHTML = '';
  chartsContainer.innerHTML = '';
  
  // Destroy old charts
  activeCharts.forEach(chart => chart.destroy());
  activeCharts = [];
  
  const existingInsights = document.querySelector('.insights-row');
  if (existingInsights) existingInsights.remove();
  
  const existingTables = document.querySelector('.genre-tables-section');
  if (existingTables) existingTables.remove();
  
  // Render KPIs
  config.kpis.forEach((kpi, index) => {
    const delay = index * 0.1;
    const div = document.createElement('div');
    div.className = 'kpi-card';
    div.style.animationDelay = `${delay}s`;
    
    div.innerHTML = `
      <div class="kpi-title">
        <span>${kpi.icon}</span> ${kpi.title}
      </div>
      <div class="kpi-value">
        ${kpi.isString ? kpi.value : `<span class="counter" data-target="${kpi.value}">${kpi.value}</span>${kpi.suffix || ''}`}
      </div>
    `;
    kpiContainer.appendChild(div);
  });
  
  // Animate numbers
  animateCounters();
  
  // Add animation class to containers
  chartsContainer.classList.remove('fade-transition');
  void chartsContainer.offsetWidth; // trigger reflow
  chartsContainer.classList.add('fade-transition');
  
  // Render Charts
  config.renderCharts();
}

function createChartCard(id, title, subtitle) {
  const card = document.createElement('div');
  card.className = 'chart-card';
  card.innerHTML = `
    <div class="chart-header">
      <div class="chart-title">${title}</div>
      <div class="chart-subtitle">${subtitle}</div>
    </div>
    <div class="chart-actions">
      <button class="chart-action-btn" onclick="downloadChart('${id}', '${title}')" title="Download PNG">📥</button>
      <button class="chart-action-btn" onclick="expandChart('${id}')" title="Fullscreen">⛶</button>
    </div>
    <div class="chart-container">
      <canvas id="${id}"></canvas>
    </div>
  `;
  chartsContainer.appendChild(card);
  return document.getElementById(id).getContext('2d');
}

function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 1000; // ms
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const isFloat = target % 1 !== 0;
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / speed, 1);
      
      // Easing function (easeOutQuart)
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = easeProgress * target;
      
      counter.innerText = isFloat ? current.toFixed(1) : Math.floor(current);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        counter.innerText = isFloat ? target.toFixed(1) : target;
      }
    };
    window.requestAnimationFrame(step);
  });
}

// Chart Rendering Functions

function renderPage1Charts() {
  const ctx1 = createChartCard('chart1', 'Type Distribution', 'Movies vs TV Shows');
  activeCharts.push(new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: NETFLIX_DATA.typeSplit.labels,
      datasets: [{
        data: NETFLIX_DATA.typeSplit.data,
        backgroundColor: ['#E50914', '#4ECDC4'],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  }));

  const ctx2 = createChartCard('chart2', 'Yearly Additions by Type', 'Growth of content types over years');
  activeCharts.push(new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.yearlyByType.years,
      datasets: [
        {
          label: 'Movies',
          data: NETFLIX_DATA.yearlyByType.movies,
          backgroundColor: '#E50914',
          borderRadius: 4
        },
        {
          label: 'TV Shows',
          data: NETFLIX_DATA.yearlyByType.tvShows,
          backgroundColor: '#4ECDC4',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { stacked: true },
        y: { stacked: true }
      }
    }
  }));

  const ctx3 = createChartCard('chart3', 'Rating Distribution by Type', 'Top ratings breakdown');
  activeCharts.push(new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.ratingByType.labels.slice(0, 7),
      datasets: [
        {
          label: 'Movies',
          data: NETFLIX_DATA.ratingByType.movies.slice(0, 7),
          backgroundColor: '#E50914',
          borderRadius: 4
        },
        {
          label: 'TV Shows',
          data: NETFLIX_DATA.ratingByType.tvShows.slice(0, 7),
          backgroundColor: '#4ECDC4',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y'
    }
  }));

  const ctx4 = createChartCard('chart4', 'Genre by Type', 'Top 5 genres distribution');
  activeCharts.push(new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.genreByType.labels.slice(0, 5),
      datasets: [
        {
          label: 'Movies',
          data: NETFLIX_DATA.genreByType.movies.slice(0, 5),
          backgroundColor: '#E50914',
          borderRadius: 4
        },
        {
          label: 'TV Shows',
          data: NETFLIX_DATA.genreByType.tvShows.slice(0, 5),
          backgroundColor: '#4ECDC4',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }));
}

function renderPage2Charts() {
  const ctx1 = createChartCard('chart1', 'Top 10 Countries', 'Content origin distribution');
  activeCharts.push(new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.topCountries.labels.slice(0, 10),
      datasets: [{
        label: 'Titles',
        data: NETFLIX_DATA.topCountries.data.slice(0, 10),
        backgroundColor: netflixPalette.slice(0, 10),
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } }
    }
  }));

  const ctx2 = createChartCard('chart2', 'Yearly Trend (Top 5)', 'Content additions from major countries');
  const datasets2 = Object.keys(NETFLIX_DATA.countryYearlyTrend)
    .filter(k => k !== 'years')
    .map((country, i) => ({
      label: country,
      data: NETFLIX_DATA.countryYearlyTrend[country],
      borderColor: netflixPalette[i],
      backgroundColor: netflixPalette[i] + '40',
      fill: true,
      tension: 0.4
    }));
    
  activeCharts.push(new Chart(ctx2, {
    type: 'line',
    data: {
      labels: NETFLIX_DATA.countryYearlyTrend.years,
      datasets: datasets2
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false }
    }
  }));

  const ctx3 = createChartCard('chart3', 'Top 5 Countries Share', 'Market concentration');
  activeCharts.push(new Chart(ctx3, {
    type: 'doughnut',
    data: {
      labels: NETFLIX_DATA.topCountries.labels.slice(0, 5),
      datasets: [{
        data: NETFLIX_DATA.topCountries.data.slice(0, 5),
        backgroundColor: netflixPalette.slice(0, 5),
        borderWidth: 0
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));

  const ctx4 = createChartCard('chart4', 'Bottom 10 of Top 20', 'Emerging markets');
  activeCharts.push(new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.topCountries.labels.slice(10, 20),
      datasets: [{
        label: 'Titles',
        data: NETFLIX_DATA.topCountries.data.slice(10, 20),
        backgroundColor: '#4ECDC4',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } }
    }
  }));
}

function renderPage3Charts() {
  const ctx1 = createChartCard('chart1', 'Yearly Additions', 'New content added per year');
  activeCharts.push(new Chart(ctx1, {
    type: 'line',
    data: {
      labels: NETFLIX_DATA.yearlyGrowth.years,
      datasets: [{
        label: 'New Titles',
        data: NETFLIX_DATA.yearlyGrowth.yearly,
        borderColor: '#E50914',
        backgroundColor: 'rgba(229, 9, 20, 0.2)',
        fill: true,
        tension: 0.4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));

  const ctx2 = createChartCard('chart2', 'Cumulative Growth', 'Total content library size over time');
  activeCharts.push(new Chart(ctx2, {
    type: 'line',
    data: {
      labels: NETFLIX_DATA.yearlyGrowth.years,
      datasets: [{
        label: 'Total Titles',
        data: NETFLIX_DATA.yearlyGrowth.cumulative,
        borderColor: '#4ECDC4',
        backgroundColor: 'rgba(78, 205, 196, 0.2)',
        fill: true,
        tension: 0.4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));

  const ctx3 = createChartCard('chart3', 'Monthly Seasonality', 'Total titles added by month (all years)');
  activeCharts.push(new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.monthlyAdditions.labels,
      datasets: [{
        label: 'Additions',
        data: NETFLIX_DATA.monthlyAdditions.data,
        backgroundColor: netflixPalette.slice(0, 12),
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } }
    }
  }));

  const ctx4 = createChartCard('chart4', 'Growth Comparison', 'Yearly vs Cumulative');
  activeCharts.push(new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.yearlyGrowth.years,
      datasets: [
        {
          type: 'line',
          label: 'Cumulative',
          data: NETFLIX_DATA.yearlyGrowth.cumulative,
          borderColor: '#4ECDC4',
          tension: 0.4
        },
        {
          type: 'bar',
          label: 'Yearly',
          data: NETFLIX_DATA.yearlyGrowth.yearly,
          backgroundColor: '#E50914',
          borderRadius: 4
        }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));
}

function renderPage4Charts() {
  const ctx1 = createChartCard('chart1', 'Top 10 Genres', 'Most popular content categories');
  activeCharts.push(new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.topGenres.labels.slice(0, 10),
      datasets: [{
        label: 'Titles',
        data: NETFLIX_DATA.topGenres.data.slice(0, 10),
        backgroundColor: netflixPalette.slice(0, 10),
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } }
    }
  }));

  const ctx2 = createChartCard('chart2', 'Genre Trends (Top 5)', 'Popularity over time');
  const datasets2 = Object.keys(NETFLIX_DATA.genreYearlyTrend)
    .filter(k => k !== 'years')
    .map((genre, i) => ({
      label: genre,
      data: NETFLIX_DATA.genreYearlyTrend[genre],
      borderColor: netflixPalette[i],
      tension: 0.4
    }));
    
  activeCharts.push(new Chart(ctx2, {
    type: 'line',
    data: {
      labels: NETFLIX_DATA.genreYearlyTrend.years,
      datasets: datasets2
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));

  const ctx3 = createChartCard('chart3', 'Genre Share (Top 5)', 'Concentration among top genres');
  activeCharts.push(new Chart(ctx3, {
    type: 'doughnut',
    data: {
      labels: NETFLIX_DATA.topGenres.labels.slice(0, 5),
      datasets: [{
        data: NETFLIX_DATA.topGenres.data.slice(0, 5),
        backgroundColor: netflixPalette.slice(0, 5),
        borderWidth: 0
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));

  const ctx4 = createChartCard('chart4', 'Other Genres', 'Categories ranked 11-15');
  activeCharts.push(new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.topGenres.labels.slice(10, 15),
      datasets: [{
        label: 'Titles',
        data: NETFLIX_DATA.topGenres.data.slice(10, 15),
        backgroundColor: '#96CEB4',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } }
    }
  }));
}

function renderPage5Charts() {
  const ctx1 = createChartCard('chart1', 'Overall Distribution', 'Content maturity ratings');
  activeCharts.push(new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: NETFLIX_DATA.ratingDistribution.labels.slice(0, 5),
      datasets: [{
        data: NETFLIX_DATA.ratingDistribution.data.slice(0, 5),
        backgroundColor: netflixPalette.slice(0, 5),
        borderWidth: 0
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));

  const ctx2 = createChartCard('chart2', 'Rating by Content Type', 'Movies vs TV Shows by rating');
  activeCharts.push(new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.ratingByType.labels.slice(0, 6),
      datasets: [
        {
          label: 'Movies',
          data: NETFLIX_DATA.ratingByType.movies.slice(0, 6),
          backgroundColor: '#E50914',
          borderRadius: 4
        },
        {
          label: 'TV Shows',
          data: NETFLIX_DATA.ratingByType.tvShows.slice(0, 6),
          backgroundColor: '#4ECDC4',
          borderRadius: 4
        }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));

  const ctx3 = createChartCard('chart3', 'All Ratings Ranked', 'Every maturity rating count');
  activeCharts.push(new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.ratingDistribution.labels,
      datasets: [{
        label: 'Titles',
        data: NETFLIX_DATA.ratingDistribution.data,
        backgroundColor: '#FF6B6B',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } }
    }
  }));

  const ctx4 = createChartCard('chart4', 'Top 8 Ratings', 'Polar Area distribution');
  activeCharts.push(new Chart(ctx4, {
    type: 'polarArea',
    data: {
      labels: NETFLIX_DATA.ratingDistribution.labels.slice(0, 8),
      datasets: [{
        data: NETFLIX_DATA.ratingDistribution.data.slice(0, 8),
        backgroundColor: netflixPalette.map(c => c + 'CC').slice(0, 8),
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { r: { grid: { color: 'rgba(255,255,255,0.1)' } } }
    }
  }));
}

function renderPage6Charts() {
  const ctx1 = createChartCard('chart1', 'Top 10 Directors', 'Most prolific creators');
  activeCharts.push(new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.topDirectors.labels.slice(0, 10),
      datasets: [{
        label: 'Titles',
        data: NETFLIX_DATA.topDirectors.data.slice(0, 10),
        backgroundColor: '#E50914',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } }
    }
  }));

  const ctx2 = createChartCard('chart2', 'Next 10 Directors', 'Ranks 11-20');
  activeCharts.push(new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.topDirectors.labels.slice(10, 20),
      datasets: [{
        label: 'Titles',
        data: NETFLIX_DATA.topDirectors.data.slice(10, 20),
        backgroundColor: '#4ECDC4',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { display: false } }
    }
  }));

  const ctx3 = createChartCard('chart3', 'Director Genre Diversity', 'Number of distinct genres per director');
  activeCharts.push(new Chart(ctx3, {
    type: 'radar',
    data: {
      labels: NETFLIX_DATA.directorGenreDiversity.labels.slice(0, 6),
      datasets: [{
        label: 'Genres Covered',
        data: NETFLIX_DATA.directorGenreDiversity.genreCount.slice(0, 6),
        backgroundColor: 'rgba(229, 9, 20, 0.2)',
        borderColor: '#E50914',
        pointBackgroundColor: '#E50914'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { r: { grid: { color: 'rgba(255,255,255,0.1)' }, angleLines: { color: 'rgba(255,255,255,0.1)' } } }
    }
  }));

  const ctx4 = createChartCard('chart4', 'Titles vs Genres', 'Correlation for Top 10 Directors');
  activeCharts.push(new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.directorGenreDiversity.labels,
      datasets: [
        {
          type: 'bar',
          label: 'Titles',
          data: NETFLIX_DATA.directorGenreDiversity.titleCount,
          backgroundColor: '#4ECDC4',
          borderRadius: 4
        },
        {
          type: 'line',
          label: 'Genres',
          data: NETFLIX_DATA.directorGenreDiversity.genreCount,
          borderColor: '#E50914',
          tension: 0.4
        }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));
}

function downloadChart(chartId, title) {
  const canvas = document.getElementById(chartId);
  const link = document.createElement('a');
  link.download = `netflix_${title.replace(/\s+/g, '_').toLowerCase()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}

let modalChart = null;
function expandChart(chartId) {
  const sourceChart = activeCharts.find(c => c.canvas.id === chartId);
  if (!sourceChart) return;
  const modal = document.getElementById('chart-modal');
  modal.classList.add('active');
  if (modalChart) modalChart.destroy();
  const modalCanvas = document.getElementById('modal-chart');
  
  modalChart = new Chart(modalCanvas, {
    type: sourceChart.config.type,
    data: JSON.parse(JSON.stringify(sourceChart.config.data)),
    options: { ...JSON.parse(JSON.stringify(sourceChart.config.options)), maintainAspectRatio: false, responsive: true }
  });
}

function closeModal() {
  document.getElementById('chart-modal').classList.remove('active');
  if (modalChart) { modalChart.destroy(); modalChart = null; }
}

document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('chart-modal');
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
    return;
  }
  const currentNavItems = document.querySelectorAll('.nav-item');
  const activeIndex = [...currentNavItems].findIndex(n => n.classList.contains('active'));
  if (e.key === 'ArrowDown' && activeIndex < currentNavItems.length - 1) {
    currentNavItems[activeIndex + 1].click();
  } else if (e.key === 'ArrowUp' && activeIndex > 0) {
    currentNavItems[activeIndex - 1].click();
  }
});

function initParticles() {
  const canvas = document.getElementById('particles-bg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.15 + 0.05
    });
  }
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(229, 9, 20, ${p.alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }
  animate();
  window.addEventListener('resize', () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });
}

function renderOverviewPage() {
  const ctx1 = createChartCard('chart1', 'Content Distribution', 'Movies vs TV Shows');
  activeCharts.push(new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: NETFLIX_DATA.typeSplit.labels,
      datasets: [{ data: NETFLIX_DATA.typeSplit.data, backgroundColor: ['#E50914', '#4ECDC4'], borderWidth: 0 }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));

  const ctx2 = createChartCard('chart2', 'Library Growth', 'Cumulative titles added over time');
  activeCharts.push(new Chart(ctx2, {
    type: 'line',
    data: {
      labels: NETFLIX_DATA.yearlyGrowth.years,
      datasets: [{
        label: 'Total Titles',
        data: NETFLIX_DATA.yearlyGrowth.cumulative,
        borderColor: '#E50914',
        backgroundColor: 'rgba(229, 9, 20, 0.2)',
        fill: true,
        tension: 0.4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));

  const ctx3 = createChartCard('chart3', 'Top 5 Countries', 'Total titles by country');
  activeCharts.push(new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.topCountries.labels.slice(0, 5),
      datasets: [{
        label: 'Titles',
        data: NETFLIX_DATA.topCountries.data.slice(0, 5),
        backgroundColor: netflixPalette.slice(0, 5),
        borderRadius: 4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } } }
  }));

  const ctx4 = createChartCard('chart4', 'Top 5 Genres', 'Most popular categories');
  activeCharts.push(new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.topGenres.labels.slice(0, 5),
      datasets: [{
        label: 'Titles',
        data: NETFLIX_DATA.topGenres.data.slice(0, 5),
        backgroundColor: netflixPalette.slice(0, 5),
        borderRadius: 4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } } }
  }));

  const insightsSection = document.createElement('section');
  insightsSection.className = 'insights-row';
  insightsSection.innerHTML = `
    <div class="insight-card">
      <div class="insight-icon">🚀</div>
      <div class="insight-text"><h4>Peak Content Year</h4><p>${NETFLIX_DATA.insights.contentAddedPeak}</p></div>
    </div>
    <div class="insight-card">
      <div class="insight-icon">📜</div>
      <div class="insight-text"><h4>Oldest Title</h4><p>${NETFLIX_DATA.insights.oldestTitle}</p></div>
    </div>
    <div class="insight-card">
      <div class="insight-icon">📊</div>
      <div class="insight-text"><h4>Avg Titles/Year</h4><p>${NETFLIX_DATA.insights.avgTitlesPerYear}</p></div>
    </div>
    <div class="insight-card">
      <div class="insight-icon">📈</div>
      <div class="insight-text"><h4>Content Since 2015</h4><p>${NETFLIX_DATA.insights.contentSince2015}%</p></div>
    </div>
    <div class="insight-card">
      <div class="insight-icon">⭐</div>
      <div class="insight-text"><h4>Top Cast Member</h4><p>${NETFLIX_DATA.insights.topCastMember}</p></div>
    </div>
    <div class="insight-card">
      <div class="insight-icon">👥</div>
      <div class="insight-text"><h4>Avg Cast per Title</h4><p>${NETFLIX_DATA.insights.avgCastPerTitle}</p></div>
    </div>
  `;
  chartsContainer.parentNode.appendChild(insightsSection);
}

function renderPage7Charts() {
  const ctx1 = createChartCard('chart1', 'Top 10 Actors', 'Most appearances on Netflix');
  activeCharts.push(new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.topCast.labels.slice(0, 10),
      datasets: [{
        label: 'Appearances',
        data: NETFLIX_DATA.topCast.data.slice(0, 10),
        backgroundColor: netflixPalette.slice(0, 10),
        borderRadius: 4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } } }
  }));

  const ctx2 = createChartCard('chart2', 'Actor Versatility', 'Number of genres covered');
  activeCharts.push(new Chart(ctx2, {
    type: 'radar',
    data: {
      labels: NETFLIX_DATA.actorVersatility.labels.slice(0, 6),
      datasets: [{
        label: 'Genres Covered',
        data: NETFLIX_DATA.actorVersatility.genreCount.slice(0, 6),
        backgroundColor: 'rgba(229, 9, 20, 0.2)',
        borderColor: '#E50914',
        pointBackgroundColor: '#E50914'
      }]
    },
    options: { responsive: true, maintainAspectRatio: false, scales: { r: { grid: { color: 'rgba(255,255,255,0.1)' }, angleLines: { color: 'rgba(255,255,255,0.1)' } } } }
  }));

  const ctx3 = createChartCard('chart3', 'Top Frequent Actor Pairs', 'Collaborations');
  activeCharts.push(new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.actorPairs.labels.slice(0, 5),
      datasets: [{
        label: 'Collaborations',
        data: NETFLIX_DATA.actorPairs.data.slice(0, 5),
        backgroundColor: '#4ECDC4',
        borderRadius: 4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } } }
  }));

  const ctx4 = createChartCard('chart4', 'Cast by Type', 'Movies vs TV Shows for Top Actors');
  activeCharts.push(new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.castByType.labels.slice(0, 5),
      datasets: [
        { label: 'Movies', data: NETFLIX_DATA.castByType.movies.slice(0, 5), backgroundColor: '#E50914', borderRadius: 4 },
        { label: 'TV Shows', data: NETFLIX_DATA.castByType.tvShows.slice(0, 5), backgroundColor: '#4ECDC4', borderRadius: 4 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));
}

function renderPage8Charts() {
  const ctx1 = createChartCard('chart1', 'Duration Ranges', 'Movie lengths distribution');
  activeCharts.push(new Chart(ctx1, {
    type: 'doughnut',
    data: {
      labels: NETFLIX_DATA.durationRanges.labels,
      datasets: [{ data: NETFLIX_DATA.durationRanges.data, backgroundColor: netflixPalette.slice(0, 4), borderWidth: 0 }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));

  const ctx2 = createChartCard('chart2', 'Average Duration Trend', 'Movie length by release year');
  activeCharts.push(new Chart(ctx2, {
    type: 'line',
    data: {
      labels: NETFLIX_DATA.avgDurationByYear.years,
      datasets: [{
        label: 'Avg Minutes',
        data: NETFLIX_DATA.avgDurationByYear.avgMinutes,
        borderColor: '#E50914',
        backgroundColor: 'rgba(229, 9, 20, 0.2)',
        fill: true,
        tension: 0.4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));

  const ctx3 = createChartCard('chart3', 'Duration by Genre', 'Avg movie length for top genres');
  activeCharts.push(new Chart(ctx3, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.durationByGenre.labels.slice(0, 5),
      datasets: [{
        label: 'Minutes',
        data: NETFLIX_DATA.durationByGenre.avgMinutes.slice(0, 5),
        backgroundColor: '#4ECDC4',
        borderRadius: 4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } } }
  }));

  const ctx4 = createChartCard('chart4', 'Duration by Country', 'Avg movie length by origin');
  activeCharts.push(new Chart(ctx4, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.durationByCountry.labels.slice(0, 5),
      datasets: [{
        label: 'Minutes',
        data: NETFLIX_DATA.durationByCountry.avgMinutes.slice(0, 5),
        backgroundColor: netflixPalette[2],
        borderRadius: 4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } } }
  }));
}

function renderPage9Charts() {
  // Chart 1: Genre movie counts bar chart
  const ctx1 = createChartCard('chart1', 'Movies per Genre', 'Total movie count by genre');
  activeCharts.push(new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: NETFLIX_DATA.genreMovieCounts.labels,
      datasets: [{
        label: 'Movies',
        data: NETFLIX_DATA.genreMovieCounts.data,
        backgroundColor: netflixPalette.slice(0, 8),
        borderRadius: 4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { display: false } } }
  }));

  // Chart 2: Genre distribution doughnut
  const ctx2 = createChartCard('chart2', 'Genre Share', 'Top 8 genres proportion');
  activeCharts.push(new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: NETFLIX_DATA.genreMovieCounts.labels,
      datasets: [{
        data: NETFLIX_DATA.genreMovieCounts.data,
        backgroundColor: netflixPalette.slice(0, 8),
        borderWidth: 0
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  }));

  // Now add the Top Movies tables below the charts
  const tablesSection = document.createElement('section');
  tablesSection.className = 'genre-tables-section';
  
  const genres = Object.keys(NETFLIX_DATA.topMoviesByGenre);
  let tablesHTML = '<h3 class="section-heading">🏆 Top Picks by Genre</h3><div class="genre-tables-grid">';
  
  genres.forEach((genre, i) => {
    const movies = NETFLIX_DATA.topMoviesByGenre[genre];
    const color = netflixPalette[i % netflixPalette.length];
    tablesHTML += `
      <div class="genre-table-card">
        <div class="genre-table-header" style="border-left: 3px solid ${color}">
          <h4>${genre}</h4>
          <span class="genre-count">${NETFLIX_DATA.genreMovieCounts.data[i] || ''} movies</span>
        </div>
        <table class="genre-table">
          <thead>
            <tr><th>#</th><th>Title</th><th>Year</th><th>Country</th><th>Rating</th></tr>
          </thead>
          <tbody>
            ${movies.map((m, j) => `
              <tr>
                <td class="rank">${j + 1}</td>
                <td class="movie-title">${m.title}</td>
                <td>${m.year}</td>
                <td>${m.country}</td>
                <td><span class="rating-badge">${m.rating}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  });
  
  tablesHTML += '</div>';
  tablesSection.innerHTML = tablesHTML;
  chartsContainer.parentNode.appendChild(tablesSection);
}

