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

app.post("/api/students", async (req, res) => {
  const { firstName, lastName, email, phone, courseId } = req.body;

  try {
    const newStudent = await prisma.student.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        courseId,
      },
    });
    res.status(201).json(newStudent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while submitting contact information" });
  }
});

// Define API Endpoint to fetch courses with optional search filters
app.get("/api/courses", async (req, res) => {
  const { search, page = 1, pageSize = 10, category, deliveryMethod, location, language, startDate } = req.query;

  const filters: any = {
    AND: [
      {
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
      },
    ],
  };

  if (category) {
    filters.AND.push({
      category: {
        contains: String(category),
        mode: "insensitive",
      },
    });
  }
  if (deliveryMethod) {
    filters.AND.push({
      deliveryMethod: {
        contains: String(deliveryMethod),
        mode: "insensitive",
      },
    });
  }
  if (location) {
    filters.AND.push({
      location: {
        contains: String(location),
        mode: "insensitive",
      },
    });
  }
  if (language) {
    filters.AND.push({
      language: {
        contains: String(language),
        mode: "insensitive",
      },
    });
  }
  if (startDate) {
    filters.AND.push({
      startDate: {
        gte: new Date(String(startDate)),
      },
    });
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

app.get("/api/courses/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching the course" });
  }
});

// Fetch list of unique locations
app.get("/api/locations", async (req, res) => {
  try {
    const locations = await prisma.course.findMany({
      select: {
        location: true,
      },
      distinct: ['location'],
      orderBy: {
        location: 'asc',
      },
    });
    res.json(locations.map(course => course.location));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching locations" });
  }
});

// Fetch list of unique categories
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await prisma.course.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
      orderBy: {
        category: 'asc',
      },
    });
    res.json(categories.map(course => course.category));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching categories" });
  }
});

// Fetch list of unique delivery methods
app.get("/api/deliveries", async (req, res) => {
  try {
    const deliveries = await prisma.course.findMany({
      select: {
        deliveryMethod: true,
      },
      distinct: ['deliveryMethod'],
      orderBy: {
        deliveryMethod: 'asc',
      },
    });
    res.json(deliveries.map(course => course.deliveryMethod));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching delivery methods" });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
