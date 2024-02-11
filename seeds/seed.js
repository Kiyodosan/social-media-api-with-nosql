const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomUser, sampleThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  //// Is it supposed to be name: 'thoughts' and name: 'users'?
  let thoughtCheck = await connection.db.listCollections({ name: 'thought' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thought');
  }

  let userCheck = await connection.db.listCollections({ name: 'user' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('user');
  }

  const users = [];

  // Generates 30 random users
  for (let i = 0; i < 30; i++) {
    const newUser = getRandomUser();

    // Checks if username is already taken
    let isDuplicateUser = false;
    if (users.some(user => user.username === newUser.username)) {
      isDuplicateUser = true;
    }

    if (isDuplicateUser) {
      i--;
      continue;
    }

    users.push(newUser);
  }

  const userData = await User.insertMany(users);
  // Generates 20 thoughts with 1 to 5 reactions for each one
  const usernames = [...userData.map(({username}) => username)];
  await Thought.insertMany(sampleThoughts(20, usernames));

  process.exit(0);
});