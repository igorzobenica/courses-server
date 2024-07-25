"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const studentController_1 = require("../controllers/studentController");
const validators_1 = require("../middlewares/validators");
const router = (0, express_1.Router)();
router.post('/', validators_1.studentValidator, validators_1.validate, studentController_1.createStudent);
exports.default = router;
