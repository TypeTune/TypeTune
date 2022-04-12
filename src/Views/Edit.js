import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchTextsById } from '../services/usersaves';

export default function Edit() {
  const params = useParams().id;
  const [savedData, setSavedData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      fetchTextsById(params).then((data) => setSavedData(data));
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (e) {
      setError(e.message);
    }
  }, [params]);

  console.log(savedData);

  return (
    <div>
      Edit
      {error && <p>{error}</p>}
      {loading && <p>Loading...</p>}
    </div>
  );
}
