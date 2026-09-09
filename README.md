# FinanceApp

A personal finance management application built to help users track their income, expenses, and transactions through a simple and responsive dashboard.

> **Status:** Active development

FinanceApp is an ongoing personal project focused on building a practical financial tracking application while improving my experience with modern React, Next.js, TypeScript, data visualization, and application architecture.

---

## Features

### 📊 Financial Dashboard

- Monthly income overview
- Monthly expense tracking
- Automatic net balance calculation
- Recent transaction overview
- Expense breakdown by category
- Interactive expense visualization
- Navigation between different months

### 💳 Transaction Management

- View all transactions
- Add new transactions
- Delete transactions
- Search transactions by merchant
- Filter transactions by category
- Filter transactions by month
- Sort transactions by date
- Responsive desktop and mobile layouts

### 📈 Expense Analysis

Transactions are automatically grouped by category to provide a clearer overview of spending habits.

The dashboard displays:

- Total spending by category
- Relative category spending
- Visual expense charts
- Monthly financial summaries

### 📥 Transaction Import

CSV transaction importing is currently being developed.

The application can currently:

- Select a CSV file
- Read the file directly in the browser
- Parse CSV rows
- Convert imported data into transaction objects

Support for a more complete bank transaction import workflow is planned.

---


## 🛠️ Tech Stack

### Frontend

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS**

### Data Visualization

- **Chart.js**
- **react-chartjs-2**

### Development

- ESLint
- npm
- Git / GitHub

---

## 🏗️ Current Architecture

FinanceApp currently uses client-side transaction storage.

Transactions are stored in the browser using `localStorage`, allowing the application to persist financial data between sessions without requiring a backend.

The project currently separates application responsibilities into areas such as:

```text
FinanceApp/
├── app/
│   ├── (app)/
│   │   ├── dashboard/
│   │   ├── import/
│   │   └── transactions/
│   ├── globals.css
│   └── layout.tsx
│
├── components/
├── data/
├── lib/
├── public/
├── types/
│
├── package.json
└── README.md
```

The architecture will continue evolving as the project grows.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/matheo-lacerte/FinanceApp.git
```

Navigate into the project:

```bash
cd FinanceApp
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 🗺️ Roadmap

FinanceApp is still actively being developed.

Some areas planned for future development include:

- [ ] Improve CSV transaction importing
- [ ] AI Integration for easier importation
- [ ] Automatic transaction categorization
- [ ] Improved financial analytics
- [ ] Budget management
- [ ] Savings goals
- [ ] Additional charts and statistics
- [ ] Improved transaction editing
- [ ] Better validation and error handling
- [ ] Persistent database storage
- [ ] User authentication
- [ ] Deployment
- [ ] Additional responsive/mobile improvements

The roadmap may change as the project evolves.

---

## 🎯 Project Goals

This project was created both as a practical personal finance tool and as an opportunity to improve my software development skills.

The main technical goals are to gain more experience with:

- TypeScript
- React and Next.js
- Application architecture
- State and data management
- Data visualization
- Responsive interface design
- File parsing and data importing
- Building and maintaining a complete application over time

---

## 👨‍💻 Author

**Mathéo Lacerte**

Software Development student at Collège Montmorency.

Interested in software development, desktop applications, automation, backend development, data, and software engineering.

GitHub: [matheo-lacerte](https://github.com/matheo-lacerte)

---

## 📌 Project Status

This project is **currently under active development**.

Features, architecture, and interface design may change as new functionality is implemented.
