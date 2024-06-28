import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_CAR, GET_PEOPLE } from '../../graphql/queries';
import { Card } from 'antd';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { EditOutlined } from '@ant-design/icons';
import CarForm from '../forms/CarForm';

const CarItem = ({ car }) => {
  const [editMode, setEditMode] = useState(false);

  const [deleteCar] = useMutation(DELETE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  const handleDelete = () => {
    deleteCar({ variables: { id: car.id } });
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
    <Card type="inner" style={{backgroundColor: "aqua"}} title={`${car.year} ${car.make} ${car.model}`}>
      {editMode ? (
        <CarForm car={car} onCompleted={handleEditCompleted} />
      ) : (
        <div>
          <EditButton onClick={() => setEditMode(true)} />
          <DeleteButton onClick={handleDelete} />
        </div>
      )}
      <p>Price: ${car.price.toFixed(2)}</p>
    </Card>
  );
};

export default CarItem;
