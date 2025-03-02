<a name="top"></a>
![Link A Doodle Logo](frontend/src/icons/logo.svg 'Link A Doodle Logo')

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB)](https://reactjs.org/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12.4.7-FF007A)](https://www.framer.com/motion/)
[![Express](https://img.shields.io/badge/Express-4.21.2-000000)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.14.0-47A248)](https://www.mongodb.com/)
[![Docker](https://img.shields.io/badge/Docker-27.5.1-2496ED)](https://www.docker.com/)
[![npm](https://img.shields.io/badge/npm-10.9.2-CB3837)](https://www.npmjs.com/)
[![Vercel](https://img.shields.io/badge/Vercel-CLI-000000)](https://vercel.com/docs/cli)

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

A sleek, modern URL shortener that makes sharing links simple.

Built with React, Framer Motion, Express API, MongoDB, and Docker, Link A Doodle features a clean interface that makes sharing and tracking links effortless and accountless.

We designed Link A Doodle as a simple, accountless solution because we know you don’t want to create an account just to share a link. Our platform provides complete transparency: all users can view analytics for every link, ensuring you feel safe and informed when clicking on a Link A Doodle link.

---

## ✨ Features

-   **Accountless Service:** No sign-up required to shorten, share, or track your links.
-   **Modern Animated UI:** Smooth transitions and animations powered by Framer Motion with a modern sleek React power user interface.
-   **Docker Containerization:** Easily deploy and run the application locally using Docker.

---

## 🚀 Features in Implementation

-   **Public Analytics:** View analytics for all links for full transparency.
-   **Dark Mode:** Toggle between light and dark themes for comfortable viewing.
-   **Responsive Design:** Optimized for desktop and mobile devices.

---

## 🛠️ Technologies Used

-   **Frontend:** React 19.0.0, Framer Motion 12.4.7, Axios 1.7.9
-   **Backend:** Express API 4.21.2
-   **Database:** MongoDB 6.14.0
-   **Styling:** CSS & CSS Modules
-   **Deployment:** Vercel
-   **Containerization:** Docker 27.5.1

---

## 📚 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14+ recommended)
-   [npm](https://www.npmjs.com/) (v10.9.2 recommended) or [Yarn](https://yarnpkg.com/)
-   (Optional) [Vercel CLI](https://vercel.com/docs/cli) for local deployment testing

### Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/ItaiHammer/link-a-doodle/link-a-doodle.git
    cd link-a-doodle
    ```

2. **Install Dependencies**

    Install dependencies in each folder:

    ```bash
    cd frontend && npm install
    cd ../api && npm install
    cd ..
    ```

---

## ⚙️ Running the Application

### Running Locally

1. #### Frontend

    From the `/frontend` directory:

    ```bash
    npm start
    ```

    This will start the React development server and open the application in your default web browser.

1. #### Backend

    From the `/api` directory

    ```bash
    npm run dev
    ```

    This will start the Express server with nodemon for automatic restarts on file changes.

### Running with Docker

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

On the backend, create a `.env` file in the `/api` folder:

```env
# api/.env
PORT=5000
MONGO_URI=your_mongo_uri_here
```

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

[Back to top](#top)
