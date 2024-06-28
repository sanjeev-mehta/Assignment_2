import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAR, UPDATE_CAR, GET_PEOPLE } from '../../graphql/queries';

const CarForm = ({ car, personId, onCompleted }) => {
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [ownerId, setOwnerId] = useState('');

  const [addCar] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }],
    onCompleted,
  });

  const [updateCar] = useMutation(UPDATE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }],
    onCompleted,
  });

  const { data } = useQuery(GET_PEOPLE);

  useEffect(() => {
    if (car) {
      setYear(car.year);
      setMake(car.make);
      setModel(car.model);
      setPrice(car.price);
      setOwnerId(car.personId);
    } else {
      setYear('');
      setMake('');
      setModel('');
      setPrice('');
      setOwnerId(personId || '');
    }
  }, [car, personId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (car) {
      updateCar({ variables: { id: car.id, year: parseInt(year), make, model, price: parseFloat(price), personId: ownerId } });
    } else {
      addCar({ variables: { year: parseInt(year), make, model, price: parseFloat(price), personId: ownerId } });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label style={{ marginRight: '10px' }}>Year</label>
        <input 
          type="number" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
        />
      </div>
      <div>
        <label style={{ marginRight: '10px' }}>Make</label>
        <input 
          type="text" 
          value={make} 
          onChange={(e) => setMake(e.target.value)} 
        />
      </div>
      <div>
        <label style={{ marginRight: '10px' }}>Model</label>
        <input 
          type="text" 
          value={model} 
          onChange={(e) => setModel(e.target.value)} 
        />
      </div>
      <div>
        <label style={{ marginRight: '10px' }}>Price</label>
        <input 
          type="number" 
          step="0.01"
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
      </div>
      <div>
        <label style={{ marginRight: '10px' }}>Owner</label>
        <select 
          value={ownerId} 
          onChange={(e) => setOwnerId(e.target.value)}
        >
          <option value="">Select Owner</option>
          {data && data.people.map((person) => (
            <option key={person.id} value={person.id}>
              {person.firstName} {person.lastName}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" style={{ marginTop: '10px' }}>
        {car ? 'Update Car' : 'Add Car'}
      </button>
    </form>
  );
};

export default CarForm;
