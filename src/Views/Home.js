import React, { useState } from 'react';
import * as Tone from 'tone';

export default function Home() {
  // const [typedString, setTypedString] = useState('');
  const [playButton, setPlayButton] = useState(false);
  const synth = new Tone.Synth().toDestination();

  let counter = 0;
  const noteData = {
    'A': 'A4',
    'B': 'B4',
    'C': 'C5',
  };

  const testString = 'abc';
  const now = Tone.now();
  // const runTone = async () => {
  //   await Tone.start();
  // };
  // runTone();

  const playNote = (note) => {
    playButton ? synth.triggerAttackRelease(note, '8n', now + counter) : synth.triggerAttackRelease(note, '8n');
    counter++;
  };

  const turnCharToNote = (char) => {
    const testChar = char.toUpperCase();
    playNote(noteData[testChar]);
  };

  const playString = (str) => {
    setPlayButton(true);
    setTimeout(() => {
      str.map((char) => {
        turnCharToNote(char);
      });
    }, 1000);
  };




  return <div>
    <textarea onChange={(e) => turnCharToNote(e.nativeEvent.data)}></textarea>
    <button onClick={() => playString(testString.split(''))}>Click me!</button>
  </div>;
}
