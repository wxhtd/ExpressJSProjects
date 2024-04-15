import React, { useState } from 'react';
import './ProfileForm.css';
import axios from 'axios';
import Calendar from './Calendar';

const userServiceUrl = "http://localhost:8000/api/users";

const ProfileForm = ({ userId, propName, propEmail, propPeople }) => {
    console.log(`userId=${userId}`);
    const [name, setName] = useState(propName);
    const [email, setEmail] = useState(propEmail);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [people, setPeople] = useState(propPeople || []);
    const [showAddPerson, setShowAddPerson] = useState(false);
    const [personName, setPersonName] = useState('');
    const [eventColor, setEventColor] = useState('#000000');
    const [updateResult, setUpdateResult] = useState('');
    const [toCalender, setToCalender] = useState(false);

    const handleAddPerson = () => {
        setPeople([...people, { name: personName, color: eventColor }]);
        setPersonName('');
        setEventColor('#000000');
        setShowAddPerson(false);
    };

    // Replace the following functions with actual logic
    const handleUpdateProfile = async () => {
        setUpdateResult('');
        try {
            console.log('handle sign in');
            const response = await axios.post(`${userServiceUrl}`,
                {
                    _id: userId,
                    name: name,
                    Email: email,
                    people: people
                });
            const result = response.data;
            console.log(`result=${JSON.stringify(result)}`);
            if (result.isSuccess) {
                setUpdateResult('User info updated!');
            }
            else {
                console.log('error1');
                setUpdateResult(result.message);
            }
        } catch (error) {
            console.log('error2');
            console.log(error);
            setUpdateResult(error);
        }
    };

    const handleDeleteAccount = () => {
        // Delete account logic
    };

    const handleNavigateToCalendar = () => {
        // Navigate to calendar logic
    };

    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    };

    const handleEmailChange = (e) => {
        setInvalidEmail(false);
        if (e.target.value === '' || validateEmail(e.target.value)) {
            setEmail(e.target.value);
        } else {
            setInvalidEmail(true);
        }
    };

    return (
        <div className="profile-form-container">
            {!toCalender && (
             <div className="profile-form-sub-container">
            <h2>Welcome back, {propName}!</h2>
            <div className="profile-form">
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <label>Email</label>
                <input type="email" value={email} onChange={handleEmailChange} required />
                {invalidEmail && <div className="error-message">invalid Email</div>}
                <label>People</label>
                <div className="people-list">
                    {people.map((person, index) => (
                        <span key={index} className="person-bubble" style={{ backgroundColor: person.color }}>
                            {person.name}
                        </span>
                    ))}
                    <button className="add-person-button" onClick={() => setShowAddPerson(!showAddPerson)}>+</button>
                </div>

                {showAddPerson && (
                    <>
                        <label>Name</label>
                        <input type="text" value={personName} onChange={(e) => setPersonName(e.target.value)} />

                        <label>Event Color</label>
                        <input type="text" pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                            value={eventColor} onChange={(e) => setEventColor(e.target.value)} placeholder="#000000" />
                        <input type="color" value={eventColor} onChange={(e) => setEventColor(e.target.value)} />

                        <div className="form-buttons">
                            <button onClick={handleAddPerson}>Add</button>
                            <button onClick={() => setShowAddPerson(false)}>Cancel</button>
                        </div>
                    </>
                )}

                {updateResult && <div className="error-message">{updateResult}</div>}
                <div className="form-buttons">
                    <button onClick={()=>setToCalender(true)}>Calendar</button>
                    <button onClick={handleUpdateProfile}>Update</button>
                    <button onClick={handleDeleteAccount}>Delete Account</button>
                </div>
            </div>
            </div>)}
            {toCalender && <Calendar name={name} userId={userId}/>}
        </div>
    );
};

export default ProfileForm;
