![Link A Doodle Logo](frontend/src/icons/logo.svg 'Link A Doodle Logo')

A sleek, modern URL shortener that makes sharing links simple.

Built with React, Framer Motion, and an Express API, Link A Doodle features a clean interface that makes sharing and tracking links effortless and accountless.

We also believe that services shouldn’t try to be more than they need to be. That’s why we intentionally designed Link A Doodle as a simple, accountless solution—because we know you don’t want to create an account just to share a link. In keeping with this minimalistic philosophy, our platform provides complete transparency: all users can view analytics for every link, ensuring you feel safe and informed when clicking on a Link A Doodle link.

---

## Features

-   **Accountless Service:** No sign-up required to shorten, share, or track your links.
-   **Modern Animated UI:** Smooth transitions and animations powered by Framer Motion with a modern sleek React power user interface.

---

## Features in Implementation

-   **Public Analytics:** View analytics for all links for full transparency.
-   **Dark Mode:** Toggle between light and dark themes for comfortable viewing.
-   **Responsive Design:** Optimized for desktop and mobile devices.

---

## Technologies Used

-   **Frontend:** React, Framer Motion, Axios
-   **Backend:** Express API
-   **Styling:** CSS & CSS Modules
-   **Deployment:** Vercel

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
    npm install
    cd frontend && npm install
    cd ../backend && npm install
    cd ..
    ```

---

## Running Locally

### Frontend

From the `/frontend` directory:

```bash
npm start
```

### Backend

From the `/backend` directory

```bash
npm run dev
```

### Both

In the root (`/`) directory of the project

```bash
npm run dev
```

---

## Environment Variables

On the backend, create a `.env` file in the `/backend` folder:

```env
# backend/.env
PORT=3001
```

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

---

## License

This project is licensed under the [MIT License](LICENSE).
