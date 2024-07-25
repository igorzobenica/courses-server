"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const courseController_1 = require("../controllers/courseController"); // Ensure correct import path
const router = (0, express_1.Router)();
router.get('/', (req, res) => (0, courseController_1.getUniqueValues)(req, res, 'category'));
exports.default = router;
