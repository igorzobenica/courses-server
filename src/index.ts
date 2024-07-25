import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes";
import courseRoutes from "./routes/courseRoutes";
import locationRoutes from "./routes/locationRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import deliveryRoutes from "./routes/deliveryRoutes";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: allowedOrigin }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/deliveries", deliveryRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
