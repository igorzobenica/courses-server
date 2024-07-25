import { Router } from "express";
import { createStudent } from "../controllers/studentController";
import { studentValidator, validate } from "../middlewares/validators";

const router = Router();

router.post('/', studentValidator, validate, createStudent);

export default router;
