import React, { useState } from 'react';
import { faHeart, faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventFilters = () => {
  const [textFilter, setTextFilter] = useState('');
  const [sortBy, setSortBy] = useState('date'); 

  const handleTextFilterChange = (e) => {
    setTextFilter(e.target.value);
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
  };

  return (
    <div className="input-group">
      <div className="input-group__item">
        <input
          type="text"
          placeholder="Search events"
          value={textFilter}
          onChange={handleTextFilterChange}
        />
      </div>
      <div className="input-group__item">
        <div className="inner">
          <div className="item">
            <input
              type="radio"
              id="likes"
              name="sortBy"
              value="likes"
              checked={sortBy === 'likes'}
              onChange={() => handleSortByChange('likes')}
            />
            <label title="Sort by Likes" htmlFor="likes">
              <FontAwesomeIcon icon={faHeart} />
            </label>
          </div>
          <div className="item">
            <input
              type="radio"
              id="date"
              name="sortBy"
              value="date"
              checked={sortBy === 'date'}
              onChange={() => handleSortByChange('date')}
            />
            <label title="Sort by Date" htmlFor="date">
              <FontAwesomeIcon icon={faTable} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;
