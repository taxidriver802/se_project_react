import React from 'react';
import './CustomSideBarImages.css';

function Section({ items, index, setIndex, title }) {
  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="custom-side-bar__section">
      <button className="custom-side-bar__button" onClick={handlePrev}>
        Prev
      </button>
      {items.length > 0 && (
        <img
          key={items[index]._id}
          src={items[index].imageUrl}
          alt={items[index].name}
          className="custom-side-bar__img"
        />
      )}
      <button className="custom-side-bar__button" onClick={handleNext}>
        Next
      </button>
    </div>
  );
}

export default Section;
