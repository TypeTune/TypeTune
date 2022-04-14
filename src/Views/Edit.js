import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { updateTextById } from '../services/usersaves';
import TextForm from '../Components/TextForm/TextForm.js';
import { useTextContext } from '../context/TextContext';
import { useHistory } from 'react-router-dom';
import { deleteFile } from '../services/usersaves';
import './Home.css';

export default function Edit() {
  const { id } = useParams();
  const { setId, typedString, title, error, instrument } = useTextContext();
  const history = useHistory();

  useEffect(() => {
    setId(id);
  }, [id, setId]);

  const handleUpdate = async () => {
    await updateTextById(id, title, typedString, instrument);
    history.push('/profile');
  };

  const handleDelete = async () => {
    await deleteFile(id);
    history.push('/profile');
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <div className="formContainer">
        <TextForm handleDelete={handleDelete} handleUpdate={handleUpdate} />
      </div>
    </div>
  );
}
