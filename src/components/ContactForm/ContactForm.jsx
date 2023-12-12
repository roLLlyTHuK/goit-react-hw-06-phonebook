import { Form, Input, Button, Label } from './ContactForm.styled';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getContacts } from '../../redux/selectors';
import { addContact } from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';

const initialValues = {
  name: '',
  number: '',
};

let userSchema = yup.object({
  name: yup
    .string()
    .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required(),
  number: yup
    .string()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .required(),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleOnSubmit = (values, actions) => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      ) === undefined
    ) {
      const item = { id: nanoid(), name: values.name, number: values.number };
      console.log(item);
      dispatch(addContact(item));
      actions.resetForm();
    } else {
      alert(`${values.name} is already in contacts.`);
      return;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={userSchema}
      onSubmit={handleOnSubmit}
    >
      <Form>
        <Label>Name</Label>
        <Input
          type="text"
          name="name"
          title="Name may contain only letters, apostrophe, dash and spaces."
        />

        <Label>Number</Label>
        <Input
          type="tel"
          name="number"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />

        <Button type="Submit">Add contact</Button>
      </Form>
    </Formik>
  );
};
