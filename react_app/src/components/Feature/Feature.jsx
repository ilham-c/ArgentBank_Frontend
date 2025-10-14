import React from 'react';
import '../../pages/Home/Home.css';

export default function Feature({ icon, title, text, alt }) {
  return (
    <div className="feature-item">
      <img className="feature-icon" src={icon} alt={alt} />
      <h3 className="feature-item-title">{title}</h3>
      <p>{text}</p>
    </div>
  );
}
