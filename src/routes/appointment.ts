import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// Update an appointment
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const appointment = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// Confirm an appointment
router.post('/:id/confirm', async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { status: 'confirmed' },
    });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to confirm appointment' });
  }
});

// Cancel an appointment
router.post('/:id/cancel', async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await prisma.appointment.update({
      where: { id: Number(id) },
      data: { status: 'cancelled' },
    });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to cancel appointment' });
  }
});

export default router;
