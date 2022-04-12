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

  const testString = 'abc';
  const now = Tone.now();
  // const runTone = async () => {
  //   await Tone.start();
  // };
  // runTone();

  const playNote = (note) => {
    synth.triggerAttackRelease(note, '8n');
  };

  const turnCharToNote = (char) => {
    const testChar = char?.toUpperCase();
    playNote(noteData[testChar]);
  };

  const playString = async (str) => {
    const noteArray = str.map((char) => {
      return noteData[char.toUpperCase()];
    });
    const sequence = new Tone.Sequence((time, note) => {
      synth.triggerAttackRelease(note, 0.2, time);
    }, noteArray).start(0);
    //sequence.loop = false;
    Tone.Transport.start();
    if (sequence.length === noteArray.length) {
      Tone.Transport.stop();
    }
  };
  // once!: (event: TransportEventNames, callback: (...args: any[]) => void) => this;

  return (
    <div>
      <textarea onChange={(e) => turnCharToNote(e.nativeEvent.data)}></textarea>
      <button onClick={() => playString(testString.split(''))}>Click me!</button>
    </div>
  );
}
