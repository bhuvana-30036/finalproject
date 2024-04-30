// TrendCard.js

import React from 'react';
import './TrendCard.css';
import { TrendData } from '../../Data/TrendData.js';

const TrendCard = () => {
  return (
    <div className="TrendCard">
      <h3>Popular Trends for you</h3>

      {TrendData.map((trend, id) => {
        return (
          <div className="trend" key={id}>
            <span>#{trend.name}</span>
            <span className="trend-share-button">{trend.shares}k shares</span>
          </div>
        );
      })}
    </div>
  );
}

export default TrendCard;
