# 🚀 Casino Wallet System - Frontend

This is a **casino-style wallet system app** that allows users to **register, log in, place bets, manage transactions, view their balance, and cancel bets**. It features a fully responsive UI, protected routes, and Redux state management.

- For this project, the mission was to create a fully functioning frontend with clean code, a solid folder structure, and as many features as possible.

---

## 📌 Features

- **User Authentication**: Register, login, and JWT-based authentication.
- **Wallet System**: Display and update balance across the app.
- **Betting System**: Users can place bets, filter them, and cancel them if allowed.
- **Betting Game**: A spinning wheel game where users bet on colors.
- **Transaction History**: List of transactions with filters.
- **Dashboard**: Overview of user balance, recent bets, and transactions.
- **Protected Routes**: Only authenticated users can access certain pages.
- **Idle Logout**: Automatic logout after inactivity.
- **Form Validations**: Validates user inputs before submission.
- **Spinning animations**: Once user clicks SPIN, there is spinning animation.

---

## 📦 Requirements

- **Node.js >= 14.x**
- **npm or yarn**
- **Mock API from https://github.com/shpokas-io/mock-api**

⚠️ **Important:** The mock API must be running for full functionality. Clone repo above.

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

## 📂 Project Structure FIX THIS BEFORE COMMITING

```
frontend
│── src/
│   ├── api/               # API calls (auth, bets, transactions)
│   ├── components/        # Reusable UI components
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Page layouts
│   ├── pages/             # Main pages (Dashboard, Login, Register, etc.)
│   ├── store/             # Redux state management
│   ├── styles/            # TailwindCSS styles
│   ├── utils/             # Utility functions
│── public/                # Static assets
│── package.json           # Dependencies & scripts
│── vite.config.ts         # Vite configuration
```

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

- ENV file missing: Since this is a mockup project, environment variables are not used. In a real project, all links would be stored in an .env file.

- Idle timer logic: In a real project, the idle logout logic should be handled in the backend.

- User menu UI issue: Clicking on the user icon in desktop mode causes all items to shift unexpectedly.

- Bet re-rendering issue: When placing bets rapidly, all bets re-render instead of smoothly updating.

- Bet cancellation logic: The logic is implemented, but the cancellation button is not yet fully functional.

- Pagination showing 1 of 0 pages result, there should be only page without off

- Transaction and Betting empty pages should display CTA to start betting instead of default error message.

- Missing proper UI/UX for Footer

- In Transactions card there is a bug -> type: BET it should be Lost

- User balance should display euro sign instead if words

- Recent bets should have CTA as well instead of not bets message for better UX
