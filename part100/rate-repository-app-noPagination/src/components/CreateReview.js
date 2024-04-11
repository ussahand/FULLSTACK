import { Formik } from "formik"
import * as yup from 'yup'
import { Button } from "../styles"
import FormikInput from '../utils/FormikInput'
import useCreateRepoReview from "../hooks/useCreateRepoReview"

const CreateReview = () => {
  const {submitReview} = useCreateRepoReview()

  return <Formik
    initialValues={{
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: ''
    }}
    validationSchema={yup.object().shape({
      ownerName: yup.string().required('repository owner name is required'),
      repositoryName: yup.string().required('repository name is required'),
      rating: yup.number().min(0).max(100).required('please provide rating between 0-100'),
      text: yup.string(),
    })}
    onSubmit={submitReview}
  >
    {(props) =>
      <>
        <FormikInput {...{ name: 'ownerName', placeholder: 'repository owner name', autoFocus: true, ...props }} />
        <FormikInput {...{ name: 'repositoryName', placeholder: 'repository name', ...props }} />
        <FormikInput {...{ name: 'rating', placeholder: 'rating between 0 and 100', ...props }} />
        <FormikInput {...{ name: 'text', placeholder:'review', multiline: true, styles: { height: 120 }, ...props }} />
        <Button title='Create a review' onPress={props.handleSubmit} disabled={!props.dirty || !props.isValid} />
      </>
    }
  </Formik>

}

export default CreateReview