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

  const testString = 'abababc';
  const now = Tone.now();
  // const runTone = async () => {
  //   await Tone.start();
  // };
  // runTone();

  const playNote = (note) => {
    synth.triggerAttackRelease(note, '8n');
  };

  const turnCharToNote = (e) => {
    setTypedString(e.target.value);
    const testChar = e.nativeEvent.data?.toUpperCase();
    playNote(noteData[testChar]);
  };

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

  const handleSave = async () => {
    try {
      await saveText(title, typedString);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <input onChange={(e) => setTitle(e.target.value)}></input>
      <textarea onChange={(e) => turnCharToNote(e)}></textarea>
      <button className="playButton" onClick={() => playString(testString.split(''))}>Click me!</button>
      <button className="saveButton" onClick={handleSave}>save your text</button>
    </div>
  );
}
