# **Backend for Taste Treasury** 🍴🔧  

This is the backend server for **Taste Treasury**, the restaurant management platform. It is built using **Node.js**, **Express**, and **MongoDB**, providing a robust API for managing restaurant operations such as menus, orders, and user authentication.

🔗 **Live API Endpoint:**  
- [Taste Treasury Backend (Vercel)](https://assignment-11-server-six-zeta.vercel.app/)  
- [Taste Treasury Frontend (netlify)](https://taste-treasury.netlify.app/)  

---

### **🚀 Overview**  

The Taste Treasury backend powers the essential functionalities of the platform, enabling efficient restaurant management. It connects to a **MongoDB** database and provides secure, scalable API endpoints for handling menus, orders, and user data.  

---

### **🔑 Key Features**  

- **MongoDB Integration**  
  Leverages **MongoDB Atlas** for storing and managing menu items, orders, and user information.  

- **Express RESTful API**  
  Provides structured routes to handle **GET**, **POST**, **PUT**, and **DELETE** operations for efficient data manipulation.  

- **JWT Authentication**  
  Implements **JSON Web Tokens (JWT)** for secure user authentication and role-based access control.  

- **Cookie Parsing**  
  Ensures secure session management using **cookie-parser** middleware.  

- **Dynamic Menu Management**  
  Allows admins to add, update, or delete menu items dynamically.  

- **Order Handling**  
  API endpoints for creating, updating, and tracking customer orders.  

- **Cross-Origin Resource Sharing (CORS)**  
  Supports secure and flexible API interactions from different origins.  

---

### **🔨 Tech Stack**  

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB (MongoDB Atlas)  
- **Authentication**: JWT, Cookie Parsing  
- **Environment Variables**: `dotenv`  
- **CORS**: For enabling cross-origin resource sharing  

---

### **📜 API Routes**  

#### **1. GET /menus**  
Fetches all menu items.  

- **Response**: Array of menu items  

#### **2. POST /menus**  
Adds a new menu item (Admin only).  

- **Request Body**: JSON object with menu details  
- **Response**: Insert result object  

#### **3. PUT /menus/:id**  
Updates details of a menu item by its ID (Admin only).  

- **Request Body**: JSON object with updated menu details  
- **Response**: Update result object  

#### **4. DELETE /menus/:id**  
Deletes a menu item by its ID (Admin only).  

- **Response**: Delete result object  

#### **5. POST /orders**  
Creates a new order.  

- **Request Body**: JSON object with order details  
- **Response**: Order confirmation  

#### **6. GET /orders**  
Fetches all orders (Admin only).  

- **Response**: Array of orders  

#### **7. POST /auth/login**  
Authenticates a user and returns a JWT.  

- **Request Body**: JSON object with email and password  
- **Response**: JWT token  

#### **8. POST /auth/register**  
Registers a new user.  

- **Request Body**: JSON object with user details  
- **Response**: Registration confirmation  

---

### **💡 Getting Started**  

1. Clone the repository:  

    ```bash
    git clone https://github.com/Abubokkor98/taste-treasury-server.git
    ```  

2. Install dependencies:  

    ```bash
    cd taste-treasury-backend  
    npm install  
    ```  

3. Create a `.env` file in the root directory and add the following:  

    ```plaintext
    DB_USER=your_mongo_user  
    DB_PASS=your_mongo_password  
    JWT_SECRET=your_jwt_secret  
    PORT=5000  
    ```  

4. Run the server:  

    ```bash
    npm start  
    ```  

The server will run on `http://localhost:5000` by default.  

---

### **🛠️ Project Structure**  

taste-treasury-backend/  
│  
├── .env                    # Environment variables (e.g., DB credentials)  
├── node_modules/           # Dependencies installed via npm  
├── public/                 # Public files (if any)  
├── src/                    # Backend source code  
│   ├── controllers/        # Contains the controllers for the routes  
│   │   └── menuController.js  # Controller for menu-related routes  
│   ├── models/             # MongoDB models (optional if using Mongoose)  
│   │   └── menuModel.js       # Menu schema if using Mongoose  
│   ├── routes/             # API route definitions  
│   │   └── menuRoutes.js     # Menu-related routes  
│   ├── utils/              # Utility files (e.g., error handling, middleware)  
│   │   └── errorHandler.js      # Global error handling  
│   ├── config/             # Database and server configuration  
│   │   └── db.js            # MongoDB connection  
│   ├── server.js           # Main server file (entry point)  
├── package.json            # Project metadata and dependencies  
├── package-lock.json       # Locks the versions of installed packages  
├── README.md               # Project documentation  
└── .gitignore              # Git ignore file (to exclude node_modules, etc.)  

---

### **📈 Roadmap and Future Features**  

- **Real-Time Notifications**  
  Notify admins about new orders instantly.  

- **AI Recommendations**  
  Suggest menu items to customers based on order history.  

- **Payment Integration**  
  Add support for payment gateways like Stripe or PayPal.  

---

### **👥 Contribution**  

Feel free to fork the repository, report issues, and submit pull requests to improve the project.  

---

### **🙋‍♂️ About the Developer**  

Built with 💻 and passion by **Abu Bokkor Siddik**.  

- **GitHub**: [Abubokkor98](https://github.com/Abubokkor98)  
- **LinkedIn**: [LinkedIn](https://www.linkedin.com/in/abubokkor)  

---

### **🚀 Why Taste Treasury Backend?**  

- **⚡ Efficient and Scalable**  
  Handles growing customer and menu demands seamlessly.  

- **🔒 Secure Operations**  
  Utilizes JWT and cookie parsing for robust authentication.  

- **📈 Optimized for Growth**  
  Designed with scalability and future enhancements in mind.  
