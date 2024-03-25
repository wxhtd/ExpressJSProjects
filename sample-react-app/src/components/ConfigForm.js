import React, { useState, useEffect } from 'react'
import {ConfigFilter} from './ConfigFilter';

export const ConfigForm = () => {
    const [userFilters, setUserFilters] = useState('');
    const [submit, setSubmit] = useState(false);

    const handleInputChange = (e) => {
        console.log(e.target);
        setUserFilters(e.target.value);
        if (submit) setSubmit(false); // Reset submission state on input change
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from causing a page reload
        setSubmit(true);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userFilters}
                    onChange={handleInputChange}
                    placeholder="Enter filter criteria"
                />
                <button type="submit">Get Config</button>
            </form>
            {submit && <ConfigFilter criteria={userFilters} />}
        </div>
    );
}