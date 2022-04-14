import React, { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { noteData } from '../../noteData.js';
import { useTextContext } from '../../context/TextContext.js';
import { useUserContext } from '../../context/UserContext.js';
import './TextForm.css';

export default function TextForm({ handleRedirect, handleSave, handleDelete, handleUpdate }) {
  const { typedString, title, setTitle, setTypedString, instrument, setInstrument, id } =
    useTextContext();
  const { currentUser } = useUserContext();
  let letterCount = 0;
  // const [instrument, setInstrument] = useState('Synth');
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
      case 'AlexSynth':
        setSynth(
          new Tone.MonoSynth({
            volume: -8,
            detune: 10,
            portamento: 0.1,
            envelope: {
              attack: 0.25,
              attackCurve: 'linear',
              decay: 0.73,
              decayCurve: 'exponential',
              release: 0.8,
              releaseCurve: 'exponential',
              sustain: 0.4,
            },
            filter: {
              Q: 1,
              detune: 0,
              frequency: 0,
              gain: 0,
              rolloff: -12,
              type: 'lowpass',
            },
            filterEnvelope: {
              attack: 0.101,
              attackCurve: 'linear',
              decay: 0.27,
              decayCurve: 'exponential',
              release: 0.28,
              releaseCurve: 'exponential',
              sustain: 0.71,
              baseFrequency: 300,
              exponent: 3,
              octaves: 4,
            },
            oscillator: {
              detune: 10,
              frequency: 440,
              partialCount: 8,
              partials: [
                1.2732395447351628, 0, 0.4244131815783876, 0, 0.25464790894703254, 0,
                0.18189136353359467, 0,
              ],
              phase: 0,
              type: 'square8',
            },
          }).toDestination()
        );
        break;
    }
  }, [instrument]);

  //converts string to note array and plays as sequence
  const playString = async (str) => {
    const words = str.split(' ');
    const noteArray = [];
    words.map((word) => {
      const letters = word.split('');
      const notes = letters.map((letter) => {
        letterCount++;
        return noteData[letter.toUpperCase()];
      });
      noteArray.push(notes);
    });

    let counter = 0;
    const sequence = new Tone.Sequence(
      (time, note) => {
        synth.triggerAttackRelease(note, 0.5, time);
        counter++;
        if (counter === letterCount) {
          sequence.stop();
          Tone.Transport.stop();
          letterCount = 0;
        }
      },
      noteArray,
      '2n'
    ).start(0);
    await Tone.start();
    await Tone.Transport.start();
  };

  return (
    <div className="selectAndText">
      <select value={instrument} onChange={(e) => setInstrument(e.target.value)}>
        <option value="Synth">Synth</option>
        <option value="FMSynth">FMSynth</option>
        <option value="AMSynth">AMSynth</option>
        <option value="DuoSynth">DuoSynth</option>
        <option value="MonoSynth">MonoSynth</option>
        <option value="AlexSynth">AlexSynth</option>
      </select>
      <div className="form">
        <input
          value={title}
          placeholder="Title your composition"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <textarea
          value={typedString}
          placeholder="Type your masterpiece here"
          onChange={(e) => turnCharToNote(e)}
        ></textarea>
        <div className="buttons">
          <button className="playButton" onClick={() => playString(typedString)}>
            Playback
          </button>
          {id ? (
            <>
              <button className="deleteButton" onClick={handleDelete}>
                Delete
              </button>
              <button onClick={handleUpdate}>Update</button>
            </>
          ) : (
            <>
              {currentUser ? (
                <button className="saveButton" onClick={handleSave}>
                  Save
                </button>
              ) : (
                <button className="inactiveSaveButton" onClick={handleRedirect}>
                  Sign in to save
                </button>
              )}
            </>
          )}
        </div>
      </div>
      <div className="placeholder"></div>
    </div>
  );
}
