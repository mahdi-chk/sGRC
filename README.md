# GRC Platform

## Overview
The Governance, Risk, and Compliance (GRC) Platform is a comprehensive solution designed to help organizations manage their governance, risk management, internal controls, regulatory compliance, auditing, incident management, action plans, reporting, and supervision processes effectively.

## Project Structure
The project is divided into three main parts:
- **Frontend**: An Angular application that provides a user interface for interacting with the GRC solution.
- **Backend**: A Node.js application that handles business logic, data processing, and API endpoints.
- **Shared**: A library containing shared utilities and types used across both frontend and backend.

## Features
- **Governance Module**: Manage governance frameworks and policies.
- **Risk Management Module**: Identify, assess, and mitigate risks.
- **Internal Controls Module**: Implement and monitor internal controls.
- **Regulatory Compliance Module**: Ensure compliance with relevant regulations.
- **Auditing Module**: Conduct audits and manage audit findings.
- **Incident Management Module**: Track and manage incidents.
- **Action Plans Module**: Create and monitor action plans for remediation.
- **Reporting Module**: Generate reports for various GRC activities.
- **Supervision Module**: Oversee and manage GRC processes.

## Functional Requirements
Refer to the `docs/functional-requirements.md` file for detailed functional requirements of the GRC solution.

## Security Specifications
Refer to the `docs/security-specifications.md` file for detailed security specifications of the GRC solution.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- Angular CLI (version 12 or higher)
- Docker (for containerization)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd grc-platform
   ```

2. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

3. Install backend dependencies:
   ```
   cd ../backend
   npm install
   ```

4. Install shared library dependencies:
   ```
   cd ../shared
   npm install
   ```

### Running the Application
- To run the frontend:
  ```
  cd frontend
  ng serve
  ```

- To run the backend:
  ```
  cd backend
  npm start
  ```

### Docker Setup
To run the application using Docker, navigate to the `infra` directory and use the following command:
```
docker-compose up
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.