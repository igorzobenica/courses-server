"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const studentRoutes_1 = __importDefault(require("./routes/studentRoutes"));
const courseRoutes_1 = __importDefault(require("./routes/courseRoutes"));
const locationRoutes_1 = __importDefault(require("./routes/locationRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const deliveryRoutes_1 = __importDefault(require("./routes/deliveryRoutes"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigin = process.env.ALLOWED_ORIGIN || "http://localhost:5173";
app.use((0, cors_1.default)({ origin: allowedOrigin }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use("/api/students", studentRoutes_1.default);
app.use("/api/courses", courseRoutes_1.default);
app.use("/api/locations", locationRoutes_1.default);
app.use("/api/categories", categoryRoutes_1.default);
app.use("/api/deliveries", deliveryRoutes_1.default);
app.use(errorHandler_1.default);
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Listening on http://localhost:${port}`);
    });
}
exports.default = app;
