<a name="top"></a>
![Link A Doodle Logo](frontend/src/icons/logo.svg "Link A Doodle Logo")

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB)](https://reactjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.4.7-FF007A)](https://www.framer.com/motion/)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.14.0-47A248)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-27.5.1-2496ED)](https://www.docker.com/)
[![npm](https://img.shields.io/badge/npm-10.9.2-CB3837)](https://www.npmjs.com/)
[![Render](https://img.shields.io/badge/Render-Hosting-8A05FF?logo=render&logoColor=white)](https://render.com/docs)

If you find this project helpful, please consider starring it on GitHub. Your support is appreciated! ⭐

[![Share](https://img.shields.io/badge/share-000000?logo=x&logoColor=white)](https://x.com/intent/tweet?text=Check%20out%20this%20project%20on%20GitHub:%20https://github.com/ItaiHammer/link-a-doodle%20%23URLShortener%20%23React%20%23Express)
[![Share](https://img.shields.io/badge/share-1877F2?logo=facebook&logoColor=white)](https://www.facebook.com/sharer/sharer.php?u=https://github.com/ItaiHammer/link-a-doodle)
[![Share](https://img.shields.io/badge/share-0077B5?logo=linkedin&logoColor=white)](https://www.linkedin.com/sharing/share-offsite/?url=https://github.com/ItaiHammer/link-a-doodle)
[![Share](https://img.shields.io/badge/share-FF4500?logo=reddit&logoColor=white)](https://www.reddit.com/submit?title=Check%20out%20this%20project%20on%20GitHub:%20https://github.com/ItaiHammer/link-a-doodle)
[![Share](https://img.shields.io/badge/share-0088CC?logo=telegram&logoColor=white)](https://t.me/share/url?url=https://github.com/ItaiHammer/link-a-doodle&text=Check%20out%20this%20project%20on%20GitHub)

## Table of Contents

- [📖 About](#about)
- [✨ Features](#features)
- [🚀 Features in Implementation](#features-in-implementation)
- [🛠️ Technologies Used](#technologies-used)
- [📚 Getting Started](#getting-started)
- [⚙️ Running the Application](#running-the-application)
- [🔧 Environment Variables](#environment-variables)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

## 📖 About

<img src="assets/demo2.gif" alt="App Demo" width="400" height="200" style="border-radius: 10px;">

A sleek, modern URL shortener that makes sharing links simple.

Built with React, Framer Motion, Express API, MongoDB, Link A Doodle features a clean interface that makes sharing and tracking links effortless and accountless.

We designed Link A Doodle as a simple, accountless solution because we know you don’t want to create an account just to share a link. Our platform provides complete transparency: all users can view analytics for every link, ensuring you feel safe and informed when clicking on a Link A Doodle link.

---

## ✨ Features

- **Accountless Service:** No sign-up required to shorten, share, or track your links.
- **Modern Animated UI:** Smooth transitions and animations powered by Framer Motion with a modern sleek React power user interface.
- **Responsive Design:** Optimized for desktop and mobile devices.

---

## 🚀 Features in Implementation

- **Public Analytics:** View analytics for all links for full transparency.
- **Dark Mode:** Toggle between light and dark themes for comfortable viewing.

---

## 🛠️ Technologies Used

- **Frontend:** React 19.0.0, Framer Motion 12.4.7, Axios 1.7.9
- **Backend:** Express API 4.21.2
- **Database:** MongoDB 6.14.0
- **Styling:** CSS & CSS Modules
- **Deployment:** Render

---

## 📚 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) (v10.9.2 recommended) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ItaiHammer/link-a-doodle/link-a-doodle.git
   cd link-a-doodle
   ```

2. **Install Dependencies**

   Install dependencies:

   ```bash
   npm install
   ```

---

## ⚙️ Running the Application

### Running Locally

1. #### Running in development mode

   From the `root` directory:

   ```bash
   npm run dev
   ```

   This runs both the React frontend and Express backend concurrently using the `concurrently` library:

   - Frontend: `http://localhost:3000/`
   - Backend: `http://localhost:5000/`

   Changes in either folder will automatically reload the app using React for the frontend and `nodemon` for the backend.

2. #### Running in production mode

   From the `root` directory

   ```bash
   npm run build
   ```

   This runs `npm run build:frontend`, which navigates into the `/frontend` directory and generates a static production build in `/frontend/build`.

   Now start the backend with:

   ```bash
   npm start
   ```

   This starts the Express backend and serves the static frontend files from the `/frontend/build` directory at:

   - `http://localhost:5000/`

### Running with Docker (No Longer Working)

To run the application using Docker, follow these steps:

1. **Build and Start the Containers**

   From the root directory, run:

   ```bash
   docker-compose up --build
   ```

   This command will build the Docker images and start the containers for the frontend, backend, and Nginx reverse proxy.

2. **Access the Application**

   Once the containers are up and running, you can access the application at `http://localhost`.

---

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# .env
MONGO_URI=your_mongo_uri_here
CLIENT_URL=http://localhost:3000
```

- MONGO_URI
  - This is the connection string for your [MongoDB](https://www.mongodb.com/cloud/atlas) database.
  - Example format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority`
- CLIENT_URL
  - This is the origin that the backend server will allow through [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

[Back to top](#top)
