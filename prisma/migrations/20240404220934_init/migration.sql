-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('User', 'Admin', 'Employee', 'PlaceOwner');

-- CreateEnum
CREATE TYPE "TimeslotStatus" AS ENUM ('Available', 'Booked', 'Taken', 'Inactive');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('Gif', 'Image', 'Video');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'User',
    "email" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3),
    "password" TEXT,
    "nickname" TEXT,
    "avUpdated" TIMESTAMP,
    "avSrcType" "SourceType",
    "avOriginal" TEXT,
    "avThumbnail" TEXT,
    "lat" DOUBLE PRECISION,
    "long" DOUBLE PRECISION,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "startAt" TIME NOT NULL,
    "endAt" TIME NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceTag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" VARCHAR(10),

    CONSTRAINT "PlaceTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacePhoto" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order" INTEGER NOT NULL,
    "srcType" "SourceType" NOT NULL,
    "original" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "PlacePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceSeat" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "capaciry" INTEGER NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "PlaceSeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SeatTimeslot" (
    "id" TEXT NOT NULL,
    "status" "TimeslotStatus" NOT NULL DEFAULT 'Inactive',
    "day" "DayOfWeek" NOT NULL,
    "startAt" TIME NOT NULL,
    "endAt" TIME NOT NULL,
    "seatId" TEXT NOT NULL,

    CONSTRAINT "SeatTimeslot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlaceToPlaceTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PlaceTag_name_key" ON "PlaceTag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "PlacePhoto_placeId_order_key" ON "PlacePhoto"("placeId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "_PlaceToPlaceTag_AB_unique" ON "_PlaceToPlaceTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PlaceToPlaceTag_B_index" ON "_PlaceToPlaceTag"("B");

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacePhoto" ADD CONSTRAINT "PlacePhoto_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceSeat" ADD CONSTRAINT "PlaceSeat_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatTimeslot" ADD CONSTRAINT "SeatTimeslot_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "PlaceSeat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaceToPlaceTag" ADD CONSTRAINT "_PlaceToPlaceTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlaceToPlaceTag" ADD CONSTRAINT "_PlaceToPlaceTag_B_fkey" FOREIGN KEY ("B") REFERENCES "PlaceTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
