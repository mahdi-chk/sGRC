# GRC Platform Frontend

Premium Angular application for the Governance, Risk, and Compliance (GRC) solution.

## 🛠 Technical Stack

- **Framework**: Angular 12
- **State Management**: Reactive programming with RxJS
- **Styling**: SCSS (Advanced Design System)
- **Visuals**: Font Awesome, Custom Glassmorphism UI
- **Build Tool**: Angular CLI

## ✨ Key Features

### 🏢 Role-Based Dashboards
Tailored interfaces with specific KPIs and tools for:
- **Super Admin**: System governance.
- **Top Management**: Strategic reporting.
- **Risk Manager/Agent**: Operational risk tracking.
- **Auditeur/Senior Audit**: Field work and report generation.

### 🤖 AI Sidekick UI
- **Interactive Chat**: Directly accessible on the main dashboard.
- **RAG Manager**: Specialized components (`rag-config`, `rag-manager`) for real-time control of AI intelligence settings.
- **RAG Integration**: Real-time querying of corporate documentation.

### 🛡️ Security & Activity
- **Session Monitoring**: Automatic inactivity detection (10 min limit).
- **Auto-Logout**: Secure cleanup and redirection.
- **Token Refresh**: Background synchronization with the backend.

## ⚙️ Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Development Server**:
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`.

## 📁 Key Directories

- `src/app/core`: Authentication, guards, and shared services.
- `src/app/dashboard`: Role-based components and dashboard layout.
- `src/app/risks`: Risk management specialized modules.
- `src/app/shared`: Common UI components (Modals, Tables).

## 📜 License
MIT License.