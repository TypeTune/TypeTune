import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchTextsById, updateTextById } from '../services/usersaves';
import { useUserContext } from '../context/UserContext';
import TextForm from '../Components/TextForm/TextForm.js';
import { useTextContext } from '../context/TextContext';

export default function Edit() {
  const { id } = useParams();
  const { setId, typedString, title, error } = useTextContext();

  useEffect(() => {
    setId(id);
  }, [id, setId]);
  
  const handleUpdate = async () => {
    await updateTextById(id, title, typedString);
  };

  return (
    <div>
      Edit
      {error && <p>{error}</p>}
      <TextForm />
      <button onClick={handleUpdate}>update your text</button>
    </div>
  );
}
