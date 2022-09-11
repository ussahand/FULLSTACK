import { Entry } from './entry.js'

// type Gender = "male" | "female" | "other";
const Gender = {
  male: 'male',
  female: 'female',
  other: 'other',
} as const;


type Gender = keyof typeof Gender; 

interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[],
}

type PatientPreview = Omit<Patient, 'ssn' | 'entries'>;

export { Patient, PatientPreview, Gender,}
