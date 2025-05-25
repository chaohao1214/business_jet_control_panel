# Business Jet Cabin Control & Monitoring Panel ✈️

A full-stack web application designed to simulate the control and monitoring of a business jet's cabin environment and communication systems. Users can interact with a dynamic interface to manage aspects like lighting, climate (conceptual), entertainment (conceptual), and monitor real-time Wi-Fi, satellite phone, and intercom statuses. The project features real-time updates via MQTT and WebSockets, and a user-switchable light/dark theme.

---

🚀 **[Live Demo Link Placeholder - To be added when deployed]**

🖼️ **[Application Screenshot Placeholder - e.g., `![Dashboard Screenshot](./docs/images/dashboard.png`)]**
*(Consider adding a screenshot of the main dashboard or the communication panel here later.)*

## Tech Stack 🛠️

This project leverages a modern set of technologies to deliver a reactive user experience and real-time communication:

### Frontend Technologies
<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
  <img src="https://img.shields.io/badge/MUI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="MUI"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/>
</p>

### Backend Technologies
<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.io"/>
  <img src="https://img.shields.io/badge/MQTT-660066?style=for-the-badge&logo=mqtt&logoColor=white" alt="MQTT"/>
</p>

### Detailed Breakdown:
* **Frontend**:
    * React (with Vite for building)
    * MUI (Material-UI for component library)
    * React Router DOM (for client-side routing)
    * Axios (for HTTP client)
    * Socket.IO Client (for WebSocket communication)
    * MQTT.js (for MQTT communication)
* **Backend**:
    * Node.js (runtime environment)
    * Express.js (web application framework)
* **Database**:
    * MongoDB (NoSQL database, with Mongoose ODM)
* **Real-time Communication Protocols**:
    * WebSockets (via Socket.IO)
    * MQTT
* **Styling & Theming**:
    * MUI Theming System (`createTheme`, `sx` prop)
    * Custom themes for Light/Dark modes
* **Development & Tooling**:
    * ESLint (for code linting)
    * Prettier (for code formatting)
    * Nodemon (for backend auto-restarts during development)
    * Git & GitHub (for version control and hosting)

## Folder Structure 📁

An overview of the project's folder organization:

```text
business-jet-control-panel/
├── client/                     # React Frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Static assets (images, fonts, etc.)
│   │   ├── components/         # Reusable UI components (e.g., AppSidebar, StatusCard)
│   │   ├── features/           # Feature-specific modules (e.g., communication, lighting)
│   │   │   └── communication/  # Components, services, pages for the communication feature
│   │   ├── layouts/            # Layout components (e.g., MainLayout)
│   │   ├── services/           # API client instances, MQTT client setup
│   │   ├── theme/              # MUI theme configuration, ThemeModeContext
│   │   │   ├── theme.js
│   │   │   └── ThemeModeContext.jsx
│   │   ├── App.jsx             # Main application component with routing
│   │   └── main.jsx            # Entry point for the React application
│   ├── vite.config.js
│   └── package.json
├── server/                     # Node.js Backend (Express.js)
│   ├── src/
│   │   ├── config/             # Database connection, MQTT broker settings, env vars
│   │   ├── controllers/        # Route handlers, request/response logic
│   │   ├── middleware/         # Custom Express middleware (e.g., auth, error handling)
│   │   ├── models/             # Mongoose schemas for MongoDB
│   │   ├── routes/             # API route definitions
│   │   ├── services/           # Business logic, MQTT service, WebSocket service, simulation logic
│   │   └── server.js           # Express application entry point and server setup
│   ├── .env.example            # Example for environment variables
│   └── package.json
├── .gitignore                  # Specifies intentionally untracked files that Git should ignore
└── README.md                   # This file
```

## Project Content & Key Features ✨

* **Cabin Control Simulation**:
    * Interactive sidebar navigation for different control modules.
    * Dynamic main content display based on selected module.
* **Communication Module UI**:
    * Display for Wi-Fi status (Status, Frequency, IP Address, Subnet Mask).
    * Display for Satellite Phone status (Status, Number).
    * Display for Intercom status (Status, Destination) and a "Call" button.
* **UI & UX**:
    * Switchable Light/Dark themes with persistence via `localStorage`.
    * User interface built with MUI for a clean and modern look.
* **Real-time Updates**:
    * Leveraging MQTT for message broking (simulated device updates).
    * WebSockets (Socket.IO) for pushing updates from backend to frontend.
* **(Future Features - To Be Added)**
    * Interactive controls for lighting, climate.
    * User authentication.
    * More detailed system simulations and data visualization.
    * Enhanced responsive design for various screen sizes.

## Getting Started 🚀

**(Prerequisites: Node.js (e.g., v18+), npm/yarn, a MongoDB instance (local or cloud like MongoDB Atlas free tier), an MQTT Broker (local or cloud like HiveMQ Cloud free tier))**

### Frontend Setup
1.  Navigate to the `client` directory:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
    The frontend will usually be available at `http://localhost:5173` (Vite's default).

### Backend Setup
1.  Navigate to the `server` directory:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  Create a `.env` file in the `server` directory by copying `.env.example` and fill in your specific configuration values (MongoDB URI, MQTT Broker URL, Port, etc.).
    ```bash
    cp .env.example .env 
    # Now edit .env with your details
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
    The backend server will typically start on the port specified in your `.env` file (e.g., `http://localhost:5001`).

## Deployment ☁️

**(Details on how to deploy the application to services like Vercel (frontend) and Render (backend) will be added here later.)**

## ✨ Author / Main Contributor

This project is primarily developed and maintained by: **Chaohao Zhu** 👋

*(This README is a work in progress and will be updated as the project develops.)*
