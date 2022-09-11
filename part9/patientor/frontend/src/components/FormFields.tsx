import { Field, FieldProps, ErrorMessage } from "formik";
import { TextField, MenuItem, } from "@mui/material";

//----MuiTextField ----------------------
interface TextProps extends FieldProps {
  label?: string;
  placeholder?: string;
}

export const MuiTextField = ({field, label, placeholder}: TextProps) => {
  return(
    <>
    <TextField 
      fullWidth
      variant = "standard"
      style={{ marginBottom: "0.5em" }}
      label={label || field.name}
      placeholder={placeholder || label || field.name}
      {...field} 
    />
     <ErrorMessage name={field.name} />
    </>
  );
};

//----SelectField -------------------------

interface Option {
  key: string;
  value: string;
}

interface SelectProps {
  name: string;
  label: string;
  options: Option[];
}

const FormikSelect = ({field, ...props}: FieldProps) =>
  <TextField select {...field} {...props} />;

export const SelectField = ({name, label, options}: SelectProps) => {
  return(
    <>
    <Field 
      name={name}
      label={label}
      style={{ marginBottom: "0.5em" }}
      fullWidth
      select
      variant="standard"
      component={FormikSelect}
    >
      {options.map(o => <MenuItem key={o.key} value={o.value} >{o.key}</MenuItem>)}
    </Field>
    <ErrorMessage name={name} />
    </>
  );
};

//-------Select Diagnoses
import { FormikProps } from "formik";
import { FormControl, InputLabel, Select, Input } from "@mui/material";
import { Diagnosis } from "../types/diagnosis";
import { useState } from "react";

export const DiagnosisSelection = ({ diagnoses, setFieldValue, setFieldTouched, }: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  const field = "diagnosisCodes";
  const onChange = (data: string[]) => {
    setDiagnoses([...data]);
    setFieldTouched(field, true);
    setFieldValue(field, selectedDiagnoses);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: '30px' }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select multiple value={selectedDiagnoses} onChange={(e) => onChange(e.target.value as string[])} input={<Input />}>
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field} />
    </FormControl>
  );
};
