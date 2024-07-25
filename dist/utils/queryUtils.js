"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildFilters = void 0;
const buildFilters = (query) => {
    const filters = {
        AND: [
            {
                OR: [
                    {
                        name: {
                            contains: query.search || "",
                            mode: "insensitive",
                        },
                    },
                    {
                        instituteName: {
                            contains: query.search || "",
                            mode: "insensitive",
                        },
                    },
                ],
            },
        ],
    };
    if (query.category) {
        filters.AND.push({
            category: {
                contains: query.category,
                mode: "insensitive",
            },
        });
    }
    if (query.deliveryMethod) {
        filters.AND.push({
            deliveryMethod: {
                contains: query.deliveryMethod,
                mode: "insensitive",
            },
        });
    }
    if (query.location) {
        filters.AND.push({
            location: {
                contains: query.location,
                mode: "insensitive",
            },
        });
    }
    if (query.language) {
        filters.AND.push({
            language: {
                contains: query.language,
                mode: "insensitive",
            },
        });
    }
    if (query.startDate) {
        filters.AND.push({
            startDate: {
                gte: new Date(query.startDate),
            },
        });
    }
    return filters;
};
exports.buildFilters = buildFilters;
