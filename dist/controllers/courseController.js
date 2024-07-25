"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueValues = exports.getCourseById = exports.getCourses = void 0;
const prismaClient_1 = __importDefault(require("../models/prismaClient"));
const queryUtils_1 = require("../utils/queryUtils");
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = 1, pageSize = 10 } = req.query;
    const filters = (0, queryUtils_1.buildFilters)(req.query);
    const take = parseInt(pageSize, 10);
    const skip = (parseInt(page, 10) - 1) * take;
    try {
        const courses = yield prismaClient_1.default.course.findMany({
            where: filters,
            take,
            skip,
        });
        const totalCourses = yield prismaClient_1.default.course.count({ where: filters });
        res.json({
            courses,
            totalCourses,
            totalPages: Math.ceil(totalCourses / take),
            currentPage: parseInt(page, 10),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching courses" });
    }
});
exports.getCourses = getCourses;
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const course = yield prismaClient_1.default.course.findUnique({
            where: { id },
        });
        if (course) {
            res.json(course);
        }
        else {
            res.status(404).json({ error: "Course not found" });
        }
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: "An error occurred while fetching the course" });
    }
});
exports.getCourseById = getCourseById;
const getUniqueValues = (req, res, field) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const values = yield prismaClient_1.default.course.findMany({
            select: {
                [field]: true,
            },
            distinct: [field],
            orderBy: {
                [field]: "asc",
            },
        });
        res.json(values.map((course) => course[field]));
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({ error: `An error occurred while fetching ${field}` });
    }
});
exports.getUniqueValues = getUniqueValues;
