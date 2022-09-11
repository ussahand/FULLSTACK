import { Dialog, DialogTitle, Divider, DialogContent, Alert } from "@mui/material";
import AddEntryForm from "./AddEntryForm";
import { EntryView, Diagnosis } from "../types/types";



interface Props {
  modalStatus: boolean,
  error?: string,
  onSubmit: (values: EntryView) => void,
  onClose: () => void,
  diagnoses:{ [code: string]: Diagnosis},
}

const AddEntryModal = (props: Props) => {
  return (
    <Dialog open={props.modalStatus} onClose={props.onClose}>
      <DialogTitle>Add Entry Form</DialogTitle>
      <Divider />
      <DialogContent> 
        {props.error && <Alert severity="error">{`Error: ${props.error}`}</Alert>}
        <AddEntryForm onClose={props.onClose} onSubmit={props.onSubmit} 
        diagnoses={props.diagnoses} />
      </DialogContent>
    </Dialog>
  );
};

export default AddEntryModal;