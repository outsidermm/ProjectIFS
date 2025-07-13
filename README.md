## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# ProjectIFS — Data Journalism & Decision Support Platform

**ProjectIFS** is a data journalism website developed as part of a Year 12 Enterprise Computing major project. The platform presents exploratory research findings, visual storytelling, and an interactive decision support system (DSS) designed to assist Imagine Financial Services Ltd. (IFS) and its clients in navigating the loan eligibility process.

## 🌐 Overview

ProjectIFS combines data analysis, interactive visuals, and real-time predictive modelling to:

- Present compelling narratives derived from demographic and financial loan datasets.
- Allow users to interact with a DSS to assess preliminary loan eligibility.
- Help stakeholders visualise trends and inefficiencies within current approval pipelines.

The platform is built with Next.js and styled using Tailwind CSS, ensuring responsiveness and clarity across devices.

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

### 🔧 Build and Run for Production

To create an optimised production build and run the application locally:

```bash
npm run build
npm start
```

This compiles the project and serves it on [http://localhost:3000](http://localhost:3000).

Visit [http://localhost:3000](http://localhost:3000) to explore the website.

## 🧠 Features

- **Loan Eligibility Tool:** Interactive DSS built from machine learning models to predict approval outcomes.
- **Data Visualisation Pages:** Graphs and charts displaying approval rates, demographic insights, and financial distributions.
- **Responsive Interface:** Accessible across desktops, tablets, and mobile devices.
- **Ethical Data Handling:** Compliant with the Australian Privacy Act 1988.

## 🛠 Tech Stack

- **Frontend:** Next.js (App Router), Tailwind CSS
- **ML Integration:** KNIME workflow backend (models exported for prediction)
- **Data Processing:** Microsoft Excel and KNIME
- **Visualisation:** Power BI & custom React components
- **Deployment:** Localhost for development, Vercel (optional for deployment)

## 📂 Project Structure

- `app/` – Main application pages
- `components/` – Reusable UI elements
- `public/` – Static assets
- `README.md` – You are here

## 📊 Data Sources

- Aggregated and anonymised datasets (Kaggle, IFS records)
- Processed via Excel & KNIME for statistical modelling

## 🔐 Compliance

ProjectIFS follows ethical standards in data collection and usage. Sensitive data is anonymised and processed solely for educational and analytical purposes.

## 📈 Future Improvements

- Live model integration using a backend API
- Multilingual support
- Enhanced audit logging and analytics dashboard for IFS

## 📝 Author

Developed by James as part of the Enterprise Computing major project, 2025.

---

**Note:** This project is educational and not intended for commercial use.