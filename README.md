# 💡 Smart Bill Management System

A **MERN Stack-based web application** that allows users to **view, manage, and pay monthly utility bills** (Electricity, Gas, Water, Internet, etc.).  
Users can **securely log in**, **pay only current-month bills**, and **manage their payment history** with options to **update, delete, and download PDF reports**.  
The application ensures a seamless, responsive, and user-friendly experience for all devices.

---

## 🌐 Live Demo & Repositories

- 🔗 **Live Site:** [👉 https://smart-bills-manager.web.app/](https://smart-bills-manager.web.app/)
- 💻 **Client Repo:** [👉 https://github.com/mdfardinislamselim/smart-bills-client](https://github.com/mdfardinislamselim/smart-bills-client)
- ⚙️ **Server Repo:** [👉 https://github.com/mdfardinislamselim/smart-bills-server](https://github.com/mdfardinislamselim/smart-bills-server)

---

## 🎯 Key Features

- 🔐 **User Authentication:** Register & Login via Email/Password and Google (Firebase).
- 💰 **Bill Payment System:** Pay only current-month bills, with auto-filled Pay Bill form.
- 📄 **PDF Report Generation:** Download paid bill reports (jsPDF + AutoTable).
- ⚙️ **CRUD Operations:** Update/Delete paid bills dynamically with modals.
- 🌗 **Dark/Light Theme Toggle** for better accessibility and user control.
- 🧭 **Dynamic Routing & Private Routes** (React Router).
- 📊 **Total Paid Summary:** Displays total bills paid and total amount.
- 📱 **Fully Responsive UI** for mobile, tablet, and desktop.
- 🔔 **Toast & SweetAlert Notifications** for all user actions.

---

## 🖼️ Layout Overview

### 🧩 Navbar
**Before Login:** Home | Bills | Login | Register  
**After Login:** Home | Bills | My Pay Bills | Profile Avatar | Logout  

### 🏠 Home Page
- Image **Carousel Slider** (3+ slides)
- **Category Section**: Electricity, Gas, Water, Internet
- **Recent Bills**: Display 6 latest bills from MongoDB
- **How It Works**: Manage all your utility bills in just a few simple steps.
- **What Our Users Say**: Thousands of users trust us to simplify their monthly bill payments.

### 💵 Bills Page (Public)
- Displays all bills in **3-column grid layout**
- **Category Filter Dropdown**


### 📋 Bill Details Page (Private)
- Displays full bill info
- **Pay Bill Button** enabled only if bill date is in the current month
- Pay Bill Modal with pre-filled data (Email, Bill ID, Amount, Date)

### 🧾 My Pay Bills Page (Private)
- Logged-in user’s paid bills in table view
- **Update/Delete** options (modal-based)
- **PDF Report Download**
- Displays **Total Bills Paid** & **Total Amount Paid**


---

## 🛠️ Tech Stack

**Frontend (Client):**
- React (Vite)
- React Router
- Firebase Authentication
- Axios (with interceptors)
- Tailwind CSS / DaisyUI
- jsPDF + jsPDF-AutoTable
- React Toastify / SweetAlert2
- Framer Motion / Lottie React (animations)

**Backend (Server):**
- Node.js + Express.js
- MongoDB
- dotenv, cors, bcrypt


## 📦 Project Dependencies

### Client

```json
"dependencies": {
  "axios": "^1.6.0",
  "firebase": "^11.0.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.14.1",
  "react-toastify": "^9.2.2",
  "sweetalert2": "^11.8.2",
  "lottie-react": "^2.3.1",
  "jspdf": "^2.5.1",
  "jspdf-autotable": "^3.5.25"
},
"devDependencies": {
  "vite": "^5.0.0",
  "tailwindcss": "^3.3.2",
  "daisyui": "^3.2.2"
}
```

### Server

```json
"dependencies": {
  "express": "^4.18.2",
  "mongodb": "^6.10.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "bcrypt": "^5.1.0",
  "firebase-admin": "^12.10.0"
}
```

---

## 🚀 Local Setup Guide

### 1️⃣ Clone the Repositories

```bash
# Client
git clone https://github.com/mdfardinislamselim/smart-bills-client.git

# Server
git clone https://github.com/mdfardinislamselim/smart-bills-server.git
```

### 2️⃣ Install Dependencies

```bash
# Client
cd smart-bills-client
npm install

# Server
cd smart-bills-server
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file in the **server** folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
FIREBASE_SERVICE_KEY=your_base64_encoded_firebase_service_key
```

Create a `.env` file in the **client** folder (if needed):

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4️⃣ Run the Application

```bash
# Server
cd smart-bills-server
npm run dev  # or "node index.js"

# Client
cd smart-bills-client
npm run dev
```
