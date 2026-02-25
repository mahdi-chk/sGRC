# GRC Platform - Governance, Risk, and Compliance

## Overview
The Governance, Risk, and Compliance (GRC) Platform is a powerful, centralized solution designed for sophisticated corporate governance, risk assessment, and regulatory adherence. Featuring a highly optimized AI-driven RAG engine and a robust notification system, it empowers organizations with real-time insights and automated GRC workflows.

## 🚀 Key Modules & Functionalities

### 🏢 Governance & Core Management
- **Audit Module**: End-to-end audit lifecycle management, from planning to findings and remediation.
- **Policy Management**: Centralized repository for governance frameworks and organizational policies.
- **Supervision**: High-level oversight tools for monitoring GRC health across the organization.

### 🛡️ Advanced Risk Management
- **Risk Assessment**: Tools for identifying, evaluating, and prioritizing business and operational risks.
- **Risk Assignment**: Dynamically assign risks to specific agents and track mitigation progress.
- **Collaborative Comments**: Contextual commenting system within risk profiles for team collaboration.
- **Internal Controls**: Monitoring and testing of control environments to ensure regulatory compliance.

### 🔔 Intelligent Notification System
- **Real-time Monitoring**: Backend scripts (`sync_notifs`, `check_notifs`) that monitor and process system alerts.
- **Multi-channel Alerts**: Automated email notifications via Nodemailer for critical GRC events.
- **User Inbox**: Dedicated frontend notification center for managing personal and role-based alerts.

### 🤖 AI Assistant (Enhanced RAG Engine)
- **Extreme Precision**: Highly optimized Retrieval-Augmented Generation (RAG) for querying complex internal PDF reports and unstructured documentation.
- **Real-time Performance**: Reduced latency in AI responses with improved indexing and retrieval algorithms.
- **Expert Sidekick**: Always-available AI assistant providing context-aware guidance directly on the dashboard.

### 📊 Role-Based Dashboards
Tailored experiences for specific organizational roles, ensuring security and relevance:
- **Super Admin**: Complete platform control and user management.
- **Top Management**: High-level strategic views and KPI tracking.
- **Admin SI**: Technical administration and system monitoring.
- **Risk Manager & Agent**: Specialized views for risk identification and mitigation.
- **Audit Senior & Auditeur**: Dedicated tools for field audits and reporting.

## 🛠 Technical Stack

### Frontend (Modern SPA)
- **Framework**: Angular 12
- **Styling**: SCSS (Shared design system), RxJS for reactive state management.
- **Architecture**: Modular structure with role-based routing and lazy loading.

### Backend (Robust API)
- **Engine**: Node.js & Express
- **Language**: TypeScript
- **ORM**: Sequelize for structured database interactions.
- **Database**: Microsoft SQL Server (MSSQL).
- **Security**: JWT-based authentication with bcryptjs encryption.

### Core Services
- **Notification Engine**: Integrated Nodemailer for email automation.
- **AI Integration**: Custom RAG engine for data-driven intelligence.

## 📁 Project Structure
```text
grc-platform/
├── backend/       # Express API, AI RAG logic, Notification workers
├── frontend/      # Angular SPA, Role-based components, Shared UI
└── shared/        # Shared TypeScript types and utility functions
```

## ⚙️ Quick Start

### Prerequisites
- Node.js (v14 or later)
- SQL Server Instance
- Angular CLI (`npm install -g @angular/cli@12`)

### Setup & Run
1. **Clone & Install**:
   ```bash
   git clone https://github.com/mahdi-chk/sGRC.git
   cd grc-platform
   npm install # Run in backend and frontend directories
   ```
2. **Launch Backend**:
   ```bash
   cd backend && npm start
   ```
3. **Launch Frontend**:
   ```bash
   cd frontend && ng serve
   ```

## 📜 License & Author
Licensed under the **MIT License**. Created and maintained by [mahdi-chk](https://github.com/mahdi-chk).