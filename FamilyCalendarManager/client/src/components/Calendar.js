import React, { useState, useEffect } from 'react';
import './Calendar.css';
import EventForm from './EventForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, addMonths } from 'date-fns';
import axios from 'axios';

const Calendar = () => {
  const [userName, setUserName] = useState('John Doe');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [events, setEvents] = useState({});
  const defaultEmptySlots = 4; // Default number of empty slots if no events

  const eventServiceBaseUrl = "http://localhost:8000/api/events";
  const userServiceBaseUrl = "http://localhost:8000/api/users";

  // load events data
  useEffect(() => {
    const loadData = async () => {
      console.log('Start updating event');
      try {
        const response = await axios.get(`${eventServiceBaseUrl}/661bbd7a9476172cd083029c`);
        const result = response.data;
        console.log(`result=${JSON.stringify(result)}`);

        const formattedData = result.reduce((acc, event) => {
          const dateKey = format(new Date(event.startTime), 'yyyy-MM-dd'); // Make sure the date is a Date object
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push({
            id: event._id, // Changed to id from _id for consistency with your state
            title: event.title,
            startTime: event.startTime,
            endTime: event.endTime,
            description: event.description,
            location: event.location,
            user: event.user
          });
          return acc;
        }, {});
        console.log(formattedData);
        setEvents(formattedData); // Update the state with the loaded data
      } catch (error) {
        console.log(error);
      }
    };

    loadData();
  }, []);

  const handleSignOut = () => {
    // Sign out logic here
    console.log('User signed out');
    // Redirect to home page, or update state to show signed out status
  };

  // get events for a specific day
  const getDayEvents = (day) => {
    return events[format(day, 'yyyy-MM-dd')] || [];
  };

  // Determine the number of slots needed for each day cell
  const calculateSlotsForEachDay = (startDate, endDate) => {
    let maxEventsInWeek = 0;
    let day = startDate;

    while (day <= endDate) {
      const dayEvents = getDayEvents(day);
      maxEventsInWeek = Math.max(dayEvents.length, maxEventsInWeek);
      day = addDays(day, 1);
    }

    return Math.max(maxEventsInWeek + 2, defaultEmptySlots);
  };

  // Generate slots for each day cell
  const generateDaySlots = (day, maxSlots) => {
    const dayEvents = getDayEvents(day);
    const slots = [...dayEvents];

    // Fill the remaining slots with empty ones
    while (slots.length < maxSlots) {
      slots.push(<div className="event-slot empty" key={`empty-${slots.length}`} onClick={() => onSlotClick({}, day)}> </div>);
    }

    return slots.map((event, index) => (
      <div className="event-slot" key={event.id || index} onClick={() => onSlotClick(event, day)}>
        {event.title || ' '}
      </div>
    ));
  };

  // when a slot is clicked, if event is empty, create new event; otherwise, update/delete existing event
  const onSlotClick = (event, day) => {
    setSelectedDate(format(day, 'yyyy-MM-dd') + "T12:00");
    setSelectedEvent(event.id ? event : null); // If the event has an ID, it's an existing event
    setIsEventFormOpen(true); // Open the event form
  };


  const handleEventSave = async (eventData) => {
    console.log('handleEventSave');
    eventData.user = "661bbd7a9476172cd083029c";
    if (eventData.id) {
      // Update existing event
      const updatedEvents =
      {
        ...events,
        [format(eventData.startTime, 'yyyy-MM-dd')]: events[format(eventData.startTime, 'yyyy-MM-dd')].map(event =>
          event.id === eventData.id ? eventData : event
        ),
      };
      setEvents(updatedEvents);

      console.log('Start updating event');
      await axios.post(eventServiceBaseUrl, eventData)
        .then(response => console.log(response.data))
        .catch(error => console.log(error));

    } else {
      // Add new event
      // const newId = Date.now(); // Temporary ID assignment, replace with server-generated ID
      const newEvent = { ...eventData, id: null};
      const dateKey = format(eventData.startTime, 'yyyy-MM-dd');
      const updatedEvents = {
        ...events,
        [dateKey]: [...(events[dateKey] || []), newEvent],
      };
      setEvents(updatedEvents);
      console.log('Start inserting event');
      await axios.post(eventServiceBaseUrl, eventData)
        .then(response => {console.log(response.data); newEvent._id = response.data._id;})
        .catch(error => console.log(error));
    }
    setIsEventFormOpen(false); // Close the event form
  };

  const handleEventDelete = async (eventId, date) => {
    // Filter out the event to delete
    console.log('handle delete');
    const dateKey = format(date, 'yyyy-MM-dd');
    const updatedEvents = {
      ...events,
      [dateKey]: events[dateKey].filter(event => event.id !== eventId),
    };
    setEvents(updatedEvents);
    // TODO: make DELETE request to the server to delete the event
    setIsEventFormOpen(false); // Close the event form
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    console.log('clicked');
    setCurrentMonth(addMonths(currentMonth, -1));
  };

  const renderHeader = () => {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start" >
          <FontAwesomeIcon icon={faChevronLeft} onClick={prevMonth} />
        </div>
        <div className="col col-center">
          <span>{format(currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextMonth}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    );
  };

  // show the day of the week
  const renderDays = () => {
    const dateFormat = "iii";
    const days = [];

    let startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    // Calculate slots for each week
    const slotsPerDay = calculateSlotsForEachDay(startDate, endDate);

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const cellSlots = generateDaySlots(cloneDay, slotsPerDay);
        days.push(
          <div className={`col cell ${!isSameMonth(day, monthStart) ? 'disabled' : isSameDay(day, new Date()) ? 'selected' : ''}`} key={day}>
            <span className="number">{format(day, 'd')}</span>
            <div className="event-slots">
              {cellSlots}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };


  return (
    <div className="app-container">
      <div className="calendar-header">
        {/* ... other header elements ... */}
        <div className="user-info">
          <span>{userName}</span>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
      <div className="calendar-container">
        <div className="calendar">
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
        {isEventFormOpen && (
          <EventForm
            date={selectedDate}
            event={selectedEvent}
            onClose={() => setIsEventFormOpen(false)}
            onSave={handleEventSave}
            onDelete={handleEventDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Calendar;