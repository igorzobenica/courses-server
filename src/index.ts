import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

// Allow requests from your frontend origin
app.use(cors({ origin: allowedOrigin }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Define API Endpoint to fetch courses with optional search filters
app.get("/api/courses", async (req, res) => {
  const { search, page = 1, pageSize = 10, category, deliveryMethod, location } = req.query;

  const filters: any = {
    OR: [
      {
        name: {
          contains: search ? String(search) : "",
          mode: "insensitive",
        },
      },
      {
        instituteName: {
          contains: search ? String(search) : "",
          mode: "insensitive",
        },
      },
    ],
  };

  if (category) {
    filters.category = { contains: String(category), mode: "insensitive" };
  }
  if (deliveryMethod) {
    filters.deliveryMethod = { contains: String(deliveryMethod), mode: "insensitive" };
  }
  if (location) {
    filters.location = { contains: String(location), mode: "insensitive" };
  }

  const take = parseInt(pageSize as string, 10);
  const skip = (parseInt(page as string, 10) - 1) * take;

  try {
    const courses = await prisma.course.findMany({
      where: filters,
      take,
      skip,
    });

    const totalCourses = await prisma.course.count({ where: filters });

    res.json({
      courses,
      totalCourses,
      totalPages: Math.ceil(totalCourses / take),
      currentPage: parseInt(page as string, 10),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching courses" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
