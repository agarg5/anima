-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "resource" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_resource_key" ON "Event"("resource");
