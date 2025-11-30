# agendamento-consultorio-web

Frontend em React + Vite + Tailwind consumindo a API com login JWT e sidebar por roles.

## Key Features & Benefits

*   **Authentication and Authorization:** Secure frontend with JWT authentication, interacting with a backend API.
*   **Role-Based Access Control:** Sidebar and content dynamically adjust based on user roles (e.g., ADMIN, USER).
*   **Modern Technologies:** Built with React, Vite, and Tailwind CSS for a fast and responsive user experience.
*   **Modular Architecture:** Well-structured codebase for maintainability and scalability.

## Prerequisites & Dependencies

Before you begin, ensure you have the following installed:

*   **Node.js:** (Version >= 18.x) - [Download Node.js](https://nodejs.org/)
*   **npm:** (Usually comes with Node.js) or **yarn:** (Install via `npm install -g yarn`)
*   **A code editor:** (e.g., VS Code, Sublime Text)

## Installation & Setup Instructions

Follow these steps to get the project running locally:

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Edu-Victor/agendamento-consultorio-web.git
    cd agendamento-consultorio-web
    ```

2.  **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Or using yarn:

    ```bash
    yarn install
    ```

3.  **Configure Environment Variables:**

    Create a `.env` file in the root of the project (if not already present) and configure the following variables according to your setup:

    ```
    VITE_API_BASE_URL=http://localhost:8080/api
    ```

    Replace `http://localhost:8080/api` with the actual URL of your backend API.

4.  **Start the development server:**

    Using npm:

    ```bash
    npm run dev
    ```

    Or using yarn:

    ```bash
    yarn dev
    ```

    This will start the development server, and the application will be accessible in your browser (usually at `http://localhost:5173`).

## Usage Examples & API Documentation

This frontend interacts with a backend API.  You'll need to have the backend API running for full functionality.

The following examples illustrate common API interactions:

*   **Login:**

    The `AuthContext.jsx` handles user authentication using JWT. The `jwt.js` file likely contains functions for handling JWT tokens (storage, retrieval).

*   **Role-Based Navigation:**

    The `RequireAuth.jsx` component is used to protect routes based on user roles.  It verifies if the user has the necessary role to access a specific route.

*   **API Calls:**

    The `api/http.js` file likely contains an Axios instance pre-configured to interact with the API, handling base URLs and potentially including JWT tokens in headers.  For example:

    ```javascript
    // api/http.js
    import axios from 'axios';

    const http = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    // Add authorization header if token exists
    http.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });

    export default http;
    ```

    ```javascript
    // Example usage in a component:
    import http from './api/http';

    const fetchData = async () => {
      try {
        const response = await http.get('/data');
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    ```

## Configuration Options

*   **VITE_API_BASE_URL:**  Defines the base URL for the backend API. This is set in the `.env` file.

## Contributing Guidelines

We welcome contributions! Here's how you can contribute to this project:

1.  **Fork the repository.**
2.  **Create a new branch for your feature or bug fix:**  `git checkout -b feature/your-feature-name`
3.  **Make your changes and commit them:** `git commit -m "Add: Your descriptive commit message"`
4.  **Push to the branch:** `git push origin feature/your-feature-name`
5.  **Submit a pull request.**

Please ensure your code adheres to the project's coding standards.

## License Information

This project is open-source, but the license is currently unspecified. Please contact the repository owner for licensing details.

## Acknowledgments

*   This project uses the following open-source libraries:
    *   React
    *   Vite
    *   Tailwind CSS
    *   Axios
