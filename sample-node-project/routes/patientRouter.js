import express from 'express';
const router = express.Router();

import { createNewPatient, getAllPatients, getPatientById, upadatePatient, deletePatient } from '../services/patientService.js';


router.get('/patients', async (req,res, next) => {
    try {
        const patients = await getAllPatients();
        res.status(200).json(patients);
    } catch(error){
        next(error);
    }
});


router.get('/patients/:id', async (req,res, next) => {
    try {
        const patient = await getPatientById(req.params.id);
        res.status(200).json(patient);
    } catch(error){
        next(error);
    }
});
router.post('/patients', async (req, res, next) => {
    try {
        const patient = await createNewPatient(req.body);
        res.status(201).json(patient);
    } catch(error){
        next(error);
    }
});
router.put('/patients/:id', async (req, res, next) => {
    try {
        const updatedPatient = await upadatePatient(req.params.id, req.body);
        res.status(200).json(updatedPatient);
    } catch(error) {
        next(error);
    }
});

router.delete('/patients/:id', async (req, res, next) => {
    try {
        await deletePatient(req.params.id);
        res.status(204).end();
    } catch(error) {
        next(error);
    }
});

export default router;