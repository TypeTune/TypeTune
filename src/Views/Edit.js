import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { updateTextById } from '../services/usersaves';
import TextForm from '../Components/TextForm/TextForm.js';
import { useTextContext } from '../context/TextContext';
import { useHistory } from 'react-router-dom';
import { deleteFile } from '../services/usersaves';

export default function Edit() {
  const { id } = useParams();
  const { setId, typedString, title, error, instrument } = useTextContext();
  const history = useHistory();
  // const [loading, setLoading] = useState(true);

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
      Edit
      {error && <p>{error}</p>}
      <TextForm handleDelete={handleDelete} handleUpdate={handleUpdate}/>
      {/* <button onClick={handleDelete}>Delete</button>
      <button onClick={handleUpdate}>update your text</button> */}
    </div>
  );
}
