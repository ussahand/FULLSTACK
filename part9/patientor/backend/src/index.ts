import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid'

import { diagnoses } from './data/diagnoses.js';
import { patients } from './data/patients.js';
import { Patient, PatientPreview } from './types/types.js';
import { sanitizeNewpPatient } from './sanitizeNewpPatient.js'
import { sanitizeNewEntry } from './sanitizeNewEntry.js';

const getNonSensitivePatientsData = (data: Patient[]): Array<PatientPreview> =>
  data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id, name, dateOfBirth, gender, occupation
  }))

const app = express();

app.use(cors())
app.use(express.json())

app.get('/api/ping', (_req: any, resp: any) => {
  resp.send('pong');
})

app.get('/api/diagnoses', (_req: any, resp: any) => {
  resp.send(diagnoses)
})

app.get('/api/patients', (_req: any, resp: any) => {
  resp.send(getNonSensitivePatientsData(patients))
})

app.get('/api/patients/:id', (req: any, resp: any) => {
  const id = req.params.id;
  const found = patients.find(x => x.id === id)
  resp.send(found)
})

app.post('/api/patients', async (req: any, resp: any) => {
  sanitizeNewpPatient(req.body)
    .then(santizedEntry => {
      const newPatient = { ...santizedEntry, id: nanoid() }
      patients.push(newPatient)
      resp.send(newPatient)
    })
    .catch(e => { resp.status(400).send(e.message); return })
})

app.post('/api/patients/:id/entries', (req: any, resp: any) => {
  // console.log('req:', req.params.id)
  // console.log('body:', req.body)
  const index = patients.findIndex(p => p.id === req.params.id)
  if (index === -1)
    resp.status(404).send('the provided id not found')

  const newEntryId = patients[index].entries.length

  sanitizeNewEntry(req.body, newEntryId)
    .then(sanitizedEntry => {
      patients[index].entries.push(sanitizedEntry)
      resp.send(patients[index])
    })
    .catch(e => resp.status(400).send(e.message))
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log('Server running on port ', PORT)
})
