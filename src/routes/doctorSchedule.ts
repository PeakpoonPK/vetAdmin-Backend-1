import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Create a new doctor schedule
router.post('/', async (req, res) => {
  const { doctorId, date, start, end } = req.body;
  try {
    const doctorSchedule = await prisma.doctorSchedule.create({
      data: { doctorId, day: new Date(date), start, end },
    });
    res.status(201).json(doctorSchedule);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create doctor schedule' });
  }
});

// Get all doctor schedules
router.get('/', async (req, res) => {
  try {
    const doctorSchedules = await prisma.doctorSchedule.findMany();
    res.status(200).json(doctorSchedules);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctor schedules' });
  }
});

// Get all doctor schedules
router.get('/doctorId/:id', async (req, res) => {
  try {
    const doctorSchedules = await prisma.doctorSchedule.findMany(
      { where: { doctorId: Number(req.params.id) } }
    );
    res.status(200).json(doctorSchedules);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch doctor schedules' });
  }
});

// Update a doctor schedule
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { doctorId, date, start, end } = req.body;
  try {
    const doctorSchedule = await prisma.doctorSchedule.update({
      where: { id: Number(id) },
      data: { doctorId, day: new Date(date), start, end },
    });
    res.status(200).json(doctorSchedule);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update doctor schedule' });
  }
});

// Delete a doctor schedule
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.doctorSchedule.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete doctor schedule' });
  }
});

export default router;
