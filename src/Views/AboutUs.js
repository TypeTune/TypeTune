import React from 'react';

export default function AboutUs() {
  return (
    <div className="team">
      <h2>Meet the TypeTune Team</h2>
      <div className="teammember">
        <h3>Aidan Liddiard</h3>
        <p>
          {`She is a full-stack software engineer from the Columbia River Gorge. Her favorite song is
          Sour Candy by Melt and grew up playing piano and alto saxophone.`}
        </p>
        <div className="icons"></div>
      </div>
      <div className="teammember">
        <h3>Mary Martinez</h3>
        <p>
          {`Mary is a full-stack software engineer, with a background in biomedical engineering. She
          sings, and has previously played guitar, piano, and French horn. Her current heavy
          rotation music comes from toddler toys, but she also enjoys lo-fi, pop, and country music
          (if there’s room to two-step).`}
        </p>
        <div className="icons"></div>
      </div>
      <div className="teammember">
        <h3>Marcus Ghiringhelli</h3>
        <p>
          {`Marcus is a software developer from Portland, Oregon. He's played guitar, bass,
          keyboards, synths, accordion, mandolin, and TypeTune. His favorite song is Beethoven's 5th
          Symphony.`}
        </p>
        <div className="icons"></div>
      </div>
      <div className="teammember">
        <h3>Alex Orlet</h3>
        <p>
          {`He is a full-stack software engineer from St. Louis, Missouri. His favorite song is Clare
          de Lune, and he plays the classical guitar.`}
        </p>
        <div className="icons"></div>
      </div>
    </div>
  );
}

// name job favorite song or instrument linked ins git huuubs
