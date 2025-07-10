# Chatify: A Real-Time MERN Stack Chat Application

*COMPANY*: CODTECH IT SOLUTIONS

*NAME*: SHIVAM PANDEY

*INTERN ID*: CT06DF1951

*DOMAIN*: REACT JS

*DURATION*: 6 WEEKS

*MENTOR*: NEELA SANTOSH


Chatify is a full-featured, real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). It provides a seamless and interactive chatting experience, allowing users to connect and communicate with each other instantly. This application showcases a robust backend infrastructure and a dynamic, responsive frontend, making it a comprehensive example of a modern web application.

## Key Features

*   **User Authentication:** Secure user registration and login system using JSON Web Tokens (JWT) for authentication. Passwords are encrypted using bcryptjs to ensure data privacy.
*   **Real-Time Messaging:** Instant messaging with typing indicators, powered by Socket.IO. Messages are delivered and updated in real-time without needing to refresh the page.
*   **One-on-One Chat:** Users can search for other registered users and initiate private conversations.
*   **Group Chat:** Functionality to create and manage group chats. Users can add or remove members from the group, and group administrators have additional privileges.
*   **User Search:** A search feature that allows users to find other users on the platform to start a conversation.
*   **Notifications:** Real-time notifications for new messages, keeping users engaged and informed.
*   **Responsive Design:** The user interface is built with Chakra UI, ensuring a clean, modern, and fully responsive design that works on all devices.
*   **Profile Management:** Users can view their profile information and update their profile picture.

## Technology Stack

### Backend

*   **Node.js:** A JavaScript runtime environment for building the server-side of the application.
*   **Express.js:** A fast and minimalist web framework for Node.js, used to build the RESTful APIs.
*   **MongoDB:** A NoSQL database used to store application data, including user information, chats, and messages.
*   **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js, used to manage relationships between data and provide schema validation.
*   **Socket.IO:** A library that enables real-time, bidirectional, and event-based communication between the client and the server.
*   **JSON Web Tokens (JWT):** Used for creating access tokens for user authentication and authorization.
*   **bcryptjs:** A library for hashing passwords to securely store them in the database.
*   **dotenv:** A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

### Frontend

*   **React.js:** A JavaScript library for building user interfaces.
*   **Chakra UI:** A simple, modular, and accessible component library that gives you the building blocks you need to build your React applications.
*   **Axios:** A promise-based HTTP client for the browser and Node.js, used to make API requests to the backend.
*   **Socket.IO Client:** The client-side library for Socket.IO, used to establish a real-time connection with the server.
*   **React Router:** A standard library for routing in React.
*   **React Context API:** Used for state management to provide a way to pass data through the component tree without having to pass props down manually at every level.

## Project Structure

The project is organized into two main directories: `backend` and `frontend`.

### `backend`

```
backend
├── config
│   ├── db.js
│   └── generateToken.js
├── controllers
│   ├── chatControllers.js
│   ├── messageControllers.js
│   └── userControllers.js
├── data
│   └── data.js
├── middleware
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models
│   ├── chatModel.js
│   ├── messageModel.js
│   └── userModel.js
├── routes
│   ├── chatRoutes.js
│   ├── messageRoutes.js
│   └── userRoutes.js
└── server.js
```

*   **`config`:** Contains configuration files for the database connection and JWT generation.
*   **`controllers`:** Handles the business logic for processing incoming requests.
*   **`data`:** Contains sample data for seeding the database.
*   **`middleware`:** Includes custom middleware for authentication and error handling.
*   **`models`:** Defines the Mongoose schemas for the database collections.
*   **`routes`:** Defines the API endpoints and maps them to the corresponding controller functions.
*   **`server.js`:** The entry point for the backend application. It sets up the Express server, connects to the database, and initializes Socket.IO.

### `frontend`

```
frontend
├── public
└── src
    ├── animations
    ├── components
    │   ├── Authentication
    │   ├── miscellaneous
    │   └── userAvatar
    ├── config
    ├── Context
    ├── data
    └── Pages
```

*   **`src/components`:** Contains reusable React components that make up the UI.
*   **`src/Context`:** Holds the React Context for global state management.
*   **`src/Pages`:** Contains the main pages of the application, such as the Homepage and Chatpage.
*   **`src/config`:** Contains frontend configuration files.

## Setup and Installation

To get the application running on your local machine, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mern-chat-app.git
    cd mern-chat-app
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd frontend
    npm install
    cd ..
    ```

4.  **Create a `.env` file in the `backend` directory** and add the following environment variables:
    ```
    NODE_ENV=development
    PORT=8080
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    ```

5.  **Start the backend server:**
    ```bash
    npm run server
    ```
    The server will start on `http://localhost:8080`.

6.  **Start the frontend development server:**
    ```bash
    cd frontend
    npm start
    ```
    The application will open in your browser at `http://localhost:3001`.

Now you can register a new user and start chatting!

#OUTPUT

<img width="1836" height="826" alt="Image" src="https://github.com/user-attachments/assets/239caffd-d500-41be-8e44-b047dcf240f6" />
<img width="1809" height="818" alt="Image" src="https://github.com/user-attachments/assets/a349aab5-7e0e-4c52-8a26-c33c85f3fd6a" />
<img width="1855" height="814" alt="Image" src="https://github.com/user-attachments/assets/8be22c4e-02cc-446a-96d1-cf2fea96cf34" />
<img width="1885" height="777" alt="Image" src="https://github.com/user-attachments/assets/fcf4505e-4f5a-4eea-8998-0a42cb4a44fd" />
<img width="1884" height="806" alt="Image" src="https://github.com/user-attachments/assets/3b5d9ecf-03ad-4a49-b0c1-17d7fc132600" />
<img width="1880" height="838" alt="Image" src="https://github.com/user-attachments/assets/eb40b2cf-228d-42b8-8b0c-cb008074a907" />
