import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { deleteFile, fetchTitles } from '../services/usersaves';
import './Profile.css';

export default function Profile() {
  const [error, setError] = useState('');
  const [savedFiles, setSavedFiles] = useState([]);
  const { currentUser } = useUserContext();
  useEffect(() => {
    try {
      const fetchData = async () => {
        const data = await fetchTitles();
        setSavedFiles(data);
      };
      fetchData();
    } catch (e) {
      setError(e.message);
    }
  }, []);

  const handleDelete = async (id) => {
    await deleteFile(id);
    const updated = await fetchTitles();
    setSavedFiles(updated);
  };

  return (
    <div className='profileContainer'>
      {error && <p>{error}</p>}
      <h2>WELCOME {currentUser.split('@')[0].toUpperCase()}!</h2>
      {savedFiles.map((file) => (
        <div key={file.id} className="savedFile">
          <Link to={`/edit/${file.id}`}>
            <h3>{file.title}</h3>
          </Link>
          <button onClick={() => handleDelete(file.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
