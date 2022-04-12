import React, { useState } from 'react';
import { saveText } from '../services/usersaves';
import * as Tone from 'tone';

export default function Home() {
  const [title, setTitle] = useState('');
  const [typedString, setTypedString] = useState('');
  const [error, setError] = useState('');
  const synth = new Tone.Synth().toDestination();

  const noteData = {
    A: 'A4',
    B: 'B4',
    C: 'C5',
  };

  //creates an instance of synthesizer and plays note
  const playNote = (note) => {
    synth.triggerAttackRelease(note, '8n');
  };

  //converts character value to note value
  const turnCharToNote = (e) => {
    setTypedString(e.target.value);
    const testChar = e.nativeEvent.data?.toUpperCase();
    playNote(noteData[testChar]);
  };

  //converts string to note array and plays as sequence
  const playString = async (str) => {
    const noteArray = str.map((char) => {
      return noteData[char.toUpperCase()];
    });
    let counter = 0;
    const sequence = new Tone.Sequence((time, note) => {
      synth.triggerAttackRelease(note, 1.5, time);
      counter++;
      if (counter === noteArray.length) {
        sequence.stop();
        Tone.Transport.stop();
      }
    }, noteArray).start(0);
    await Tone.start();
    await Tone.Transport.start();
  };

  //saves text to supabase
  const handleSave = async () => {
    if (title.length > 0 && typedString.length > 0) {
      try {
        await saveText(title, typedString);
      } catch (e) {
        setError(e.message);
        setTimeout(() => { setError(''); }, 2000);
      }
    } else {
      setError(`You're missing something...`);
      setTimeout(() => { setError(''); }, 2000);
    }
  };

  return (
    <div>
      {error && <p className='errorMessage'>{error}</p>}
      <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <textarea value={typedString} onChange={(e) => turnCharToNote(e)}></textarea>
      <button className="playButton" onClick={() => playString(typedString.split(''))}>Click me!</button>
      <button className="saveButton" onClick={handleSave}>save your text</button>
    </div>
  );
}

