import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './EventForm.css'

const EventForm = ({ event, date, onSave, onDelete, onClose }) => {
  console.log(`eventForm input - event=${event}`);
  console.log(`eventForm input - date=${date}`);
  const [title, setTitle] = useState(event ? event.title : '');
  const [startTime, setStartTime] = useState(event ? event.startTime : date);
  const [endTime, setEndTime] = useState(event ? event.endTime : date);
  const [location, setLocation] = useState(event ? event.location : '');
  const [description, setDescription] = useState(event ? event.description : '');
  console.log(`eventForm input - startTime=${startTime}`);
  console.log(`eventForm input - endTime=${endTime}`);
  const handleSave = () => {
    const eventData = {
      ...event,
      title,
      startTime,
      endTime,
      location,
      description,
    };
    onSave(eventData);
  };

  // useEffect(() => {
  //   // If an event is passed in, pre-populate the form with its data
  //   if (event) {
  //     setEventData({
  //       ...eventData,
  //       title: event.title,
  //       startTime: event.startTime,
  //       endTime: event.endTime,
  //       people: event.people,
  //       description: event.description,
  //       location: event.location,
  //     });
  //   } else {
  //     // Reset form for a new event
  //     setEventData({
  //       title: '',
  //       startTime: format(date, 'yyyy-MM-dd'),
  //       endTime: format(date, 'yyyy-MM-dd'),
  //       people: '',
  //       description: '',
  //       location: '',
  //     });
  //   }
  // }, [event, date]);

  // Handle input changes
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEventData({ ...eventData, [name]: value });
  // };

  // Render form fields, buttons, and handle submission here
  // ...

  return (
    <div className="event-form">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="start-time">Start time</label>
        <input type="datetime-local" id="start-time" value={startTime} onChange={e => setStartTime(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="end-time">End time</label>
        <input type="datetime-local" id="end-time" value={endTime} onChange={e => setEndTime(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
      </div>
      <div className="form-actions">
        <button onClick={handleSave}>Save</button>
        {event && <button onClick={() => onDelete(event.id)}>Delete</button>}
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EventForm;
