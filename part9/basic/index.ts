// const express = require('express');
import express from 'express';
import calculateBmi from './calculateBmi';
import calculateExercises from './calculateExercises';

const app = express();
app.use(express.json()) //incoming parser

// app.use((req, _resp, next) => {
//   console.log('req is:', req.method, req.url)
//   console.log('req2 ', req.headers, JSON.stringify(req.body))  
//   next();
// })

app.get('/hello', (_req, resp) => {
  resp.send('Hello Full Stack!');
});

app.get('/bmi', (req, resp) => {

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  
  if (isNaN(height) || isNaN(weight))
    resp.status(400).send({error:'malformatted parameters'});

  const result = calculateBmi(height, weight);
  resp.send('Your BMI result:' + result);
});

app.post('/exercises', (req, resp) => {
  const target = Number(req.body.target);
  const dailyExercises = req.body.dailyExercises;

  if (isNaN(target) || isNaN(dailyExercises[0]))
    resp.status(400).send({error: "malformatted parameters"})

  const result = calculateExercises(dailyExercises, target) ;
  resp.json(result)
})

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
