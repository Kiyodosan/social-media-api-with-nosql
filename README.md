
# social-media-api-with-nosql

---

## Table of Contents

- [Project Description](#project-description)
- [How to run this project](#how-to-run-this-project)
- [How to use this project](#how-to-use-this-project)
- [Credits](#credits)
- [License](#license)

## Project Description

This social media API is a backend-only project that uses NoSQL with MongoDB and Mongoose to simulate a social media site database. It contains a collection of users, thoughts (post), and reactions that are randomly generated to create an example backend for testing. Testing was completed using ExpressJS and Insomnia.

## How to run this project

Click on the following image to watch a demo video on how to use this project:

[![Social Media API with NoSQL - demo video](<assets/images/Screenshot 2024-02-14 220916.png>)](https://drive.google.com/file/d/1tv5RoNb6MyA_9_YDjLJkn_DMfC55ImpE/view?usp=drive_link)

Make sure Node.js is installed on your device. You can open the command terminal and enter "node -v" to check if node is installed. If the command terminal responds back with a version of Node, then it is installed. Otherwise, go to https://nodejs.org/en/download/ and download the LTS version of Node for your operating system (Windows, Mac, Linux, etc.).

Open the command terminal. Enter "npm run seed" to refresh the tables in the database with their default data. Then enter "npm start" to initiate the program.

Make sure Insomnia is installed on your device. If Insomnia is not installed, go to https://insomnia.rest/download and download the appropriate version for your operating system (Windows / MacOS / Ubuntu).

Open Insomnia and select an existing collection or create a new one. Create HTTP requests using CRUD operations for the desired routes. Use addresses found in the "How to use this project" section to configure your HTTP requests. For POST and PUT requests, additionally add data in JSON format in the request body before sending.

## How to use this project

### Users

``http://localhost:3004/api/users/``

#### GET All

Use a GET request to retrieve a list of all users. This will also include any friends and thoughts created by the user.

#### POST

Use a POST request to create a new user. This request requires a request body in JSON format.

Example:

{
  "username": "person",
  "email": "person@example.com",
}

``http://localhost:3004/api/users/:id``

* :id must be replaced with a user ID

#### GET

Use a GET request to retrieve a specific user by _id. This will also include any friends added and thoughts created by the user.

#### PUT

Use a PUT request to update a specific user by _id. This request requires a request body in JSON format.

Example:

{
  "username": "dog",
  "email": "dog@example.com",
}

#### DELETE

Use a DELETE request to remove a specific user by _id.

``http://localhost:3004/api/users/:id/friends``

* :id must be replaced with a user ID

#### POST

Use a POST request to add a friend to a specific user. This request requires a request body in JSON format.

Example:

{
  "_id": "65cd9f72982a5d5377f0e44a"
}

``http://localhost:3004/api/users/:id/friends/:friendId``

* :id must be replaced with a user ID
* :friendId must be replaced with a different user ID

#### DELETE

Use a DELETE request to remove a friend from a specific user.

### Thoughts & Reactions

``http://localhost:3004/api/thoughts/``

#### GET All

Use a GET request to retrieve a list of all thoughts. This will also include the user who posted it and any reactions added.

#### POST

Use a POST request to create a new thought. This request requires a request body in JSON format.

Example:

{
  "thoughtText": "thought",
  "username": "posterboy",
}

``http://localhost:3004/api/thoughts/:id``

* :id must be replaced with a thought ID

#### GET

Use a GET request to retrieve a specific thought by _id. This will also include the user who posted it and any reactions added.

#### PUT

Use a PUT request to update a specific thought by _id. This request requires a request body in JSON format.

Example:

{
  "thoughtText": "updated thought",
  "username": "postergirl",
}

#### DELETE

Use a DELETE request to remove a specific thought by _id.

``http://localhost:3004/api/thoughts/:id/reactions``

* :id must be replaced with a thought ID

#### POST

Use a POST request to add a reaction to a specific thought. This request requires a request body in JSON format.

Example:

{
  "reactionBody": "reaction",
  "username": "reactor",
}

``http://localhost:3004/api/thoughts/:id/reactions/:reactionId``

* :id must be replaced with a thought ID
* :reactionId must be replaced with a reaction ID

#### DELETE

Use a DELETE request to remove a reaction from a specific thought.

## Credits

Tyler Odo

## License

Default