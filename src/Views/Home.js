import React from 'react';
import * as Tone from 'tone';

export default function Home() {
  const synth = new Tone.Synth().toDestination();
  let counter = 0;
  const noteData = {
    'A': 'A4',
    'B': 'B4',
    'C': 'C5',
  };

  const testString = 'abc';
  const now = Tone.now();
  const playNote = (note) => {

    synth.triggerAttackRelease(note, '8n', now + counter);

    counter++;
  };
  const turnCharToNote = (char) => {
    const testChar = char.toUpperCase();
    playNote(noteData[testChar]);

  };

  const playString = (str) => {

    // console.log(str, 'in playstring');
    str.map((char) => {
      setTimeout(() => {
        turnCharToNote(char);
      }, 1000);
      // const note = turnCharToNote(char);
      // playNote(note);
    });
  };




  return <div>
    <textarea onChange={playNote}>

    </textarea>
    <button onClick={() => playString(testString.split(''))}>Click me!</button>
  </div>;
}
