# GRC Platform Backend

Advanced API servicing the Governance, Risk, and Compliance (GRC) platform.

## 🛠 Technical Stack

- **Runtime**: Node.js (v14+)
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Sequelize
- **Database**: Microsoft SQL Server (MSSQL)
- **AI/ML**: 
  - **RAG Engine**: Built with LangChain/Ollama (Retrieval-Augmented Generation)
  - **OCR**: Integrated Tesseract with `fra.traineddata` for complex document scanning.
- **Security**: JWT (jsonwebtoken) & bcryptjs

## 🚀 Specialized Features

### 🤖 Intelligent AI Sidekick
- **Document Processing**: Automatic parsing and vectorization of PDF reports.
- **Contextual RAG & Dynamic Config**: High-precision retrieval with dynamic tuning of context and generation parameters.
- **OCR Integration**: Able to process image-based documents and historical scans.

### 🛡️ Secure Session Management
- **Token Refresh**: Automatic JWT rotation logic.
- **Inactivity Monitoring**: Backend support for identifying and expiring idle sessions.

## ⚙️ Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Environment Configuration**:
   Create a `.env` file based on `.env.example`.
3. **Run Platform**:
   ```bash
   npm start
   ```

## 📁 Project Structure

- `src/modules/ai`: RAG engine, OCR logic, and AI services.
- `src/modules/auth`: Authentication and session monitoring.
- `src/modules/risk`: Risk assessment API logic.
- `src/modules/auditing`: Audit lifecycle management.
- `src/database.ts`: Sequelize & MSSQL configuration.

## 📜 License
MIT License.