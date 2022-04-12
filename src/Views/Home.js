import React from 'react';
import * as Tone from 'tone';

export default function Home() {
  // const [typedString, setTypedString] = useState('');
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

  console.log(Tone.context, '4');
  const turnCharToNote = (char) => {
    const testChar = char?.toUpperCase();
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

  return (
    <div>
      <textarea onChange={(e) => turnCharToNote(e.nativeEvent.data)}></textarea>
      <button onClick={() => playString(testString.split(''))}>Click me!</button>
    </div>
  );
}
