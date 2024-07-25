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
exports.createStudent = void 0;
const prismaClient_1 = __importDefault(require("../models/prismaClient"));
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, phone, courseId } = req.body;
    try {
        const newStudent = yield prismaClient_1.default.student.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                courseId,
            },
        });
        res.status(201).json(newStudent);
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .json({
            error: "An error occurred while submitting contact information",
        });
    }
});
exports.createStudent = createStudent;
