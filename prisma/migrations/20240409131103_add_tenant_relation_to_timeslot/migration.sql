-- AlterTable
ALTER TABLE "SeatTimeslot" ADD COLUMN     "tenantId" TEXT;

-- AddForeignKey
ALTER TABLE "SeatTimeslot" ADD CONSTRAINT "SeatTimeslot_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
