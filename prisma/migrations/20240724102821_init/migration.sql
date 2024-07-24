-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "institute_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "delivery_method" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "language" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);
