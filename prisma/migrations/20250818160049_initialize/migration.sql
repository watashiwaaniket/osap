-- CreateTable
CREATE TABLE "public"."Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "technologies" TEXT[],
    "topics" TEXT[],
    "desc" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "livelink" TEXT,
    "photos" TEXT[],
    "user" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
