import React from 'react';
import './FormsPage.css';
import PersonForm from '../forms/PersonForm';
import CarForm from '../forms/CarForm';
import PersonList from '../lists/PeopleList';

const FormsPage = () => {
  return (
    <div className="forms-page">
      <h2>Add Data</h2>
      <div className="forms-container">
        <div>
          <PersonForm />
        </div>
        <div>
          <CarForm />
        </div>
      </div>
      <div className="records-section">
        <h2>Records</h2>
        <PersonList />
      </div>
    </div>
  );
};

export default FormsPage;
