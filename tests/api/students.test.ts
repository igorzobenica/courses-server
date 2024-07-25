import request from "supertest";
import app from "../../src/index";

describe("Students API", () => {
  it("should create a new student", async () => {
    const coursesResponse = await request(app).get(
      "/api/courses?page=1&pageSize=1"
    );
    expect(coursesResponse.status).toBe(200);
    expect(coursesResponse.body.courses).toBeInstanceOf(Array);

    if (coursesResponse.body.courses.length > 0) {
      const courseId = coursesResponse.body.courses[0].id;
      const uniqueEmail = `jane.smith.${Date.now()}@example.com`;
      const studentData = {
        firstName: "Jane",
        lastName: "Smith",
        email: uniqueEmail,
        phone: "0987654321",
        courseId: courseId,
      };

      const response = await request(app)
        .post("/api/students")
        .send(studentData);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("id");
      expect(response.body.courseId).toBe(courseId);
    } else {
      console.error("No courses found to test with.");
      fail("No courses found to test with.");
    }
  });
});
