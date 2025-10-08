# SafeSpace Application Overview

## Project Overview

SafeSpace is a web application designed to support mental health professionals and their clients. It provides a secure and centralized platform for managing client information, appointments, notes, and other critical data. The application is built with a focus on security, scalability, and ease of use, aiming to streamline the workflow of support workers, team leaders, and administrators.

## Technologies Used

*   **Frontend:**
    *   [Next.js](https://nextjs.org/): A React framework for building server-side rendered and static web applications.
    *   [React](https://reactjs.org/): A JavaScript library for building user interfaces.
    *   [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapid UI development.
    *   [Radix UI](https://www.radix-ui.com/): A collection of unstyled, accessible UI components.
*   **Backend:**
    *   [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction): For building the application's backend API.
    *   [PostgreSQL](https://www.postgresql.org/): A powerful, open-source object-relational database system.
    *   [pg](https://node-postgres.com/): A Node.js client for PostgreSQL.
*   **Authentication:**
    *   [Clerk](https://clerk.com/): A complete user management and authentication service.
*   **Deployment:**
    *   The application is set up to be deployed on a platform that supports Next.js, such as Vercel.

## Database Schema

The database schema is organized into several tables to manage different aspects of the application:

*   **`users`**: Stores user information, including their name, email, role, and Clerk ID.
*   **`roles`**: Defines the different user roles within the system (e.g., 'admin', 'team-leader', 'support-worker', 'patient').
*   **`clients`**: Contains client information, such as their name, status, risk level, and contact details.
*   **`appointments`**: Manages appointment scheduling, including the client, date, time, and type of session.
*   **`notes`**: Allows users to record notes about client sessions, including summaries, detailed notes, and risk assessments.
*   **`crisis_events`**: Logs crisis events, such as emergency calls, safety plan activations, and supervisor consultations.
*   **`referrals`**: Tracks client referrals, including the source, priority, and status of the referral.
*   **`system_metrics`**: Stores system-level metrics for monitoring and analysis.
*   **`audit_logs`**: Records user actions for auditing and security purposes.
*   **`mood_journal`**: A feature for clients to track their mood and journal their thoughts.
*   **`reports`**: Stores generated reports, such as caseload summaries and session reports.
*   **`safety_plans`**: Manages client safety plans, including warning signs, coping strategies, and emergency contacts.
*   **`system_alerts`**: Stores system-wide alerts and notifications.

## User Roles and Permissions

The application defines the following user roles:

*   **Admin:** Has full access to the system, including user management, system monitoring, and reporting.
*   **Team Leader:** Can manage a team of support workers, oversee client cases, and generate reports.
*   **Support Worker:** Works directly with clients, manages appointments, and records notes.
*   **Patient:** Can access their own information, use the mood journal, and view their safety plan.

## Key Features

*   **User Management:** Admins can create, edit, and manage users and their roles.
*   **Client Management:** Support workers can manage client information, track their progress, and maintain a record of their interactions.
*   **Appointment Scheduling:** Users can schedule and manage appointments with clients.
*   **Clinical Notes:** Support workers can create and manage detailed notes for each client session.
*   **Crisis Management:** The application provides tools for managing crisis events, including logging events and activating safety plans.
*   **Referral Tracking:** The system allows for the tracking of client referrals from intake to completion.
*   **Mood Journaling:** Clients can use the mood journal to track their emotional well-being.
*   **Reporting and Analytics:** The application provides reporting and analytics features to help users gain insights into their work.
*   **Safety Plans:** Users can create and manage safety plans for clients at risk.
*   **System Monitoring:** Admins can monitor system metrics and view audit logs.

## Authentication and Authorization

Authentication is handled by [Clerk](https://clerk.com/), which provides a secure and reliable way to manage user sign-up, sign-in, and session management. User roles and permissions are stored in the application's database and synchronized with Clerk's `public_metadata`. This allows the application to control access to different routes and features based on the user's role. The Next.js middleware is used to protect routes and ensure that only authorized users can access certain parts of the application.