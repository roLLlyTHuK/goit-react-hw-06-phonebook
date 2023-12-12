import { getContacts, getFilter } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { ListItem, Button, Span, NumberSpan } from './ContactList.styled';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  return (
    <ul>
      {(filter.length > 0
        ? contacts.filter(item =>
            item.name.toLowerCase().includes(filter.toLowerCase())
          )
        : contacts
      ).map(item => (
        <ListItem key={item.id}>
          <Span>{item.name}: </Span>
          <NumberSpan>{item.number}</NumberSpan>

          <Button onClick={() => dispatch(deleteContact(item.id))}>
            Delete
          </Button>
        </ListItem>
      ))}
    </ul>
  );
};
