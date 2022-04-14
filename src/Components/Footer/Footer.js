import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <Link to="/aboutus">Click here to meet the developers! </Link>
    </footer>
  );
}
