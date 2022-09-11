import { useState } from "react";
import axios from "axios";
import { useStateValue, updatePatient } from "../state";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import AddEntryModal from "./AddEntryModal";
import { Patient, Entry, HospitalEntry, OccupationalHealthcareEntry,
  HealthCheckEntry, EntryView } from "../types/types";

import { Button } from "@mui/material";
import FemailIcon from "@mui/icons-material/Female";
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteIcon from '@mui/icons-material/Favorite';

export function PatientInfo() {
  const [modalStatus, setModal] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const { id } = useParams();
  if (!id) {
    throw new Error('router has an id with undefined value');
  }

  const [{ patients, diagnoses }, dispatch] = useStateValue();

  const patient = patients[id];
  if (!patient?.ssn) {
    axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
      .then(({ data }: { data: Patient }) => {
        dispatch(updatePatient(data));
      })
      .catch(e => console.log(e.message));

    return null;
  }

  const closeModal = (): void => {
    setModal(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryView) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );

      dispatch(updatePatient(updatedPatient));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        console.log('in the axios', e?.response);
        if ( e?.response?.data?.error )
          setError(String(e?.response?.data?.error));
        else if(e?.response?.data)  
          setError(String(e?.response?.data));
        else
          setError("Unrecognized axios error");
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

const genderIcon = {
  male: <MaleIcon />,
  female: <FemailIcon />,
  other: <TransgenderIcon />,
}[patient.gender];

  return (
    <div className="patientInfo">
      <h1>{patient.name} {genderIcon} </h1>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <br />
      <strong>Entries</strong>
      <CmpEntries entries={patient.entries} />

      <AddEntryModal
        modalStatus={modalStatus}
        onSubmit={submitNewEntry}
        error={error}
        onClose={()=> setModal(false)}
        diagnoses={diagnoses}
      />

      <Button variant="contained" onClick={() => setModal(true)}>
        Add New Entry
      </Button>
    </div>
  );
}

type entryProp = {
  entries: Array<Entry>;
};

function CmpEntries({ entries }: entryProp) {
  return (
    <div>
      {entries.map((e, i) => <CmpEntry key={i} entry={e} />)}
    </div>
  );
}

function CmpEntry({ entry }: { entry: Entry }) {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    default:
      const _exhaustiveCheck: never = entry;
      return <>Error: Unresolved entry Type{_exhaustiveCheck}</>;
  }
}

function HealthCheck({ entry }: { entry: HealthCheckEntry }) {
  const color = {
    0: 'green',
    1: 'yellow',
    2: 'orange',
    3: 'red',
  }[entry.healthCheckRating];

  return (
    <div style={{ border: '1px solid red', borderRadius: '5px' }}>
      <p>{entry.date} <HealthAndSafetyIcon /></p>
      <p>{entry.description}</p>
      <FavoriteIcon sx={{color}}/>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
}

function Hospital({ entry }: { entry: HospitalEntry }) {
  return (
    <div style={{ border: '1px solid red', borderRadius: '5px' }}>
      <p>{entry.date} <LocalHospitalIcon /></p>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
}

function OccupationalHealthcare({ entry }: { entry: OccupationalHealthcareEntry }) {
  return (
    <div style={{ border: '1px solid red', borderRadius: '5px' }}>
      <p>{entry.date} <WorkIcon /></p>
      <p>{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
}