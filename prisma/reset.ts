import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    // Delete all records in reverse order of dependencies
    console.log("🗑️  Clearing database...");

    await prisma.appointment.deleteMany({});
    console.log("✓ Appointments cleared");

    await prisma.doctor.deleteMany({});
    console.log("✓ Doctors cleared");

    await prisma.patient.deleteMany({});
    console.log("✓ Patients cleared");

    await prisma.user.deleteMany({});
    console.log("✓ Users cleared");

    console.log("✅ Database reset complete!");

  } catch (error) {
    console.error("❌ Error resetting database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

resetDatabase();
