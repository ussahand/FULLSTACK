import { Button, FormGroup, FormLabel } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { MuiTextField, SelectField, DiagnosisSelection } from "./FormFields";

import { EntryLiteralTypes, HealthCheckRating, Discharge, Diagnosis, EntryView, SickLeave } from "../types/types";



interface Props {
  onClose: () => void;
  onSubmit: (values: EntryView) => void;
  diagnoses: { [code: string]: Diagnosis };
}

const AddEntryForm = ({ onClose, onSubmit, diagnoses: objDiagnoses }: Props) => {
  const diagnoses = Object.values(objDiagnoses); //.map(([,value])=>value);
  const initialValues = {
    description: "",
    date: "",
    specialist: "",
    type: EntryLiteralTypes["HealthCheck"],
    healthCheckRating: 0,
    discharge: { date: '', criteria: '' } as Discharge,
    diagnosisCodes: [],
    employerName: '',
    sickLeave: {startDate: '', endDate: ''} as SickLeave,
  };

 return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors: { [field: string]: string } = {};
        const check = (name: keyof typeof values) => {
          if (!values[name])
            errors[name] = "Field is required";
        };

        check('description');
        check('date');
        check('specialist');
        switch (values.type as EntryLiteralTypes) {
          case "HealthCheck":
            return errors;
          case "Hospital":
            // check('discharge.date');
            check('diagnosisCodes');
            return errors;
          case "OccupationalHealthcare":
            check('employerName');
            return errors;
        }
      }}
    >
      {({ dirty, isValid, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form >
            <Field name="description" component={MuiTextField} />
            <Field name="date" placeholder="YYYY-mm_dd" component={MuiTextField} />
            <Field name="specialist" label="specialist name" component={MuiTextField} />
            <SelectField name="type" label="entry type" options={Object.entries(EntryLiteralTypes).map(([k, v]) => ({ key: k, value: v }))} />
            {values.type === "HealthCheck" &&
              <div>
                <SelectField name="healthCheckRating" label="health check rating" options={Object.entries(HealthCheckRating).map(([k, v]) => ({ key: v, value: k }))} />
              </div>}
            {values.type as string === "Hospital" &&
              <div>
                <FormLabel htmlFor='discharge'>discharge info</FormLabel>
                <FormGroup id="discharge" aria-label="discharge info" style={{ padding: "0 5px 0 10px" }} >
                  <Field name="discharge.date" label="date" placeholder="YYYY-MM-DD" component={MuiTextField} />
                  <Field name="discharge.criteria" label="criteria" component={MuiTextField} />
                </FormGroup>
                <DiagnosisSelection {...{ setFieldValue, setFieldTouched, diagnoses }} />
              </div>
            }
            {values.type as string === "OccupationalHealthcare" &&
              <div>
                <Field name="employerName" label="employer name" component={MuiTextField} />
                <DiagnosisSelection {...{ setFieldValue, setFieldTouched, diagnoses }} />

                <FormLabel htmlFor='sick leave'>sick leave</FormLabel>
                <FormGroup id="sick leave" aria-label="sick leave" style={{ padding: "0 5px 0 10px" }} >
                  <Field name="sickLeave.startDate" label="start date" placeholder="YYYY-MM-DD" component={MuiTextField} />
                  <Field name="sickLeave.endDate" label="end date" placeholder="YYYY-MM-DD" component={MuiTextField} />
                </FormGroup>
              </div>
            }
            <Button onClick={() => onClose()} color="secondary" variant="contained">cancel</Button>
            <Button type="submit" variant="contained" disabled={!dirty || !isValid} style={{ float: "right", }} >add</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
