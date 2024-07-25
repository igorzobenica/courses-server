import request from "supertest";
import app from "../../src/index";

describe("Courses API", () => {
  it("should fetch courses with pagination", async () => {
    const response = await request(app).get("/api/courses?page=1&pageSize=10");
    expect(response.status).toBe(200);
    expect(response.body.courses).toBeInstanceOf(Array);
  });

  it("should fetch a specific course by ID", async () => {
    const coursesResponse = await request(app).get(
      "/api/courses?page=1&pageSize=1"
    );
    expect(coursesResponse.status).toBe(200);
    expect(coursesResponse.body.courses).toBeInstanceOf(Array);

    if (coursesResponse.body.courses.length > 0) {
      const courseId = coursesResponse.body.courses[0].id;
      const response = await request(app).get(`/api/courses/${courseId}`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("id");
      expect(response.body.id).toBe(courseId);
    } else {
      console.error("No courses found to test with.");
      fail("No courses found to test with.");
    }
  });

  it("should fetch unique locations", async () => {
    const response = await request(app).get("/api/locations");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should fetch unique categories", async () => {
    const response = await request(app).get("/api/categories");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("should fetch unique delivery methods", async () => {
    const response = await request(app).get("/api/deliveries");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
