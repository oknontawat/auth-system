auth-system/
│── src/
│   ├── index.ts               # Entry point of the server
│   ├── routes/
│   │   ├── auth.ts            # Routes for registration & login
│   │   └── users.ts           # Routes for user management (admin only)
│   ├── controllers/
│   │   ├── authController.ts  # Logic for auth endpoints
│   │   └── userController.ts  # Logic for user management
│   ├── middleware/
│   │   └── authMiddleware.ts  # JWT authentication & role checking
│   ├── models/
│   │   └── user.ts            # User model and in-memory storage
│   └── utils/
│       └── hash.ts            # Password hashing & comparison
│
├── package.json
├── tsconfig.json
└── README.md                  # میتونی همین README که فرستادی رو بذاری
