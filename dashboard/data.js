const NETFLIX_DATA = {
  kpis: {
    totalTitles: 8807,
    movies: 6131,
    tvShows: 2676,
    moviePercentage: 69.6,
    tvShowPercentage: 30.4,
    avgMovieDuration: 99.6, // minutes
    avgTVShowDuration: 1.7, // seasons
    topGenre: 'International Movies',
    topCountry: 'United States',
    uniqueDirectors: 4528,
    uniqueCountries: 748,
    growthRate: 38.2, // YoY %
    mostProlificDirector: 'Rajiv Chilaka',
    newestYear: 2021
  },
  // Type split
  typeSplit: { labels: ['Movies', 'TV Shows'], data: [6131, 2676] },
  // Yearly additions by type
  yearlyByType: {
    years: [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021],
    movies: [2,2,1,13,3,10,24,71,279,557,767,1123,1052,717],
    tvShows: [0,0,0,0,2,7,11,25,99,221,362,511,437,288]
  },
  // Top 20 countries
  topCountries: {
    labels: ['United States','India','United Kingdom','Japan','South Korea','Canada','Spain','France','Mexico','Egypt','Turkey','Nigeria','Australia','Taiwan','Indonesia','Thailand','Brazil','Philippines','Germany','China'],
    data: [2818,972,419,245,199,181,145,124,110,106,95,91,87,80,76,69,68,65,62,57]
  },
  // Monthly additions (aggregate all years)
  monthlyAdditions: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    data: [568,401,437,380,358,420,551,452,480,534,615,611]
  },
  // Yearly cumulative growth
  yearlyGrowth: {
    years: [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021],
    cumulative: [2,4,5,18,23,40,75,171,549,1327,2456,4090,5579,6584],
    yearly: [2,2,1,13,5,17,35,96,378,778,1129,1634,1489,1005]
  },
  // Top 15 genres
  topGenres: {
    labels: ['International Movies','Dramas','Comedies','International TV Shows','Documentaries','Action & Adventure','TV Dramas','Independent Movies','Children & Family','Romantic Movies','Crime TV Shows','Kids TV','Docuseries','Stand-Up Comedy','Reality TV'],
    data: [2752,2427,1674,1351,869,859,763,756,641,616,470,451,395,374,371]
  },
  // Rating distribution
  ratingDistribution: {
    labels: ['TV-MA','TV-14','TV-PG','R','PG-13','TV-Y','TV-Y7','PG','TV-G','NR','G','NC-17','TV-Y7-FV','UR'],
    data: [3207,2160,863,799,490,307,334,287,220,80,41,3,6,10]
  },
  // Top 20 directors
  topDirectors: {
    labels: ['Rajiv Chilaka','Raúl Campos, Jan Suter','Alastair Fothergill','Suhas Kadav','Marcus Raboy','Jay Karas','Cathy Garcia-Molina','Martin Scorsese','Youssef Chahine','Jay Chapman','Steven Spielberg','David Dhawan','Johnnie To','Prakash Jha','Kirsten Johnson','Lance Bangs','Hanung Bramantyo','Kim Ki-duk','Robert Rodriguez','Quentin Tarantino'],
    data: [19,18,18,16,16,15,13,12,12,12,11,11,11,10,10,10,9,9,9,9]
  },
  // Rating by type (for heatmap/grouped bar)
  ratingByType: {
    labels: ['TV-MA','TV-14','TV-PG','R','PG-13','TV-Y','TV-Y7','PG','TV-G','NR'],
    movies: [1944,1258,545,799,490,107,84,287,120,63],
    tvShows: [1263,902,318,0,0,200,250,0,100,17]
  },
  // Genre by type
  genreByType: {
    labels: ['International Movies','Dramas','Comedies','Documentaries','Action & Adventure','Independent Movies','Children & Family','Romantic Movies','Stand-Up Comedy','Thrillers'],
    movies: [2752,1800,1200,750,600,756,400,616,374,500],
    tvShows: [0,627,474,119,259,0,241,0,0,100]
  },
  // Content added yearly trend for top 5 countries
  countryYearlyTrend: {
    years: [2016,2017,2018,2019,2020,2021],
    'United States': [180,380,520,650,510,380],
    'India': [12,45,120,280,310,150],
    'United Kingdom': [20,55,85,110,90,45],
    'Japan': [8,22,45,68,60,35],
    'South Korea': [5,18,35,55,52,28]
  },
  // Genre trend over time (top 5 genres yearly)
  genreYearlyTrend: {
    years: [2016,2017,2018,2019,2020,2021],
    'International Movies': [85,210,380,620,780,520],
    'Dramas': [70,190,340,550,680,450],
    'Comedies': [50,130,230,380,450,310],
    'Documentaries': [25,60,110,200,250,170],
    'Action & Adventure': [30,70,120,210,240,150]
  },
  // Directors genre diversity (top 10)
  directorGenreDiversity: {
    labels: ['Rajiv Chilaka','Raúl Campos, Jan Suter','Alastair Fothergill','Suhas Kadav','Marcus Raboy','Jay Karas','Martin Scorsese','Steven Spielberg','Robert Rodriguez','David Dhawan'],
    genreCount: [3,5,4,3,4,3,7,8,6,4],
    titleCount: [19,18,18,16,16,15,12,11,9,11]
  },
  // Cast analysis data
  topCast: {
    labels: ['Anupam Kher','Shah Rukh Khan','Julie Tejwani','Naseeruddin Shah','Takahiro Sakurai','Om Puri','Boman Irani','Andrea Libman','Yuki Kaji','Akshay Kumar','Amitabh Bachchan','Johnny Galecki','Rupa Bhimani','David Attenborough','Rajesh Kava','Aamir Khan','Irrfan Khan','Jeff Dunham','Brahmanandam','Samuel L. Jackson'],
    data: [39,35,33,32,32,30,28,27,26,25,24,24,23,22,22,21,20,20,19,19]
  },
  actorVersatility: {
    labels: ['Samuel L. Jackson','Anupam Kher','Om Puri','Shah Rukh Khan','Naseeruddin Shah','Akshay Kumar','Amitabh Bachchan','Irrfan Khan','David Attenborough','Boman Irani'],
    genreCount: [9,8,8,7,7,7,6,6,5,5],
    titleCount: [19,39,30,35,32,25,24,20,22,28]
  },
  actorPairs: {
    labels: ['Kher & Shah','Kher & Puri','Shah & Puri','Tejwani & Bhimani','Irani & Kher','Sakurai & Kaji','Kher & Irani','Khan & Puri','Shah & Khan','Bachchan & Khan'],
    data: [18,15,14,13,12,11,11,10,10,9]
  },
  castByType: {
    labels: ['Anupam Kher','Shah Rukh Khan','Om Puri','Naseeruddin Shah','Akshay Kumar','Amitabh Bachchan','Boman Irani','Aamir Khan','Irrfan Khan','Samuel L. Jackson'],
    movies: [35,30,27,28,22,21,25,19,18,17],
    tvShows: [4,5,3,4,3,3,3,2,2,2]
  },
  // Duration analysis data
  durationRanges: {
    labels: ['Under 60 min','60-90 min','90-120 min','Over 120 min'],
    data: [1245,2180,1890,816]
  },
  avgDurationByYear: {
    years: [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021],
    avgMinutes: [112,108,105,103,102,101,100,99,98,100,99,98,100,101]
  },
  avgSeasonsByYear: {
    years: [2015,2016,2017,2018,2019,2020,2021],
    avgSeasons: [2.8,2.5,2.1,1.9,1.7,1.5,1.4]
  },
  durationByGenre: {
    labels: ['Stand-Up Comedy','Documentaries','Dramas','Action & Adventure','Thrillers','International Movies','Romantic Movies','Comedies','Children & Family','Independent Movies'],
    avgMinutes: [68,82,105,112,108,103,99,95,85,97]
  },
  durationByCountry: {
    labels: ['India','Nigeria','Egypt','Turkey','South Korea','United States','Japan','United Kingdom','France','Spain'],
    avgMinutes: [132,115,112,108,105,99,95,98,102,97]
  },
  // Overview page insights
  insights: {
    contentAddedPeak: '2019',
    oldestTitle: 1925,
    avgTitlesPerYear: 630,
    topCastMember: 'Anupam Kher',
    totalCastMembers: 36214,
    avgCastPerTitle: 4.1,
    contentSince2015: 92.3
  }
};
