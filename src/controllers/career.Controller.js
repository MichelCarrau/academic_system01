import Career from '../models/career.js';
// Obtener todas las carreras

export const getAllCareers = async (req, res) => {
  try {
    const careers = await Career.find();
    res.status(200).json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una carrera nueva
export const createCareer = async (req, res) => {
  try {
    const newCareer = new Career(req.body);
    const savedCareer = await newCareer.save();
    res.status(201).json(savedCareer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener una carrera por su ID
export const getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) return res.status(404).json({ message: 'Career not found' });
    res.json(career);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una carrera
export const updateCareer = async (req, res) => {
  try {
    const updatedCareer = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCareer) return res.status(404).json({ message: 'Career not found' });
    res.json(updatedCareer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar una carrera
export const deleteCareer = async (req, res) => {
  try {
    const deletedCareer = await Career.findByIdAndDelete(req.params.id);
    if (!deletedCareer) return res.status(404).json({ message: 'Career not found' });
    res.json({ message: 'Career deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

