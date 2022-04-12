import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTitles } from '../services/usersaves';

export default function Profile() {
  const [error, setError] = useState('');
  const [savedFiles, setSavedFiles] = useState([]);

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

  // console.log(savedFiles);

  return (
    <div>
      {/* list of titles; links to edit:id pages*/}
      {savedFiles.map((file) => (
        <Link key={file.id} to={`/edit:${file.id}`} >
          <h3 >{file.title}</h3>
        </Link>

      ))}
    </div>
  );
}
