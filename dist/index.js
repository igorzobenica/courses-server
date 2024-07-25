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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';
// Allow requests from your frontend origin
app.use((0, cors_1.default)({ origin: allowedOrigin }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
// Define API Endpoint to fetch courses with optional search filters
app.get("/api/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, page = 1, pageSize = 10, category, deliveryMethod, location, language, startDate } = req.query;
    const filters = {
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
    const take = parseInt(pageSize, 10);
    const skip = (parseInt(page, 10) - 1) * take;
    try {
        const courses = yield prisma.course.findMany({
            where: filters,
            take,
            skip,
        });
        const totalCourses = yield prisma.course.count({ where: filters });
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
}));
app.get("/api/courses/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const course = yield prisma.course.findUnique({
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
        res.status(500).json({ error: "An error occurred while fetching the course" });
    }
}));
// Fetch list of unique locations
app.get("/api/locations", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locations = yield prisma.course.findMany({
            select: {
                location: true,
            },
            distinct: ['location'],
            orderBy: {
                location: 'asc',
            },
        });
        res.json(locations.map(course => course.location));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching locations" });
    }
}));
// Fetch list of unique categories
app.get("/api/categories", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield prisma.course.findMany({
            select: {
                category: true,
            },
            distinct: ['category'],
            orderBy: {
                category: 'asc',
            },
        });
        res.json(categories.map(course => course.category));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching categories" });
    }
}));
// Fetch list of unique delivery methods
app.get("/api/deliveries", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliveries = yield prisma.course.findMany({
            select: {
                deliveryMethod: true,
            },
            distinct: ['deliveryMethod'],
            orderBy: {
                deliveryMethod: 'asc',
            },
        });
        res.json(deliveries.map(course => course.deliveryMethod));
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching delivery methods" });
    }
}));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
