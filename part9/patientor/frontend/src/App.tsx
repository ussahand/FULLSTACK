import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, setDiagnosisList } from "./state";
import { Patient, Diagnosis } from "./types/types";

import PatientListPage from "./PatientListPage";
import { PatientInfo } from "./components/PatientInfo";
import { Typography } from "@mui/material";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>( `${apiBaseUrl}/patients` );
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>( `${apiBaseUrl}/diagnoses` );
        dispatch(setPatientList(patientListFromApi));
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/*" element={<PatientListPage />} />
            <Route path='/patients/:id' element={<PatientInfo />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;

