# SafeSpace Application Roadmap

This document outlines the planned features and improvements for the SafeSpace application, categorized by user roles and feature sets.

## Admin Dashboard Enhancements

### UI/UX Improvements

*   **Modal Background:** The background of modal dialogs should be a blur effect instead of a solid black color to improve the user experience.

### Referral Management

*   **Referral Page Update:** The referral page needs to be updated to match the client registration process of CMHA.
*   **Referral Submission:** The "Accept" button on the referral tab should be changed to "Submit to Team Leader" to better reflect the workflow.
*   **Referral Form Updates:**
    *   Separate the `First Name` and `Last Name` fields for clients.
    *   Add separate fields for `Emergency Contact First Name`, `Emergency Contact Last Name`, and `Emergency Contact Phone Number`.
    *   Include a `Consent Statement` in the referral form.
    *   Remove the `Priority Level` field from the admin referral form.
*   **Referral List:** Implement a new page or component to display a list of all referrals.

### Reporting

*   **Downloadable Reports:** Add functionality to download reports in various formats (e.g., PDF, CSV).

## Team Leader Dashboard Enhancements

### Case Notes

*   **Activity-Based Notes:** Revert the case notes feature to the original design, which includes a section for activities.
*   **Risk Assessment:** Ensure the `Risk Assessment` field remains a part of the case notes.

### Client Management

*   **Client Selection:** Improve the client selection process, possibly by making them available in a dropdown or a searchable list.
*   **Advanced Search and Filters:** Implement advanced filtering and search capabilities to allow team leaders to easily find and manage clients.

## Reporting Features

### Utilization Reports

*   Track the number of referrals, active clients, and closures.

### Case Notes Reports

*   Count the number of activities and the total duration of time spent on each client.

### Functional Reports

*   Provide a day-to-day overview based on the content of case notes.
*   Include a preview of case notes.
*   Track the number of client interactions.
*   Count the number of case notes submitted on a given day.

### Team Leader Reports

*   Provide insights into the performance of subordinates.
*   Track the number of case notes submitted by each team member.
