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
    const { search, page = 1, pageSize = 10, category, deliveryMethod, location } = req.query;
    const filters = {
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
