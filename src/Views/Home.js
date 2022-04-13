import React, { useState } from 'react';
import { saveText } from '../services/usersaves';
import { useHistory } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import TextForm from '../Components/TextForm/TextForm';

export default function Home() {
  const { title, typedString } = useUserContext();
  // const [title, setTitle] = useState('');
  // const [typedString, setTypedString] = useState('');
  const [error, setError] = useState('');
  // const synth = new Tone.Synth().toDestination();
  const history = useHistory();

  //creates an instance of synthesizer and plays note
  // const playNote = (note) => {
  //   synth.triggerAttackRelease(note, '8n');
  // };

  //converts character value to note value then plays note
  // const turnCharToNote = (e) => {
  //   setTypedString(e.target.value);
  //   const testChar = e.nativeEvent.data?.toUpperCase();
  //   setTimeout(playNote(noteData[testChar]), 1000);
  // };

  //converts string to note array and plays as sequence
  // const playString = async (str) => {
  //   const noteArray = str.map((char) => {
  //     return noteData[char.toUpperCase()];
  //   });
  //   let counter = 0;
  //   const sequence = new Tone.Sequence((time, note) => {
  //     synth.triggerAttackRelease(note, 1.5, time);
  //     counter++;
  //     if (counter === noteArray.length) {
  //       sequence.stop();
  //       Tone.Transport.stop();
  //     }
  //   }, noteArray).start(0);
  //   await Tone.start();
  //   await Tone.Transport.start();
  // };

  //saves text to supabase
  const handleSave = async () => {
    if (title.length > 0 && typedString.length > 0) {
      try {
        await saveText(title, typedString);
        history.push('/profile');
      } catch (e) {
        setError(e.message);
        setTimeout(() => {
          setError('');
        }, 2000);
      }
    } else {
      setError(`You're missing something...`);
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  return (
    <div>
      {error && <p className="errorMessage">{error}</p>}
      {/* <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <textarea value={typedString} onChange={(e) => turnCharToNote(e)}></textarea>
      <button className="playButton" onClick={() => playString(typedString.split(''))}>
        Click me!
      </button> */}
      <TextForm />
      <button className="saveButton" onClick={handleSave}>
        save your text
      </button>
    </div>
  );
}
