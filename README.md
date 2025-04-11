# M3nd Full Stack Application

## Overview

This repository contains the frontend and backend code for the M3nd application. The backend is built with Node.js, Express, React, and MongoDB, handling user authentication (local and Google OAuth), journal entries, and interactions with the OpenAI API. The frontend is a React application built with Vite.

## Prerequisites

*   Node.js (LTS version recommended)
*   npm (usually comes with Node.js)
*   Git
*   MongoDB Atlas account (or a local MongoDB instance)
*   Google Cloud Platform account (for Google OAuth)
*   OpenAI API Key

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd m3nd
    ```

2.  **Backend Setup:**
    *   Navigate to the backend directory:
        ```bash
        cd backend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env` file in the `backend` directory by copying `.env.example`:
        ```bash
        cp .env.example .env
        ```
    *   Populate the `backend/.env` file with your credentials:
        *   `MONGODB_URI`: Your MongoDB connection string (e.g., from MongoDB Atlas).
        *   `PORT`: (Optional) The port for the backend server to run on. Defaults to `3000`.
        *   `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: Your Google OAuth credentials obtained from the Google Cloud Console. Follow these steps to get them:
            1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
            2.  Create a new project or select an existing one.
            3.  Navigate to "APIs & Services" > "Credentials".
            4.  Click "+ CREATE CREDENTIALS" and select "OAuth client ID".
            5.  If prompted, configure the "OAuth consent screen".
                *   Choose "External" or "Internal" based on your needs.
                *   Fill in the required app information (App name, User support email, Developer contact information). Scopes can be configured later if needed. Save and continue.
            6.  Select "Web application" as the Application type.
            7.  Give your OAuth client ID a name (e.g., "M3nd Web Client").
            8.  Under "Authorized JavaScript origins", add `http://localhost:5173` (or your frontend's URL if different).
            9.  Under "Authorized redirect URIs", add `http://localhost:3000/auth/google/callback`. **Important:** Replace `3000` with the actual port your backend server will run on if you change it via the `PORT` environment variable.
            10. Click "CREATE".
            11. Copy the "Your Client ID" and "Your Client Secret" shown and paste them into your `backend/.env` file.
        *   `SESSION_SECRET`: A long, random string used to secure sessions. You can generate one using a tool or `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
        *   `OPENAI_API_KEY`: Your API key from OpenAI.
            1.  Go to the [OpenAI Platform](https://platform.openai.com/).
            2.  Sign up for an account or log in if you already have one.
            3.  Navigate to the "API keys" section in your account settings (usually accessible via the sidebar or user menu).
            4.  Click on "+ Create new secret key".
            5.  Give your key a descriptive name (e.g., "M3nd App Key") and click "Create secret key".
            6.  **Important:** Copy the generated API key immediately and securely store it. You won't be able to see it again after closing the dialog.
            7.  Paste the copied key into your `backend/.env` file as the value for `OPENAI_API_KEY`.

3.  **Frontend Setup:**
    *   Navigate to the frontend directory:
        ```bash
        cd ../frontend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   *(Optional)* Create a `.env` file in the `frontend` directory if you need to configure frontend-specific environment variables (e.g., `VITE_API_BASE_URL`). Currently, the backend URL seems expected to be `http://localhost:3000` (or the port specified in `backend/.env`).

## Running the Application

1.  **Start the Backend Server:**
    *   Open a terminal, navigate to the `backend` directory:
        ```bash
        cd backend
        ```
    *   Run the start script:
        ```bash
        npm start
        ```
    *   The backend server will typically start on port 3000 (or the port specified in `backend/.env`).

2.  **Start the Frontend Development Server:**
    *   Open another terminal, navigate to the `frontend` directory:
        ```bash
        cd ../frontend
        # Or just cd frontend if starting from the root
        ```
    *   Run the development script:
        ```bash
        npm run dev
        ```
    *   The frontend development server will start, usually on port 5173. Open your browser to `http://localhost:5173`.

## Important Ports

*   **Backend:** Defaults to `3000` (configurable via `PORT` in `backend/.env`).
*   **Frontend (Vite Dev Server):** Defaults to `5173`.

## Available Scripts

### Backend (`/backend`)

*   `npm start`: Starts the backend server using `nodemon` for automatic restarts during development.
*   `npm test`: (Currently configured to echo an error)

### Frontend (`/frontend`)

*   `npm run dev`: Starts the Vite development server.
*   `npm run build`: Builds the frontend application for production.
*   `npm run lint`: Lints the frontend code using ESLint.
*   `npm run preview`: Serves the production build locally.

## Environment Variables & Security

*   The `.env` files in both `frontend` and `backend` directories are crucial for storing sensitive information like API keys and database credentials.
*   These files are listed in the root `.gitignore` file and should **never** be committed to version control. Ensure your `.gitignore` is configured correctly before committing. 