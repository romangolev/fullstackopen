import express from 'express';
import patientService from '../services/patientService';
import { NewPatient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body as NewPatient;

  const addedPatient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });

  res.json(addedPatient);
});

export default router;
