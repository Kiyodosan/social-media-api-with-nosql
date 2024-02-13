const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomUser, sampleThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  //// Is it supposed to be name: 'thoughts' and name: 'users'?
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
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

  // const userData = await User.insertMany(users);

  // Generates 20 thoughts with 1 to 5 reactions for each one
  const usernames = [...users.map(({username}) => username)];
  // const usernames = [...userData.map(({username}) => username)];
  const thoughtData = await Thought.insertMany(sampleThoughts(20, usernames));

  const userData = await User.insertMany(users);

  //// Trying to associate thoughts with correct user.
/*   const thoughts = [...thoughtData.map(({_id}) => _id)];
  for (let i = 0; i < thoughts.length; i++) {
    await User.findOneAndUpdate(
      { username: { thoughts: { username: User.username } } },
      { $set: { thoughts: { _id: thoughts[i] } } },
      { runValidators: true, new: true }
    );
  } */

/*   await User.updateMany(
    { username: { thoughts: { username: User.username } } },
    { $set: { thoughts: { _id: thoughts._id } } },
    { runValidators: true, new: true }
  ); */

  process.exit(0);
});