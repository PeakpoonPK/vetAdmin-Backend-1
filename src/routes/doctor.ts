import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Create a new doctor
router.post('/', async (req, res) => {
  const { firstName, lastName, specialty, phone, email } = req.body;
  try {
    const doctor = await prisma.doctor.create({
      data: { firstName, lastName, specialty, phone, email },
    });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create doctor' });
  }
});

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        appointments: true,
        schedules: true,
      },
    });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// Update a doctor
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, specialty, phone, email } = req.body;
  try {
    const doctor = await prisma.doctor.update({
      where: { id: Number(id) },
      data: { firstName, lastName, specialty, phone, email },
    });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update doctor' });
  }
});

// Delete a doctor
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.doctor.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete doctor' });
  }
});

export default router;
