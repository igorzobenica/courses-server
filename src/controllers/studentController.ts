import { Request, Response } from "express";
import prisma from "../models/prismaClient";

export const createStudent = async (req: Request, res: Response) => {
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
    res
      .status(500)
      .json({
        error: "An error occurred while submitting contact information",
      });
  }
};
