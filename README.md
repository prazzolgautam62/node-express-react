# Node.js Express & React Monorepo

This project combines a Node.js backend using Express and a React frontend. Both the backend and frontend are structured in a monorepo setup.


## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

## Getting Started

### 1. Clone the Repository

Clone the project from the repository to your local machine:

```bash
git clone git@gitlab.com:prajwalingrails/node-express-react.git
```

### 2. Navigate to the Project Directory

Go to the project’s root folder:

```bash
cd node-express-react
```

### 3. Install Dependencies

Install all dependencies required for both the backend and frontend.

```bash
npm install
```
### 4. Running the Project

To run both the backend and frontend in development mode concurrently, use the following command:

```bash
npm run dev:all
```

This will:

Start the Node.js Express backend server on port 3000.
Start the React frontend development server on port 3001.

### 5. Access the App

Backend (Node.js Express): Runs on http://localhost:3000.

Frontend (React): Runs on http://localhost:3001.

## Scripts
In the project root, you can run the following npm scripts:

```bash
npm run database:migrate
```

Runs database migrations and creates all necessary tables.

```bash
npm run dev:all
```

Runs both the backend (on port 3000) and the frontend (on port 3001) in development mode.

```bash
npm run dev
```
Runs only the Node.js backend on port 3000.
```bash
npm run client:dev
```
Runs only the React frontend on port 3001

## Technologies Used
Backend: Node.js, Express

Frontend: React

Development Tools: Nodemon, Concurrently


