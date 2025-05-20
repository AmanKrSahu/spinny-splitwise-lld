# **Expense Tracker API** 🚀

This **RESTful API** provides a robust solution for tracking shared expenses among friends, roommates, or group members. Built with **Node.js, Express, and MongoDB**, it simplifies financial management in group settings by:  

- 📊 **Automatically calculating** who owes whom  
- 👥 **Supporting multiple groups** with different members  
- 💸 **Tracking detailed expense records** with splits  
- 🔄 **Maintaining complete transaction history**  

Ideal for travel buddies, shared households, or any group that needs to manage shared finances transparently.  

---

## ✨ **Features**  
- ✅ **User Management** – Create and manage users  
- ✅ **Group Management** – Create groups and add members  
- ✅ **Expense Tracking** – Record expenses and splits  
- ✅ **Balance Calculation** – Automatically calculates who owes whom  
- ✅ **MongoDB Backend** – Persistent and scalable data storage  

---

## 💻 **Tech Stack**  
- **Backend**: Node.js, Express  
- **Database**: MongoDB (with Mongoose ODM) 
- **API Testing**: Postman 

---

## ⚙️ **Setup & Installation**  

### **1. Prerequisites**  
- Node.js (v20+)  
- MongoDB (local or cloud URI)  
- Postman (for API testing)  

### **2. Clone the Repository**  
```sh
git clone https://github.com/your-repo/expense-tracker.git
cd expense-tracker
```

### **3. Install Dependencies**  
```sh
npm install
```

### **4. Configure Environment Variables**  
Create a `.env` file in the root directory:  
```env
MONGODB_URI=mongodb://localhost:27017/expense-tracker
PORT=3000
```

### **5. Run the Server**  
- **Development Mode (with hot reload)**:  
  ```sh
  npm run dev
  ```
- **Production Mode**:  
  ```sh
  npm start
  ```

---

## 🗃️ **Database Schema**  

### **1. User Model**  
```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
}
```

### **2. Group Model**  
```javascript
{
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}
```

### **3. GroupMember Model**  
```javascript
{
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
}
```

### **4. Expense Model**  
```javascript
{
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  createdAt: { type: Date, default: Date.now }
}
```

### **5. UserExpense Model**  
```javascript
{
  expense: { type: mongoose.Schema.Types.ObjectId, ref: 'Expense', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amountOwed: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
}
```

---

## 📡 **API Endpoints**  

### **1. User Routes**  
| **Endpoint** | **Method** | **Description** | **Request Body** |
|-------------|-----------|----------------|------------------|
| `/users` | `POST` | Create a new user | `{ "name": "John", "email": "john@example.com" }` |
| `/users/:id/balance` | `GET` | Get user's balance | - |

### **2. Group Routes**  
| **Endpoint** | **Method** | **Description** | **Request Body** |
|-------------|-----------|----------------|------------------|
| `/groups` | `POST` | Create a new group | `{ "name": "Friends Trip" }` |
| `/groups/:id/members` | `POST` | Add a member to a group | `{ "user_id": "user_id_here" }` |

### **3. Expense Routes**  
| **Endpoint** | **Method** | **Description** | **Request Body** |
|-------------|-----------|----------------|------------------|
| `/expenses` | `POST` | Add a new expense | `{ "description": "Dinner", "amount": 1000, "paid_by": "user_id", "group_id": "group_id", "splits": [ { "user_id": "user1", "amount": 500 }, { "user_id": "user2", "amount": 500 } ] }` |
| `/expenses/group/:id` | `GET` | Get all expenses of a group | - |

---

## 🧪 **Testing the API**  

### **Using Postman**  
1. **Test the following flow**:  
   - **Create 2-3 users**  
   - **Create a group**  
   - **Add members to the group**  
   - **Add expenses**  
   - **Check balances**  

### **Sample Request & Response**  

#### **1. Create a User**  
- **Request (POST `/users`)**  
```json
{
  "name": "Alice",
  "email": "alice@example.com"
}
```
- **Response (201 Created)**  
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "name": "Alice",
  "email": "alice@example.com",
  "createdAt": "2023-06-25T12:34:56.789Z"
}
```

#### **2. Get User Balance**  
- **Request (GET `/users/:id/balance`)**  
- **Response (200 OK)**  
```json
{
  "user_id": "60d21b4667d0d8992e610c85",
  "owes": {
    "60d21b4667d0d8992e610c86": 500
  }
}
```