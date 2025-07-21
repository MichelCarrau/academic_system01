import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';
import Career from '../models/career.js';
import { createCareer,deleteCareer, getAllCareers, getCareerById, updateCareer } from '../controllers/career.Controller.js';
const router = Router();

router.get('/careers', async (req, res) => {
  let carrera = await Career.findOne({ code: 'TEST01' });
  if (!carrera) {
    carrera = await Career.create({
  career_code: 'TI51',
  career_name: 'TI - Tecnologías de la Información',
  description: 'Carrera enfocada en tecnologías actuales',
  four_quarter_duration: 10,
  modality: 'Presencial',
  creation_date: new Date('2021-07-15'), // puede ser Date.now() si quieres hoy
  active: true,
  coordinator: {
    name: 'Ana',
    lastname: 'Perez',
    office: 'Edificio A-201',
    email: 'ana@ut.com'
  }
});

  }
  const all = await Career.find();
  res.json(all);
});
router.post('/careers/create', createCareer)
router.post('/careers/delete', deleteCareer)
router.delete('/careers/:id', deleteCareer);
router.put('/careers/:id', updateCareer);


export default router;
