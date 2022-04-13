import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { noteData } from '../../noteData.js';
import { useTextContext } from '../../context/TextContext.js';

export default function TextForm() {
  const { typedString, title, setTitle, setTypedString } = useTextContext();
  const [instrument, setInstrument] = useState('Synth');
  const [synth, setSynth] = useState(new Tone.Synth().toDestination());
  // let synth = new Tone.Synth().toDestination();

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

  useEffect(() => {
    switch (instrument) {
      case 'Synth':
        setSynth(new Tone.Synth().toDestination());
        break;
      case 'FMSynth':
        setSynth(new Tone.FMSynth().toDestination());
        break;
      case 'AMSynth':
        setSynth(new Tone.AMSynth().toDestination());
        break;
      case 'MonoSynth':
        setSynth(new Tone.MonoSynth().toDestination());
        break;
      case 'DuoSynth':
        setSynth(new Tone.DuoSynth().toDestination());
        break;
    }
  }, [instrument]);

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
      <select onChange={(e) => setInstrument(e.target.value)}>
        <option value="Synth">Synth</option>
        <option value="FMSynth">FMSynth</option>
        <option value="AMSynth">AMSynth</option>
        <option value="DuoSynth">DuoSynth</option>
        <option value="MonoSynth">MonoSynth</option>
      </select>
      <button className="playButton" onClick={() => playString(typedString.split(''))}>
        Click me!
      </button>
    </div>
  );
}
