import { Request, Response } from "express";
import prisma from "../models/prismaClient";
import { CourseField } from "../types/courseFields";
import { buildFilters } from "../utils/queryUtils";

export const getCourses = async (req: Request, res: Response) => {
  const { page = 1, pageSize = 10 } = req.query;

  const filters = buildFilters(req.query);

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
    res
      .status(500)
      .json({ error: "An error occurred while fetching the course" });
  }
};

export const getUniqueValues = async (
  req: Request,
  res: Response,
  field: CourseField
) => {
  try {
    const values = await prisma.course.findMany({
      select: {
        [field]: true,
      },
      distinct: [field],
      orderBy: {
        [field]: "asc",
      },
    });
    res.json(values.map((course: any) => course[field]));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: `An error occurred while fetching ${field}` });
  }
};
