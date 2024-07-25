import { Router } from 'express';
import { getUniqueValues } from '../controllers/courseController'; // Ensure correct import path
import { CourseField } from '../types/courseFields'; // Ensure correct import path

const router = Router();

router.get('/', (req, res) => getUniqueValues(req, res, 'category' as CourseField));

export default router;
