import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Insert Doctors
  await prisma.doctor.createMany({
    data: [
      {
        firstName: "John",
        lastName: "Doe",
        phone: "123-456-7890",
        email: "john.doe@example.com",
        specialty: "Cardiology",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        phone: "987-654-3210",
        email: "jane.smith@example.com",
        specialty: "Dermatology",
      },
    ],
  });

  // Insert Patients
  await prisma.patient.createMany({
    data: [
      {
        name: "Buddy",
        age: 5,
        species: "Dog",
        breed: "Golden Retriever",
        sex: "Male",
        weight: "30kg",
        ownerName: "Alice Johnson",
        ownerPhone: "555-1234",
        ownerEmail: "alice.johnson@example.com",
      },
      {
        name: "Whiskers",
        age: 3,
        species: "Cat",
        breed: "Siamese",
        sex: "Female",
        weight: "4kg",
        ownerName: "Bob Brown",
        ownerPhone: "555-5678",
        ownerEmail: "bob.brown@example.com",
      },
    ],
  });

  // Insert Doctor Schedules
  await prisma.doctorSchedule.createMany({
    data: [
      {
        doctorId: 1,
        day: new Date("2025-03-12"),
        start: new Date("2025-03-12T09:00:00"),
        end: new Date("2025-03-12T12:00:00"),
      },
      {
        doctorId: 2,
        day: new Date("2025-03-12"),
        start: new Date("2025-03-12T10:00:00"),
        end: new Date("2025-03-12T13:00:00"),
      },
    ],
  });

  // Insert Appointments
  await prisma.appointment.createMany({
    data: [
      {
        doctorId: 1,
        patientId: 1,
        date: new Date("2025-03-13T10:00:00"),
        status: "Confirmed",
      },
      {
        doctorId: 2,
        patientId: 2,
        date: new Date("2025-03-14T11:00:00"),
        status: "Pending",
      },
    ],
  });

  // Insert Users
  await prisma.user.createMany({
    data: [
      {
        firstName: "Admin",
        lastName: "User",
        phone: "999-888-7777",
        email: "admin@example.com",
        password: "hashed_password",
      },
      {
        firstName: "Receptionist",
        lastName: "Staff",
        phone: "888-777-6666",
        email: "reception@example.com",
        password: "hashed_password",
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
