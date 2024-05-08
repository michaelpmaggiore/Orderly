import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddClass.css';

const AddClass = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [class_name, setClassName] = useState('');
  const [class_code, setClassCode] = useState('');
  const [crn, setCrn] = useState('');
  const [instructor, setInstructor] = useState('');
  const [time, setTime] = useState('');
  const [days, setDays] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });

  const handleGoBack = () => {
    navigate(`/schedule/${userId}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://localhost:3001/schedule/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, class_name, class_code, crn, instructor, time, days }),
    })
    .then(response => response.json())
    .then(data => {
      if (data._id) {
        alert('Class added successfully');
        navigate(`/schedule/${userId}`);
      } else {
        alert('Failed to add class');
      }
    });
  };

  return (
    <div className="page-container">
      <button className="back-button" onClick={handleGoBack}>Back</button>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Add Class</h1>
        <label className="form-label">
          Class Name:
          <input className="form-input" type="text" value={class_name} onChange={e => setClassName(e.target.value)} />
        </label>
        <label className="form-label">
          Class Code:
          <input className="form-input" type="text" value={class_code} onChange={e => setClassCode(e.target.value)} />
        </label>
        <label className="form-label">
          CRN:
          <input className="form-input" type="text" value={crn} onChange={e => setCrn(e.target.value)} />
        </label>
        <label className="form-label">
          Instructor:
          <input className="form-input" type="text" value={instructor} onChange={e => setInstructor(e.target.value)} />
        </label>
        <label className="form-label">
          Time:
          <input className="form-input" type="text" value={time} onChange={e => setTime(e.target.value)} />
        </label>
        <label className="checkbox-container form-label">
          Days:
          <div>
            <label className="checkbox-label">
              <input type="checkbox" checked={days.mon} onChange={e => setDays({...days, mon: e.target.checked})} />
              Monday
            </label>
            <label className="checkbox-label">
              <input type="checkbox" checked={days.tue} onChange={e => setDays({...days, tue: e.target.checked})} />
              Tuesday
            </label>
            <label className="checkbox-label">
              <input type="checkbox" checked={days.wed} onChange={e => setDays({...days, wed: e.target.checked})} />
              Wednesday
            </label>
            <label className="checkbox-label">
              <input type="checkbox" checked={days.thu} onChange={e => setDays({...days, thu: e.target.checked})} />
              Thursday
            </label>
            <label className="checkbox-label">
              <input type="checkbox" checked={days.fri} onChange={e => setDays({...days, fri: e.target.checked})} />
              Friday
            </label>
          </div>
        </label>
        <button className="submit-button" type="submit">Add Class</button>
      </form>
      </div>
    </div>
  );
};

export default AddClass;