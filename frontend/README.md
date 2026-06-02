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
   npm start
   ```
   Navigate to `http://localhost:4200/`.

## Runtime Configuration

The frontend reads its backend endpoints from `src/assets/runtime-config.js`.

- `window.__env.API_URL`: API base URL, for example `/api` or `https://api.example.com/api`
- `window.__env.SERVER_URL`: backend root URL, for example `https://api.example.com`

If no runtime value is provided, the frontend defaults to `/api`, which works with:

- a reverse proxy in test or production
- the Angular dev proxy configured in `proxy.conf.js`

For local development, you can override the proxy target with:

```bash
API_PROXY_TARGET=http://localhost:3000 npm start
```

## 📁 Key Directories

- `src/app/core`: Authentication, guards, and shared services.
- `src/app/dashboard`: Role-based components and dashboard layout.
- `src/app/risks`: Risk management specialized modules.
- `src/app/shared`: Common UI components (Modals, Tables).

## 📜 License
MIT License.
