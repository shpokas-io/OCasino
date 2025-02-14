# 🚀 Casino Wallet System - Frontend

This is a **casino-style wallet system app** that allows users to **register, log in, place bets, manage transactions, view their balance, and cancel bets**. It features a fully responsive UI, protected routes, and Redux state management.

- For this project, the mission was to create a fully functioning frontend with clean code, a solid folder structure, and as many features as possible.

---

## 📌 Features & Solutions

### **User Solutions**

- **User Authentication**: Register and login with JWT-based authentication.
- **Wallet System**: Display and update user balance dynamically.
- **Betting System**:
  - Place bets with different amounts and color choices.
  - Cancel bets if the rules allow it.
  - View all bets with filters by status and ID.
- **Betting Game**:
  - A spinning wheel game where users bet on colors.
  - Real-time animations with randomized outcomes.
- **Transaction History**:
  - Display transactions with pagination.
  - Filter transactions by type and ID.
- **Dashboard**:
  - Shows recent bets, transactions, and user balance.
  - Quick links to betting and transactions.
- **Idle Logout**: Users are automatically logged out after 10 minutes of inactivity.
- **Dark/Light Mode**: Toggleable theme preference with persistent state. (not fully implemented, need, need some fixing to fully work.)

### **Technical Solutions**

- **Protected Routes**: Restrict access to authenticated users using React Router and Redux.
- **State Management**:
  - Redux Toolkit for centralized state.
  - Separate slices for authentication, betting, and transactions.
- **Data Fetching & API Integration**:
  - Axios instance handling for API requests.
  - Asynchronous Redux actions for login, registration, betting, and transactions.
- **Form Validation**:
  - Yup schema validation for authentication forms.
  - Error handling
- **Pagination & Filtering**:
  - Backend-driven pagination for bets and transactions.
  - Filtering options for bet status and transaction types.
- **Spinning Wheel Logic**:
  - Uses CSS transformations for smooth spin animations.
  - Determines the winning color using randomized calculations.
- **User Balance Management**:
  - Updates in real-time after placing or canceling bets. (cancel logic implemented, but not fully)
  - Stored persistently in Redux and updated via API responses.
- **Global Error Handling**:
  - Extracts and standardizes API error messages.
  - Ensures predictable error responses across the application.

---

## 📦 Requirements

- **npm or yarn**
- **Mock API from https://github.com/shpokas-io/mock-api**

⚠️ **Important:** The mock API must be running for full functionality. Clone the repo above.

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone <repository-url>
cd frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Run the app

```bash
npm run dev
```

The app will be available at **`http://localhost:5173/`**.

---

## 🔧 Scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `npm run dev`     | Start the development server |
| `npm run build`   | Build for production         |
| `npm run lint`    | Lint the code                |
| `npm run preview` | Preview production build     |

---

## ⏳ WakaTime Report (Last 7 Days)

**Total Coding Time:** 9 hrs 12 mins

### 🛠 Language Breakdown:

| Language   | Time Spent | Percentage |
| ---------- | ---------- | ---------- |
| TypeScript | 8h 24m     | 91.41%     |
| Markdown   | 27m        | 4.97%      |
| JSON       | 9m         | 1.76%      |
| CSS        | 9m         | 1.63%      |
| JavaScript | 1m         | 0.22%      |
| HTML       | 0m         | 0.01%      |

### 🔥 Most Worked Files:

| File Path                        | Time Spent |
| -------------------------------- | ---------- |
| src/pages/BetsPage.tsx           | 1h 16m     |
| src/pages/DashboardPage.tsx      | 1h 2m      |
| src/App.tsx                      | 35m        |
| src/store/authSlice.ts           | 28m        |
| src/components/NavBar.tsx        | 27m        |
| src/main.tsx                     | 27m        |
| src/store/betSlice.ts            | 27m        |
| README.md                        | 27m        |
| src/components/navbar/NavBar.tsx | 22m        |
| src/util/errorUtils.ts           | 17m        |

### 🔀 Branch Usage:

| Branch Name | Time Spent |
| ----------- | ---------- |
| main        | 8h 52m     |
| master      | 19m        |

---

## 🔗 API Endpoints (Mock API)

| Endpoint           | Method   | Description                   |
| ------------------ | -------- | ----------------------------- |
| `/register`        | `POST`   | Register a new user           |
| `/login`           | `POST`   | Login and get JWT token       |
| `/bet`             | `POST`   | Place a bet                   |
| `/my-bets`         | `GET`    | Get user bets with filters    |
| `/my-bet/:id`      | `DELETE` | Cancel a bet                  |
| `/my-transactions` | `GET`    | Get transactions with filters |

---

## 🛠 Built With

- **React** (⚛️ 19)
- **TypeScript**
- **Redux Toolkit** (State Management)
- **React Router** (Routing)
- **Axios** (API Requests)
- **Yup** (Form Validation)
- **TailwindCSS** (Styling)
- **Vite** (Build Tool)

---

## ⚠️ Known Issues

- **ENV file missing**: Since this is a mockup project, environment variables are not used. In a real project, all links would be stored in an `.env` file.
- **Idle timer logic**: In a real project, the idle logout logic should be handled in the backend.
- **User menu UI issue**: Clicking on the user icon in desktop mode causes all items to shift unexpectedly.
- **Bet re-rendering issue**: When placing bets rapidly, all bets re-render instead of smoothly updating.
- **Bet cancellation logic**: The logic is implemented, but the cancellation button is not yet fully functional.
- **Pagination issue**: Pagination shows `1 of 0` pages; there should only be one page without an incorrect offset.
- **Empty state improvements**: Transaction and betting empty pages should display a CTA to start betting instead of a default error message.
- **Missing UI/UX for Footer**: Needs proper design and implementation.
- **Transaction card bug**: Type `BET` should display as `Lost`.
- **User balance formatting**: Should display a euro sign (€) instead of words.
- **Recent bets improvement**: Should include a CTA instead of a `no bets` message for better UX.
- **Dark/Light mode issue**: Implemented but not working correctly. The biggest issue is that it was not started from a React hook for dark mode, which would have made it much easier. A note for future projects.
- **Bets page re-rendering**: Once a user clicks spin, a re-render happens. Need a solution to fix this.
