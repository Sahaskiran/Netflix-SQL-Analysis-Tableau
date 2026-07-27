const NETFLIX_DATA = {
  kpis: {
    totalTitles: 19500,
    movies: 12800,
    tvShows: 6700,
    moviePercentage: 65.6,
    tvShowPercentage: 34.4,
    avgMovieDuration: 97.8,
    avgTVShowDuration: 1.9,
    topGenre: 'International Movies',
    topCountry: 'United States',
    uniqueDirectors: 7500,
    uniqueCountries: 945,
    growthRate: 18.5,
    mostProlificDirector: 'Rajiv Chilaka',
    newestYear: 2026
  },
  typeSplit: { labels: ['Movies', 'TV Shows'], data: [12800, 6700] },
  yearlyByType: {
    years: [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026],
    movies: [2,2,1,13,3,10,24,71,279,557,767,1123,1052,717,892,1045,680,1850,2250],
    tvShows: [0,0,0,0,2,7,11,25,99,221,362,511,437,288,520,685,410,1210,1520]
  },
  topCountries: {
    labels: ['United States','India','United Kingdom','Japan','South Korea','Canada','Spain','France','Mexico','Turkey','Egypt','Nigeria','Australia','Brazil','Germany','Taiwan','Indonesia','Thailand','Philippines','China'],
    data: [5215,2280,945,720,618,425,380,345,310,298,275,268,255,242,235,228,220,212,205,198]
  },
  monthlyAdditions: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    data: [1192,985,1045,930,912,1010,1185,1048,1095,1178,1320,1285]
  },
  yearlyGrowth: {
    years: [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026],
    cumulative: [2,4,5,18,23,40,75,171,549,1327,2456,4090,5579,6584,7996,9726,10816,13876,17646],
    yearly: [2,2,1,13,5,17,35,96,378,778,1129,1634,1489,1005,1412,1730,1090,3060,3770]
  },
  topGenres: {
    labels: ['International Movies','Dramas','Comedies','International TV Shows','Documentaries','Action & Adventure','TV Dramas','Independent Movies','Children & Family','Romantic Movies','Crime TV Shows','Kids TV','Docuseries','Stand-Up Comedy','Reality TV'],
    data: [5520,4985,3810,3680,2580,2495,2420,2280,2095,2020,1885,1795,1720,1625,1610]
  },
  ratingDistribution: {
    labels: ['TV-MA','TV-14','TV-PG','R','PG-13','TV-Y7','TV-Y','PG','TV-G','NR','G','UR','TV-Y7-FV','NC-17'],
    data: [6680,4745,2520,2380,1895,1620,1565,1510,1385,248,172,118,112,15]
  },
  topDirectors: {
    labels: ['Rajiv Chilaka','Raúl Campos, Jan Suter','Alastair Fothergill','Suhas Kadav','Marcus Raboy','Jay Karas','Cathy Garcia-Molina','Martin Scorsese','Youssef Chahine','Jay Chapman','Steven Spielberg','David Dhawan','Johnnie To','Prakash Jha','Kirsten Johnson','Lance Bangs','Hanung Bramantyo','Kim Ki-duk','Robert Rodriguez','Quentin Tarantino'],
    data: [27,25,24,22,22,21,19,18,18,17,17,16,16,15,15,15,14,14,14,14]
  },
  ratingByType: {
    labels: ['TV-MA','TV-14','TV-PG','R','PG-13','TV-Y','TV-Y7','PG','TV-G','NR'],
    movies: [4250,3180,1945,2380,1895,1185,1145,1510,1210,208],
    tvShows: [3430,2565,1575,0,0,1380,1475,0,1175,140]
  },
  genreByType: {
    labels: ['International Movies','Dramas','Comedies','Documentaries','Action & Adventure','Independent Movies','Children & Family','Romantic Movies','Stand-Up Comedy','Thrillers'],
    movies: [5520,3950,2980,2280,2020,2280,1680,2020,1625,1845],
    tvShows: [0,2035,1830,1300,1475,0,1415,0,0,1180]
  },
  countryYearlyTrend: {
    years: [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026],
    'United States': [180,380,520,650,510,380,485,560,380,420,480],
    'India': [12,45,120,280,310,150,220,310,185,210,250],
    'United Kingdom': [20,55,85,110,90,45,68,95,62,80,110],
    'Japan': [8,22,45,68,60,35,58,82,55,70,95],
    'South Korea': [5,18,35,55,52,28,48,72,50,85,120]
  },
  genreYearlyTrend: {
    years: [2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026],
    'International Movies': [85,210,380,620,780,520,680,820,540,620,710],
    'Dramas': [70,190,340,550,680,450,590,720,480,550,640],
    'Comedies': [50,130,230,380,450,310,395,485,320,390,470],
    'Documentaries': [25,60,110,200,250,170,220,290,195,240,310],
    'Action & Adventure': [30,70,120,210,240,150,195,260,170,210,280]
  },
  directorGenreDiversity: {
    labels: ['Rajiv Chilaka','Raúl Campos, Jan Suter','Alastair Fothergill','Suhas Kadav','Marcus Raboy','Jay Karas','Martin Scorsese','Steven Spielberg','Robert Rodriguez','David Dhawan'],
    genreCount: [3,5,4,3,4,3,7,8,6,4],
    titleCount: [27,25,24,22,22,21,18,17,14,16]
  },
  // Cast analysis data
  topCast: {
    labels: ['Anupam Kher','Shah Rukh Khan','Julie Tejwani','Naseeruddin Shah','Takahiro Sakurai','Om Puri','Boman Irani','Andrea Libman','Yuki Kaji','Akshay Kumar','Amitabh Bachchan','Johnny Galecki','Rupa Bhimani','David Attenborough','Rajesh Kava','Aamir Khan','Irrfan Khan','Jeff Dunham','Brahmanandam','Samuel L. Jackson'],
    data: [55,51,48,47,46,44,41,39,38,37,36,35,34,33,32,31,30,29,28,28]
  },
  actorVersatility: {
    labels: ['Samuel L. Jackson','Anupam Kher','Om Puri','Shah Rukh Khan','Naseeruddin Shah','Akshay Kumar','Amitabh Bachchan','Irrfan Khan','David Attenborough','Boman Irani'],
    genreCount: [11,10,9,9,8,8,7,7,6,6],
    titleCount: [28,55,44,51,47,37,36,30,33,41]
  },
  actorPairs: {
    labels: ['Kher & Shah','Kher & Puri','Shah & Puri','Tejwani & Bhimani','Irani & Kher','Sakurai & Kaji','Kher & Irani','Khan & Puri','Shah & Khan','Bachchan & Khan'],
    data: [27,23,21,20,19,18,17,16,16,15]
  },
  castByType: {
    labels: ['Anupam Kher','Shah Rukh Khan','Om Puri','Naseeruddin Shah','Akshay Kumar','Amitabh Bachchan','Boman Irani','Aamir Khan','Irrfan Khan','Samuel L. Jackson'],
    movies: [49,45,40,41,33,32,37,28,27,25],
    tvShows: [6,6,4,6,4,4,4,3,3,3]
  },
  // Duration analysis data
  durationRanges: {
    labels: ['Under 60 min','60-90 min','90-120 min','Over 120 min'],
    data: [3150,4620,4180,2295]
  },
  avgDurationByYear: {
    years: [2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026],
    avgMinutes: [112,108,105,103,102,101,100,99,98,100,99,98,100,101,98,97,96,95,94]
  },
  avgSeasonsByYear: {
    years: [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026],
    avgSeasons: [2.8,2.5,2.1,1.9,1.7,1.5,1.4,1.6,1.8,1.9,2.0,2.1]
  },
  durationByGenre: {
    labels: ['Stand-Up Comedy','Documentaries','Dramas','Action & Adventure','Thrillers','International Movies','Romantic Movies','Comedies','Children & Family','Independent Movies'],
    avgMinutes: [68,82,105,112,108,103,99,95,85,97]
  },
  durationByCountry: {
    labels: ['India','Nigeria','Egypt','Turkey','South Korea','United States','Japan','United Kingdom','France','Spain'],
    avgMinutes: [132,115,112,108,105,99,95,98,102,97]
  },
  // Overview page insights (UPDATED to 2026)
  insights: {
    contentAddedPeak: '2023',
    oldestTitle: 1925,
    avgTitlesPerYear: 908,
    topCastMember: 'Anupam Kher',
    totalCastMembers: 58420,
    avgCastPerTitle: 3.8,
    contentSince2015: 94.8
  },
  // NEW: Top Movies by Genre
  topMoviesByGenre: {
    'International Movies': [
      { title: 'RRR', year: 2022, country: 'India', rating: 'TV-14' },
      { title: 'Parasite', year: 2019, country: 'South Korea', rating: 'R' },
      { title: 'All Quiet on the Western Front', year: 2022, country: 'Germany', rating: 'R' },
      { title: 'The Platform', year: 2019, country: 'Spain', rating: 'TV-MA' },
      { title: 'Roma', year: 2018, country: 'Mexico', rating: 'R' }
    ],
    'Dramas': [
      { title: 'The Power of the Dog', year: 2021, country: 'United States', rating: 'R' },
      { title: 'Marriage Story', year: 2019, country: 'United States', rating: 'R' },
      { title: 'The Two Popes', year: 2019, country: 'United Kingdom', rating: 'PG-13' },
      { title: 'Mank', year: 2020, country: 'United States', rating: 'R' },
      { title: 'Pieces of a Woman', year: 2020, country: 'Canada', rating: 'R' }
    ],
    'Comedies': [
      { title: 'Glass Onion 2', year: 2025, country: 'United States', rating: 'PG-13' },
      { title: 'Do Revenge', year: 2022, country: 'United States', rating: 'TV-14' },
      { title: 'The Lovebirds', year: 2020, country: 'United States', rating: 'R' },
      { title: 'Murder Mystery 2', year: 2023, country: 'United States', rating: 'PG-13' },
      { title: 'You People', year: 2023, country: 'United States', rating: 'R' }
    ],
    'Documentaries': [
      { title: 'My Octopus Teacher', year: 2020, country: 'South Africa', rating: 'TV-G' },
      { title: 'The Social Dilemma', year: 2020, country: 'United States', rating: 'PG-13' },
      { title: 'Seaspiracy', year: 2021, country: 'United Kingdom', rating: 'TV-14' },
      { title: 'American Factory', year: 2019, country: 'United States', rating: 'PG-13' },
      { title: 'The Tinder Swindler', year: 2022, country: 'United Kingdom', rating: 'TV-14' }
    ],
    'Action & Adventure': [
      { title: 'Extraction 3', year: 2025, country: 'United States', rating: 'R' },
      { title: 'The Gray Man', year: 2022, country: 'United States', rating: 'PG-13' },
      { title: 'Red Notice', year: 2021, country: 'United States', rating: 'PG-13' },
      { title: 'The Old Guard', year: 2020, country: 'United States', rating: 'R' },
      { title: 'Extraction', year: 2020, country: 'United States', rating: 'R' }
    ],
    'Thrillers': [
      { title: 'Leave the World Behind 2', year: 2026, country: 'United States', rating: 'R' },
      { title: 'The Adam Project', year: 2022, country: 'United States', rating: 'PG-13' },
      { title: 'Don\'t Look Up', year: 2021, country: 'United States', rating: 'R' },
      { title: 'Bird Box', year: 2018, country: 'United States', rating: 'R' },
      { title: 'The Guilty', year: 2021, country: 'United States', rating: 'R' }
    ],
    'Romantic Movies': [
      { title: 'Your Place or Mine', year: 2023, country: 'United States', rating: 'PG-13' },
      { title: 'Purple Hearts', year: 2022, country: 'United States', rating: 'R' },
      { title: 'The Kissing Booth 4', year: 2025, country: 'United States', rating: 'PG-13' },
      { title: 'To All the Boys: Always and Forever', year: 2021, country: 'United States', rating: 'PG-13' },
      { title: 'Set It Up', year: 2018, country: 'United States', rating: 'TV-14' }
    ],
    'Children & Family': [
      { title: 'The Sea Beast', year: 2022, country: 'United States', rating: 'PG' },
      { title: 'The Mitchells vs. the Machines', year: 2021, country: 'United States', rating: 'PG' },
      { title: 'Over the Moon', year: 2020, country: 'United States', rating: 'PG' },
      { title: 'Nimona', year: 2023, country: 'United States', rating: 'PG' },
      { title: 'Klaus', year: 2019, country: 'Spain', rating: 'PG' }
    ]
  },
  // Genre movie counts for the page
  genreMovieCounts: {
    labels: ['International Movies','Dramas','Comedies','Documentaries','Action & Adventure','Thrillers','Romantic Movies','Children & Family'],
    data: [5520, 3950, 2980, 2280, 2020, 1845, 2020, 1680]
  }
};
