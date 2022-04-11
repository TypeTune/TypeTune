import React from 'react';
import * as Tone from 'tone';

export default function Home() {
  const synth = new Tone.Synth().toDestination();

  const noteData = {
    A: 'A4',
    S: 'B4',
    D: 'C4',
  };

  const testString = 'abc';

  const turnCharToNote = (char) => {
    const testChar = char.toUpperCase();
    console.log(noteData.testChar);
  };

  const playString = (str) => {
    // console.log(str, 'in playstring');
    str.map((char) => {
      turnCharToNote(char);
      // const note = turnCharToNote(char);
      // playNote(note);
    });
  };

  playString(testString.split(''));

  const playNote = () => {
    synth.triggerAttackRelease('C4', '8n');
  };
  return <div>
    <textarea onChange={playNote}>
    
    </textarea>
  </div>;
}
