import { BaseEntry, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "./types/types.js";
import { HealthCheckRating, Discharge, SickLeave } from "./types/types.js";
import { fail, isObject, isString, isDate, isNumber } from "./util.js";
import { diagnoses } from "./data/diagnoses.js";

// export const sanitizeNewEntry = async (gross: unknown): Promise<Entry> => {
//   if (!Array.isArray(gross))
//     fail('Array, inputs must be in the array');
//   const pure = gross.map((x, i) => sanitizeEntry(x, i));
//   return pure;
// }

type UnknownDischarge = { date: unknown, criteria: unknown }
type UnkownSickLeave = { startDate: unknown, endDate: unknown }

type Fields = {
  type: unknown, description: unknown, date: unknown,
  specialist: unknown, diagnosisCodes: unknown,
  healthCheckRating: unknown, discharge: UnknownDischarge,
  employerName: unknown, sickLeave: UnkownSickLeave,
}

export const sanitizeNewEntry = async(gross: Fields, newId: number): Promise<Entry> => {
  if (!isObject(gross))
    fail('entry')

  const baseEntry: BaseEntry = {
    id: newId.toString(),
    description: parseString(gross.description, 'description'),
    specialist: parseString(gross.specialist, 'specialist'),
    date: parseDate(gross.date, 'date'),
  }

  return discriminateEntries(baseEntry, gross)
}

function discriminateEntries(baseEntry: BaseEntry, gross: Fields): Entry {
  const type = parseString(gross.type, 'type')
  switch (type) {
    case "HealthCheck":
      const healthCheckEntry: HealthCheckEntry = {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheck(gross.healthCheckRating)
      }
      return healthCheckEntry

    case "Hospital":
      const hospitalEntry: HospitalEntry = {
        ...baseEntry,
        type: "Hospital",
        diagnosisCodes: parseDiagnoses(gross.diagnosisCodes),
        discharge: parseDischarge(gross.discharge)
      }
      return hospitalEntry

    case "OccupationalHealthcare":
      const occupationalHealthcareEntry: OccupationalHealthcareEntry = {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString(gross.employerName, 'employerName')
      }

      if (gross.hasOwnProperty('diagnosisCodes'))
        Object.assign(occupationalHealthcareEntry, { diagnosisCodes: parseDiagnoses(gross.diagnosisCodes) })

      if (gross.hasOwnProperty('sickLeave'))
        occupationalHealthcareEntry.sickLeave = parseSickLeave(gross.sickLeave)
      // Object.assign(occupationalHealthcareEntry, { sickLeave: parseSickLeave(gross.sickLeave) })
      return occupationalHealthcareEntry

    default:
      fail(`or new type:${type}`)
  }
}

function parseString(field: unknown, fieldName: string): string {
  if (!field || !isString(field))
    fail(fieldName)
  return field
}

function parseDate(field: unknown, fieldName: string): string {
  if (!field || !isDate(field))
    fail(fieldName)
  return field
}

const isDiagnosisCodeExist = (codes: unknown[]): codes is string[] =>
  codes.every(code => diagnoses.some(d => d.code === code))

function parseDiagnoses(diagnosisCodes: unknown): Array<string> {
  if (!diagnosisCodes || !Array.isArray(diagnosisCodes) || !isDiagnosisCodeExist(diagnosisCodes))
    fail('or not suprted diagnosisCodes')
  return diagnosisCodes
}

const isHealthCheck = (field: unknown): field is HealthCheckRating =>
  (isNumber(field) || isString(field)) && Object.keys(HealthCheckRating).includes(field.toString())

function parseHealthCheck(field: unknown): HealthCheckRating {
  if (!isHealthCheck(field))
    fail('healthCheckRating')
  return field
}

const isDischarge = (prop: UnknownDischarge): prop is Discharge =>
  isDate(prop.date) && isString(prop.criteria)

function parseDischarge(prop: UnknownDischarge): Discharge {
  if (!prop || !isDischarge(prop))
    fail('discharge fields')
  return prop
}

const isSickLeave = (prop: UnkownSickLeave): prop is SickLeave =>
  isDate(prop.startDate) && isDate(prop.endDate)

function parseSickLeave(prop: UnkownSickLeave): SickLeave {
  if (!prop || !isSickLeave(prop))
    fail('sickLeave fields')
  return prop
}
