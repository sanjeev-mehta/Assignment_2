import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { DELETE_PERSON, GET_PEOPLE } from '../../graphql/queries';
import CarItem from './CarItem';
import { Card } from 'antd';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import PersonForm from '../forms/PersonForm';

const PersonItem = ({ person }) => {
  const [editMode, setEditMode] = useState(false);

  const [deletePerson] = useMutation(DELETE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const handleDelete = () => {
    deletePerson({ variables: { id: person.id } });
  };

  const handleEditCompleted = () => {
    setEditMode(false);
  };

  const DeleteButton = ({ onClick }) => (
    <Button type="danger" icon={<DeleteOutlined />} onClick={onClick}>
    </Button>
  );

  const EditButton = ({ onClick }) => (
    <Button type="primary" icon={<EditOutlined />} onClick={onClick}>
    </Button>
  );

  return (
    <>
    <Card style={{backgroundColor:"#00bda5"}} title={`${person.firstName} ${person.lastName}`}>
      {editMode ? (
        <PersonForm person={person} onCompleted={handleEditCompleted} />
      ) : (
        <div className="buttons">
          <EditButton onClick={() => setEditMode(true)} />
          <DeleteButton onClick={handleDelete} />
          <Link to={`/people/${person.id}`}>LEARN MORE</Link>
        </div>
      )}
      <Card> <div>
    {person.cars.map((car) => (
      <CarItem key={car.id} car={car} />
    ))}
  </div></Card>
    </Card>
    
  </>
  );
};

export default PersonItem;
