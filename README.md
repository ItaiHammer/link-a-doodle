![Link A Doodle Logo](frontend/src/icons/logo.svg 'Link A Doodle Logo')

A sleek, modern URL shortener that makes sharing links simple.

Built with React, Framer Motion, Express API, MongoDB, and Docker, Link A Doodle features a clean interface that makes sharing and tracking links effortless and accountless.

We designed Link A Doodle as a simple, accountless solution because we know you don’t want to create an account just to share a link. Our platform provides complete transparency: all users can view analytics for every link, ensuring you feel safe and informed when clicking on a Link A Doodle link.

---

## Features

-   **Accountless Service:** No sign-up required to shorten, share, or track your links.
-   **Modern Animated UI:** Smooth transitions and animations powered by Framer Motion with a modern sleek React power user interface.
-   **Docker Containerization:** Easily deploy and run the application locally using Docker.

---

## Features in Implementation

-   **Public Analytics:** View analytics for all links for full transparency.
-   **Dark Mode:** Toggle between light and dark themes for comfortable viewing.
-   **Responsive Design:** Optimized for desktop and mobile devices.

---

## Technologies Used

-   **Frontend:** React, Framer Motion, Axios
-   **Backend:** Express API
-   **Database:** MongoDB
-   **Styling:** CSS & CSS Modules
-   **Deployment:** Vercel
-   **Containerization:** Docker

---

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v14+ recommended)
-   [npm](https://www.npmjs.com/) (v6+ recommended) or [Yarn](https://yarnpkg.com/)
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

## Running the Application

### Running Locally

#### Frontend

From the `/frontend` directory:

```bash
npm start
```

#### Backend

From the `/api` directory

```bash
npm run dev
```

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

## Environment Variables

On the backend, create a `.env` file in the `/api` folder:

```env
# api/.env
PORT=3001
MONGO_URI=your_mongo_uri_here
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

---

## License

This project is licensed under the [MIT License](LICENSE).
