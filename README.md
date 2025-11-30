# agendamento-consultorio-api

API REST em Spring Boot com autenticação JWT e controle de acesso por roles (ADMIN/USER).

## Key Features & Benefits

*   **Authentication and Authorization:** Secure API with JWT authentication and role-based access control (ADMIN/USER).
*   **RESTful API:** Well-defined REST endpoints for managing appointments and related data.
*   **Spring Boot:** Built on the Spring Boot framework for rapid development and easy deployment.
*   **Docker Support:** Containerized application for easy deployment and scalability using Docker.
*   **CEP Integration:** Possible integration with CEP services through the `CepController`.
*   **Admin User Seeder:** Seeds a default admin user using `AdminSeeder` for initial setup.

## Prerequisites & Dependencies

*   **Java Development Kit (JDK):** Version 21 or higher
*   **Maven:** Version 3.6 or higher
*   **Docker:** For containerized deployment (optional)
*   **IDE:** IntelliJ IDEA, Eclipse, or any preferred IDE
*   **Database:** Assumed to be configured and accessible (configuration details in application.properties or similar)

## Installation & Setup Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Edu-Victor/agendamento-consultorio-api.git
    cd agendamento-consultorio-api
    ```

2.  **Build the project using Maven:**

    ```bash
    ./mvnw clean install
    ```

3.  **Run the application:**

    *   **Option 1: Using Maven:**

        ```bash
        ./mvnw spring-boot:run
        ```

    *   **Option 2: Using the JAR file:**

        ```bash
        java -jar target/*.jar
        ```

4.  **Docker Setup (Optional):**

    1.  Build the Docker image:

        ```bash
        docker build -t agendamento-consultorio-api .
        ```

    2.  Run the Docker container:

        ```bash
        docker run -p 8080:8080 agendamento-consultorio-api
        ```

## Usage Examples & API Documentation (if applicable)

**API Endpoints** (Example, assuming server runs on `localhost:8080`):

*   **Authentication:**
    *   `POST /auth/login`: Authenticate user and obtain JWT token. Requires `username` and `password` in request body.
*   **User Management (ADMIN only):**
    *   `POST /pacientes`: Create a new patient (requires ADMIN role).
    *   `GET /pacientes/{id}`: Get patient details by ID (requires ADMIN/USER role, user can only access their own details).
*   **CEP Integration (if implemented):**
    *   `GET /cep/{cep}`: Retrieve address information based on CEP.

**Example Request (Login):**

```json
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password"
}
```

**Example Response (Login):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

**API Usage:** Include the `Authorization` header with the JWT token for protected endpoints:

```
Authorization: Bearer <JWT Token>
```

**Further API documentation (including request/response schemas) can be generated using tools like Swagger/OpenAPI.**

## Configuration Options

The application can be configured via:

*   **application.properties/application.yml:** Located in `src/main/resources`, this file contains database connection details, JWT secret key, port configuration, etc.  Modify these settings as needed for your environment.
*   **Environment Variables:** Application properties can be overridden using environment variables (e.g., `SPRING_DATASOURCE_URL`, `JWT_SECRET`).

**Example `application.properties`:**

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/consultorio
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update

jwt.secret=your_secret_key
server.port=8080
```

## Contributing Guidelines

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive commit messages.
4.  Test your changes thoroughly.
5.  Submit a pull request to the main branch.

## License Information

No license specified. All rights reserved.

## Acknowledgments (if relevant)

*   Spring Boot: For providing a robust and efficient framework.
*   Maven: For dependency management and build automation.
*   JWT: For secure authentication and authorization.
