import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_PERSON, UPDATE_PERSON, GET_PEOPLE } from '../../graphql/queries';

const PersonForm = ({ person, onCompleted }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [addPerson] = useMutation(ADD_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }],
    onCompleted,
  });

  const [updatePerson] = useMutation(UPDATE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }],
    onCompleted,
  });

  useEffect(() => {
    if (person) {
      setFirstName(person.firstName);
      setLastName(person.lastName);
    } else {
      setFirstName('');
      setLastName('');
    }
  }, [person]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (person) {
      updatePerson({ variables: { id: person.id, firstName, lastName } });
    } else {
      addPerson({ variables: { firstName, lastName } });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={{marginRight: "10px"}}>First Name</label>
        <input 
          type="text" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
        />
      </div>
      <div>
        <label style={{marginRight: "10px"}}>Last Name</label>
        <input 
          type="text" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
        />
      </div>
      <button type="submit" style={{marginTop: "10px"}}>
        {person ? 'Update Person' : 'Add Person'}
      </button>
    </form>
  );
};

export default PersonForm;
