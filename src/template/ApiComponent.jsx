import React, { useState, useEffect } from 'react';
//import axios from 'axios';

function ApiComponent() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    fetch('https://one0-forest-of-study-team2-be.onrender.com/api/studies')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(error => {
        setError(error);
        console.error("API Response Error:", error);
      });
  }, []); // Empty array ensures the component only runs when it mounts. 

  if (error) {
    console.log(`API Response Error: ${error.message}`);
  }

  if (!data) {
    console.log('No data found...');
  }

  console.log(data);
  return data;
}

export default ApiComponent;