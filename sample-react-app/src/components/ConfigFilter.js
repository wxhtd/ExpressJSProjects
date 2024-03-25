import React, { useState, useEffect } from 'react';
import axios from 'axios'

export const ConfigFilter = ({ criteria }) => {
    const [config, setConfig] = useState(null);

    const fetchConfigService = async (criteria) => {
        try {
            const response = await axios.post('https://localhost:8000/api/filter-config', { filter:[criteria] })
            const configData = response.data
            if(configData !== undefined && configData.length > 0)
            {
                console.log(configData)
                return configData[0]
            }
            return ''
        } catch (error) {
            console.error(error)
            return 'Error fetching the JSON file'
        }
    };

    useEffect(() => {
        const fetchConfig = async () => {
            // Assuming you have a function fetchConfigService(criteria) that fetches the config
            const result = await fetchConfigService(criteria);
            setConfig(result);
        };

        if (criteria) {
            fetchConfig();
        }
    }, [criteria]);

    return (
        <div>
            {config ? (
                <div>
                    <h2>Configuration Result:</h2>
                    <p>{config}</p>
                </div>
            ) : (
                <p>No configuration found or loading...</p>
            )}
        </div>
    );
}
