# Vitrine-FP-DI_bootcamp

## Description
This web application allows artists and designers to showcase their works and the inspirations behind their collections. It's a platform for creatives to display their artwork in an organized gallery format, making it easy to share with audiences.

## Features
- **Gallery Creation**: Artists can create personal pages to display their uploads visually.
- **Short Descriptions**: Users can add descriptions to provide context for each piece of artwork.
- **Credits Section**: Artists can acknowledge sources of inspiration and legal requirements by adding credit information.
- **External Links**: The app allows for linking to personal websites, pages, and stores to facilitate further exploration of the artist's work.

## Technologies Used
-  HTML, CSS, JavaScript, React, Node.js

## Installation
1. Clone the repository: 
   ```bash
   git clone https://github.com/GBlecher/Vitrine-FP-DI_bootcamp

2.  
    $ cd backend
    $ npm install
    $ node server.js (/nodemon server.js)
    
3. open another terminal  
    $ cd frontend
    $ npm install
    $npm run dev


### Description of Key Files and Directories

- **/config/db.js**: This file contains the configuration for connecting the application to the database. It's typically where you define your database credentials and connection parameters.

- **/controllers/**: This directory contains the business logic of your application. 
  - **postControllers.js**: Functions to handle the creation, retrieval, updating, and deletion of posts.
  - **userControllers.js**: Functions to handle user registration, login, and profile management.

- **/middlewares/verifyToken.js**: Middleware to check if a user's token is valid, ensuring that protected routes can only be accessed by authenticated users.

- **/models/**: Contains the database models that represent the structure of your data.
  - **userModel.js**: Defines the schema for user data, including fields like username, email, and password.
  - **postModel.js**: Defines the schema for posts, including fields such as title, content, image URL, and associated user.

- **/routes/**: This directory handles the routing of HTTP requests for different resources in the app.
  - **userRouter.js**: Defines the routes related to user operations, such as registration and login.
  - **postRouter.js**: Defines routes for post operations, including adding and retrieving posts.

- **server.js**: The entry point of the application, responsible for connecting to the database, setting up middleware, and defining API routes.

- **package.json**: Contains metadata about the project, lists dependencies, and includes scripts to run tests or start the server.
