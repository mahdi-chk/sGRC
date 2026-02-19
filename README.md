# GRC Platform - Governance, Risk, and Compliance

## Overview
The Governance, Risk, and Compliance (GRC) Platform is a comprehensive solution designed to help organizations manage their governance frameworks, risk assessments, and regulatory compliance requirements. It integrates an intelligent AI assistant to provide data-driven insights and automated workflows.

## 🚀 Key Features

### 🏢 Governance & Risk
- **Risk Management**: Identify, assess, and mitigate organizational risks.
- **Internal Controls**: Monitoring and implementation of internal control systems.
- **Incident Tracking**: Full lifecycle management of incidents and action plans.
- **Auditing Module**: Comprehensive audit trails and management of findings.

### 🤖 Intelligent AI Assistant
- **RAG Engine**: Advanced Retrieval-Augmented Generation capabilities to query internal documents and data.
- **Context-Aware Insights**: AI assistant integrated directly into the dashboard for real-time support.
- **Automated Analysis**: PDF and document processing for risk evaluation.

### 📩 Automation & Notifications
- **Email Service**: Automated notifications for critical alerts and updates via Nodemailer.
- **Interactive Dashboards**: Role-based dashboards (Admin, Top Management, etc.) with real-time analytics.

## 🛠 Tech Stack

- **Frontend**: Angular 12, SCSS, RxJS.
- **Backend**: Node.js, Express, TypeScript.
- **Database**: SQL Server (MSSQL) with Sequelize ORM.
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs encryption.
- **Integrations**: Nodemailer (Email), AI RAG Engine.

## 📁 Project Structure
The project is structured as a monorepo containing:
- **`backend/`**: Express API, AI logic, and database management.
- **`frontend/`**: Angular SPA with role-based access control.
- **`shared/`**: Common types and utilities.

## ⚙️ Getting Started

### Prerequisites
- Node.js (v14+)
- SQL Server instance
- Angular CLI

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mahdi-chk/sGRC.git
   cd grc-platform
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   # Configure your .env file
   npm start
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ng serve
   ```

## 📜 License
This project is licensed under the MIT License.

---
*Created and maintained by [mahdi-chk](https://github.com/mahdi-chk)*