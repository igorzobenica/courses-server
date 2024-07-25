import { Request, Response } from "express";
import prisma from "../models/prismaClient";
import { CourseField } from "../types/courseFields";

export const getCourses = async (req: Request, res: Response) => {
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
};

export const getCourseById = async (req: Request, res: Response) => {
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
};

export const getUniqueValues = async (req: Request, res: Response, field: CourseField) => {
  try {
    const values = await prisma.course.findMany({
      select: {
        [field]: true,
      },
      distinct: [field],
      orderBy: {
        [field]: 'asc',
      },
    });
    res.json(values.map((course: any) => course[field]));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `An error occurred while fetching ${field}` });
  }
};
