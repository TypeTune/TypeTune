import React from 'react';
import * as Tone from 'tone';
import { noteData } from '../../noteData.js';
import { useTextContext } from '../../context/TextContext.js';

export default function TextForm() {
  const { typedString, title, setTitle, setTypedString } = useTextContext();
  const synth = new Tone.Synth().toDestination();
    
  //creates an instance of synthesizer and plays note
  const playNote = (note) => {
    synth.triggerAttackRelease(note, '8n');
  };

  //converts character value to note value then plays note
  const turnCharToNote = (e) => {
    setTypedString(e.target.value);
    const testChar = e.nativeEvent.data?.toUpperCase();
    setTimeout(playNote(noteData[testChar]), 1000);
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

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <textarea value={typedString} onChange={(e) => turnCharToNote(e)}></textarea>
      <button className="playButton" onClick={() => playString(typedString.split(''))}>
        Click me!
      </button>
    </div>
  );
}
