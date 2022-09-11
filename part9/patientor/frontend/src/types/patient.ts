import { Entry } from './entry';

// type Gender = "male" | "female" | "other";
export const Gender = {
  male: 'male',
  female: 'female',
  other: 'other',
} as const;


export type Gender = keyof typeof Gender; 

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[],
}

export type PatientPreview = Omit<Patient, 'ssn' | 'entries'>;

// export { Patient, PatientPreview, Gender,}
