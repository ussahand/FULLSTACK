import { Diagnosis } from './diagnosis.js';

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
}

export const HealthCheckRating = {
  0: 'Healthy',
  1: 'LowRisk',
  2: 'HighRisk',
  3: 'CriticalRisk'
};

export type HealthCheckRating = keyof typeof HealthCheckRating;

export const EntryLiteralTypes = {
  Hospital: "Hospital",
  HealthCheck: "HealthCheck",
  OccupationalHealthcare: "OccupationalHealthcare",
} as const;

export interface HealthCheckEntry extends BaseEntry {
  type: typeof EntryLiteralTypes["HealthCheck"];
  healthCheckRating: HealthCheckRating;
}

export type Discharge = {date: string, criteria: string};

export interface HospitalEntry extends BaseEntry {
  type: typeof EntryLiteralTypes["Hospital"];
  diagnosisCodes: Array<Diagnosis['code']>;
  discharge: Discharge,
}

export type SickLeave = {startDate: string, endDate: string};

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: typeof EntryLiteralTypes['OccupationalHealthcare'];
  employerName: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;
