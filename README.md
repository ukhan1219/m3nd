# Mend: AI-Powered Mental Wellness Journal

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-orange.svg)](https://www.mongodb.com/)
[![OpenAI](https://img.shields.io/badge/AI-OpenAI_API-purple.svg)](https://openai.com/)

Mend is a full-stack digital journaling application designed to provide a safe, private, and supportive space for users to explore their thoughts and emotions. By integrating an AI-powered analysis feature, Mend acts as a friendly mental wellness companion, offering empathetic insights and practical advice to help users on their mental health journey.

## Demo

*A screen-recorded demo of the app in action:*

[![Mend App Demo](https://img.youtube.com/vi/IG7M7hiEpI4/0.jpg)](https://www.youtube.com/watch?v=IG7M7hiEpI4)

## 🚀 Project Purpose & Motivation

Mend was born from a desire to support individuals who face a stigma around mental health. For many, including myself, family or cultural environments can be unsupportive of traditional therapy, creating barriers to getting help. Mend was created to bridge this gap, offering a first step into mental wellness in a private and non-judgmental way.

The core idea is to provide friendly, AI-driven feedback that feels like talking to a compassionate friend, not a licensed therapist. We hope that by using Mend to articulate their feelings and receive positive reinforcement, users will feel more comfortable and prepared to seek professional therapy when they are ready.

This project serves as a portfolio piece to showcase a comprehensive skill set in:
*   **Full-Stack Development:** Architecting and building a complete, data-driven application from the ground up.
*   **Secure Data Handling:** Implementing robust authentication and ensuring user data is stored and managed securely.
*   **AI API Integration:** Leveraging powerful external APIs like OpenAI to create intelligent and meaningful user experiences.

## ✨ How It Works: The Full-Stack Architecture

Mend is built on a modern, decoupled architecture that separates the user-facing application from the core backend logic. This ensures a secure, scalable, and maintainable system.

```
+--------------------+   (Secure REST API)   +--------------------+   (OpenAI API)   +-----------------+
|   React Frontend   |<--------------------->|   Node.js Backend  |----------------->|   OpenAI        |
|  (Vite, Tailwind)  |                       |  (Express.js)      |                  | (gpt-4o-mini)   |
| - UI Components    |                       | - Auth Middleware  |                  +-----------------+
| - Client-side Auth |                       | - API Endpoints    |
| - State Management |                       | - OpenAI Service   |
+---------|----------+                       +---------|----------+
          |                                            | (MongoDB Driver)
          | (User Interaction)                         |
          v                                            v
+---------|----------+                       +---------|----------+
|      User's        |                       |    MongoDB Atlas   |
|      Browser       |                       |    Database        |
+--------------------+                       +--------------------+
```

### 1. React Frontend (Client)
The user interface is a responsive Single-Page Application (SPA) built with **React** and **TypeScript**, using **Vite** for a fast development experience.
-   **User Interface:** Styled with **Tailwind CSS**, the UI is designed to be clean, intuitive, and calming.
-   **Routing:** **React Router** manages navigation between pages like the Landing Page, Dashboard, and the Journal.
-   **Authentication:** The app uses a custom `AuthContext` to manage user sessions globally. On startup, it checks the user's session with the backend. Pages containing sensitive information are protected by a `ProtectedRoute` component, which redirects unauthenticated users to the login page.

### 2. Node.js Backend (Server)
The backend is a robust REST API built with **Node.js** and the **Express.js** framework.
-   **Authentication:** It handles all user authentication and session management using **Passport.js**. It supports both traditional email/password registration (with passwords securely hashed by **bcrypt**) and Google OAuth 2.0 for social login.
-   **API Endpoints:** It provides a full suite of secure RESTful endpoints for all journal-related operations (Create, Read, Update, Delete). Every sensitive endpoint is protected by middleware that ensures a user is authenticated before allowing access.
-   **AI Integration:** When a user requests an analysis of their journal entry, the backend securely communicates with the **OpenAI API**, sending the text to the `gpt-4o-mini` model and processing the response before saving it and sending it back to the user.

### 3. MongoDB (Database)
A **MongoDB** NoSQL database, hosted on Atlas, serves as the application's data store.
-   The `Users` collection stores user profiles, credentials, and authentication details.
-   The `Journal` collection stores all journal entries, which include the user's content, the associated date, and the AI-generated analysis.

## 🔑 Key Features

*   **Secure User Authentication:** Users can sign up and log in via email/password or their Google account. Sessions are managed securely with backend and frontend protections.
*   **Private Journaling:** A rich text editor provides a clean and simple interface for users to write and save their daily journal entries.
*   **AI-Powered Analysis:** With the click of a button, users can submit their entry for analysis. The backend sends the text to an AI model specifically prompted to act as a "compassionate therapist," which returns empathetic and constructive feedback.
*   **Entry History:** A user's dashboard displays a calendar view, highlighting the dates they have made entries, allowing for easy navigation and reflection on past thoughts.
*   **Responsive Design:** The application is fully responsive, offering a seamless experience on both desktop and mobile devices.

## 🛠️ Technology Stack

*   **Frontend:**
    *   **React 18** & **TypeScript**
    *   **Vite** (Build Tool)
    *   **React Router v7** (Routing)
    *   **Tailwind CSS** (Styling)
*   **Backend:**
    *   **Node.js** & **Express.js**
    *   **Passport.js** (Authentication: `passport-google-oauth20`, `passport-local`)
    *   **express-session** & **bcrypt** (Session Management & Hashing)
    *   **MongoDB Driver** (Database Communication)
*   **Database:**
    *   **MongoDB** (NoSQL Database) hosted on MongoDB Atlas
*   **External APIs:**
    *   **OpenAI API** (`gpt-4o-mini`)
*   **Development & Tooling:**
    *   **Jira & Trello** (Agile Project Management)
    *   **Git & GitHub** (Version Control)

## 🔧 How to Replicate

To run this project locally, you will need `node` and `npm` installed.

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/m3nd.git
    cd m3nd/backend
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the `backend` directory and add the following, replacing the placeholder values with your own keys:
    ```env
    # Server Configuration
    PORT=3000

    # MongoDB Connection
    MONGODB_URI="your_mongodb_connection_string"

    # Session Management
    SESSION_SECRET="a_long_random_string_for_session_security"

    # OpenAI API Key
    OPENAI_API_KEY="your_openai_api_key"

    # Google OAuth Credentials
    GOOGLE_CLIENT_ID="your_google_client_id"
    GOOGLE_CLIENT_SECRET="your_google_client_secret"
    ```

4.  **Run the backend server:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:3000`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    # From the root m3nd directory
    cd frontend
    ```

2.  **Install frontend dependencies:**
    ```bash
    npm install
    ```
3.  **Run the frontend application:**
    ```bash
    npm run dev
    ```
    The React application will start, typically on `http://localhost:5173`. Open this address in your browser to use the app.

## 🏆 Accomplishments & Learnings

*   **Accomplished:**
    *   As a team, we successfully designed and deployed a full-stack application using agile methodologies, which I managed as the project lead.
    *   I am most proud of the final **user experience**. The low latency between submitting a journal entry and receiving the AI analysis makes the core feature feel seamless and interactive.
*   **Learned:**
    *   The biggest challenge was **managing application state** across the frontend and ensuring it remained perfectly synchronized with the backend, especially when creating and updating journal entries and their associated analyses.
    *   This project was a deep dive into building secure and scalable backend APIs, reinforcing best practices for authentication, data validation, and error handling.

## 🔮 Future Work

Mend is under continuous development based on user feedback. A key feature planned for a future release is:
*   **Overall Tone Analysis:** We plan to add a feature that analyzes the overall tone of a journal entry and displays a color-coded indicator (e.g., green, yellow, or red) on the user's dashboard. This will give users an at-a-glance impression of their emotional state over time.

## 🤝 Team & Roles

This project was developed by a team of five students with the following roles:

*   **Project Manager & Backend Lead:** Usman
*   **UX/UI Design:** Thashin
*   **Frontend Development:** Thashin, Melanie
*   **Backend Development:** Usman, Jonathan 