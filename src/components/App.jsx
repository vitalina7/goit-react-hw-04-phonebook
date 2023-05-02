import React, { useState, useEffect } from 'react';
import { Phonebook } from './Phonebook';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { Title, Container } from './Phonebook.styled';

export const App = () => {
  const getInitialsContacts = () => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      return JSON.parse(savedContacts);
    }
    return [];
  };

  const [contacts, setContacts] = useState(getInitialsContacts());
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addToContact = (newContact) => {
    const { name, number } = newContact;
    if (contacts.find((contact) => contact.name === name || contact.number === number)) {
      alert(`${name} is already in your contacts`);
    } else {
      setContacts(prevState => [...prevState, newContact]);
    }
  };

  const onDeleteContact = (contactId) => {
    const deleteContacts = contacts.filter((contact) => contact.id !== contactId)
    setContacts(deleteContacts);
  };

  const filterContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.currentTarget.value);
  };

  return (
    <Container>
      <Title>Phonebook</Title>
      <Phonebook addToContact={addToContact} />
      <Title Title>Contacts</Title>
      <Filter filter={filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filterContacts()}
        deleteContact={onDeleteContact}
      />
    </Container>
  );
};
