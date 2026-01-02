# ⚙️ StyleMart - E-commerce Backend API (v2)

This is the official server-side implementation of **StyleMart**, a scalable single-vendor e-commerce platform. It provides a secure and high-performance API architecture to manage products, orders, users, and administrative dashboard analytics.

## 🚀 Live API Server
**Base URL:** `https://stylemart-server-v2.vercel.app`

---

## 🛠️ Architecture & Tech Stack

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** MongoDB
- **File Management:** **Multer** (Middleware) + **Cloudinary** (Cloud Storage)
- **Authentication:** Firebase Admin SDK
- **Architecture:** Modular Pattern (Routes, Controllers, Modules)



---

## ✨ Core Backend Features

### 🖼️ Efficient Image Handling
Integrated **Multer** and **Cloudinary** to handle product image uploads.
- **Process:** Client sends multipart/form-data -> Multer parses the image -> Uploaded directly to Cloudinary -> URL saved in MongoDB.

### 🛡️ Modular API Design
The server is structured into specific modules for better maintainability:
- **Users:** Authentication and profile management.
- **Products:** Advanced CRUD with variation and inventory logic.
- **Orders:** Transaction tracking and status management (Pending, Verified, etc.).
- **Reviews:** Customer feedback and rating system.
- **Dashboard:** Business analytics and reporting for the Owner/Manager.
- **Settings:** Dynamic site configurations (Logo, Banners, Social Links).

---

## 📡 API Endpoints (v1)

| Prefix | Module | Description |
| :--- | :--- | :--- |
| `/api/v1/users` | **User** | Registration, Roles, and Profiles |
| `/api/v1/products` | **Products** | Product Management & Catalog |
| `/api/v1/reviews` | **Reviews** | Customer Feedback & Ratings |
| `/api/v1/orders` | **Orders** | Checkout & Order Status Tracking |
| `/api/v1/dashboard` | **Dashboard** | Admin Stats & Business Analytics |
| `/api/v1/settings` | **Settings** | Site Configuration & Content |


---

## 🛤️ Future Roadmap & Enhancements

To make StyleMart even more robust and industry-ready, the following updates are planned:

- [ ] **Automated Payments:** Integration of SSLCommerz, Stripe, or AmarPay for automated payment confirmation.
- [ ] **Real-time Notifications:** Implementing **Socket.io** for instant order status alerts for both customers and staff.
- [ ] **Advanced Analytics:** Implementing MongoDB aggregation to generate weekly/monthly PDF sales reports.
- [ ] **Email Service:** Integrating **Nodemailer** or **SendGrid** for automated order confirmation and invoice emails.
- [ ] **Redis Caching:** Implementing Redis to cache frequently accessed product data for sub-millisecond response times.
- [ ] **API Documentation:** Integrating **Swagger (OpenAPI)** for interactive and detailed API documentation.

---

## 💡 Closing Statement

The **StyleMart Backend** serves as a secure, modular, and highly efficient engine that drives the entire e-commerce experience. By focusing on **Clean Code**, **Secure RBAC**, and **Scalable Architecture**, this project showcases my ability to build production-level server-side applications. It is designed not just to work, but to grow with the business needs.

---

## 👨‍💻 Get In Touch
**Md. Shihad Hasan Munna**
*Full Stack Developer*

- **Portfolio:** [shihad-hasan.web.app](https://shihad-hasan.web.app/)
- **GitHub:** [@shihad-hasan07](https://github.com/shihad-hasan07)
- **Email:** shihadhasan607255@gmail.com

---
*If you find this project helpful, don't forget to give it a ⭐!*
