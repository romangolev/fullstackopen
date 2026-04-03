import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/ping', (_req: Request, res: Response) => {
  res.send('pong');
});

app.get('/bmi', (req: Request, res: Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || !req.query.height || !req.query.weight) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight),
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.post('/exercises', (req: Request<any, any, { daily_exercises: number[]; target: number }>, res: Response) => {
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target)) || daily_exercises.some((h: number) => isNaN(Number(h)))) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const result = calculateExercises(daily_exercises.map((h: number) => Number(h)), Number(target));
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});