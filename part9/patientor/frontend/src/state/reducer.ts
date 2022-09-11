import { State } from "./state";
import { Patient, Diagnosis } from "../types/types";

export type Action =
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "UPDATE_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state, diagnoses: {
          ...action.payload.reduce((prevMapObj,newItem) => ({...prevMapObj,[newItem.code]: newItem}),{})
        }
      };
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action =>
   ({type: "SET_DIAGNOSIS_LIST", payload: diagnosisList}) ;

export const setPatientList = (patientList: Patient[]): Action =>
   ({type: "SET_PATIENT_LIST", payload: patientList}) ;

export const addPatient = (patient: Patient): Action =>
   ({type: "ADD_PATIENT", payload: patient}) ;

export const updatePatient = (patient: Patient): Action =>
   ({type: "UPDATE_PATIENT", payload: patient}) ;
