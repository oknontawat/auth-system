import express from "express";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
const PORT = 5000;
app.listen(PORT, () => { console.log(`🚀 Server running at http://localhost:${PORT}`); });
