"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err.stack || err.message || err);
    if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: 'An unexpected error occurred' });
};
exports.default = errorHandler;
