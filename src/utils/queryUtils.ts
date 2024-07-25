import { Prisma } from '@prisma/client';

interface CourseQueryParams {
  search?: string;
  page?: number;
  pageSize?: number;
  category?: string;
  deliveryMethod?: string;
  location?: string;
  language?: string;
  startDate?: string;
}

export const buildFilters = (query: CourseQueryParams): Prisma.CourseWhereInput => {
  const filters: any = {
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
