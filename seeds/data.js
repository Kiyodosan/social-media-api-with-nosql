const usernames = [
  'Actionde',
  'Altermajo',
  'Aquant',
  'Arerving',
  'Aspector',
  'Banoric',
  'Breakerts',
  'Celler',
  'CellTake',
  'Centeral',
  'Cerund',
  'Chanterie',
  'Chartechum',
  'ChooseReady',
  'CloudTeam',
  'Cologi',
  'Cubeat',
  'CubeCache',
  'Degretoma',
  'Dicarsiri',
  'Discovid',
  'DotReview',
  'DramasFilm',
  'Dramasso',
  'Dynamill',
  'Edrackmo',
  'Eitello',
  'Entererma',
  'Experteran',
  'Flicksan',
  'Fordon',
  'Fordua',
  'FrameTape',
  'Gamele',
  'Glycore',
  'Gossipswor',
  'HeadlinesReady',
  'Herate',
  'HotWatch',
  'HouseScreen',
  'Imegosi',
  'InfoMagazine',
  'InsiderDaily',
  'InsiderHot',
  'Insult',
  'Lensfith',
  'Leucipa',
  'Loungepa',
  'Mainex',
  'Maxmida',
  'Monsob',
  'Movietr',
  'Multion',
  'Netcomm',
  'Netroch',
  'Nicatap',
  'Optoman',
  'Originaltu',
  'Othelop',
  'Paraxi',
  'PickScenes',
  'PicksLive',
  'Playbi',
  'Playcomp',
  'Playerti',
  'PlazaPictures',
  'Pointus',
  'Putlin',
  'ReelShow',
  'Reportswebt',
  'Resourcept',
  'Robicie',
  'Rollon',
  'Rometr',
  'Rosattie',
  'ScreenMessages',
  'Seccompus',
  'Setos',
  'SpecialFlick',
  'Speciti',
  'Standardex',
  'Tarris',
  'Theaterynol',
  'Tipsis',
  'TopicAnimation',
  'TopicImage',
  'TopicPictures',
  'TopicPlots',
  'Topicsys',
  'Trendyles',
  'TubeFilm',
  'Updatch',
  'VideoCustom',
  'Viewor',
  'Vitalle',
  'Volomicov',
  'Wayssal',
  'Weeklyndra',
  'Windiati',
  'Wiremo',
];

// Gets a random element from an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generates an object that includes a username and a corresponding email address
const getRandomUser = () => {
  const username = `${getRandomArrItem(usernames)}`;
  const user = {
    username: username,
    email: `${username}@example.com`,
  }
  return user;
};

// Generates an array of reactions using an array of users provided from the sampleThoughts function
const sampleReactions = (users) => {
  const results = [];
  const reactionCt = Math.floor(Math.random() * 5) + 1;
  for (let i = 0; i < reactionCt; i++) {
    results.push({ 
      reactionBody: `reaction ${++i}`,
      username: `${getRandomArrItem(users)}`,
    });
  }
  return results;
}

// Generates an array of n thoughts using an array of users given
const sampleThoughts = (count, users) => {
  const results = [];
  for (let i = 0; i < count; i++) {
    results.push({
      thoughtText: `thought ${++i}`,
      username: `${getRandomArrItem(users)}`,
      reactions: sampleReactions(users),
    });
  }
  return results;
}

module.exports = { getRandomUser, sampleThoughts };