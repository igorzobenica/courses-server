
# Course Finder Backend

This project is the backend for the Course Finder application, built with Express.js and Prisma. It provides RESTful APIs for managing courses and students.

## Features

- **Courses API** - Fetch and manage course data.
- **Students API** - Create and manage student records.
- **Filters API** - Fetch unique values for filtering courses.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```

2. Navigate to the backend directory:

    ```bash
    cd your-repo-name/server
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root of the backend directory with the following content:

    ```env
    PORT=3000
    DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
    ALLOWED_ORIGIN=http://localhost:5173
    ```

5. Run database migrations to set up the database:

    ```bash
    npx prisma migrate dev
    ```

6. Start the server:

    ```bash
    npm run dev
    ```

### API Endpoints

- **Courses**

    - `GET /api/courses` - Fetch courses with optional filters.
    - `GET /api/courses/:id` - Fetch a course by ID.

- **Students**

    - `POST /api/students` - Create a new student.

- **Filters**

    - `GET /api/locations` - Fetch unique locations.
    - `GET /api/categories` - Fetch unique categories.
    - `GET /api/deliveries` - Fetch unique delivery methods.

### Testing

Run tests with:

```bash
npm test
