import { Patient, Gender } from './types/types.js';

type newPatient = Omit<Patient, 'id'>;

function fail(field: string): never {
  throw new Error(`Incorrect or missing ${field}`);
}

const isString = (text: unknown): text is string =>
  typeof text === 'string' || text instanceof String;

const parseName = (field: unknown, fieldName: string): string => {
  if (!field || !isString(field))
    fail(fieldName)
    // throw new Error(`Incorrect or missing ${fieldName}`)

  return field;
}

const isGender = (gender: any): gender is Gender =>
  Object.keys(Gender).includes(gender)
//  Object.values(Gender).includes(gender)

const parseGender = (gender: unknown, fieldName: string): Gender => {
  if (!gender || !isGender(gender))
    fail(fieldName)

    return gender;
}

const isDate = (date: string): boolean =>
  Date.parse(date) > Date.parse('1900-01-01') && Date.parse(date) < Date.now()

const parseDate = (date: unknown, fieldName: string): string => {
  if ( !date || !isString(date) || !isDate(date))
    fail(fieldName)
  return date
}

type Fields = { name: unknown, ssn: unknown, dateOfBirth: unknown, gender: unknown, occupation: unknown };

const sanitizeNewpPatient = async ({ name, ssn, dateOfBirth, gender, occupation }: Fields): Promise<newPatient> => {
  const newEntry: newPatient = {
    name: parseName(name, 'name'),
    ssn: parseName(ssn, 'ssn'),
    occupation: parseName(occupation, 'occupation'),
    dateOfBirth: parseDate(dateOfBirth, 'dateOfBirth'),
    gender: parseGender(gender, 'gender'),
    entries: [],
  }
  return newEntry;
}

export { sanitizeNewpPatient }