import React, { useEffect, useState } from 'react';
import Section from './Section';
import './CustomSideBarImages.css';

function CustomSideBarImages({ clothingItems }) {
  const [hats, setHats] = useState([]);
  const [chests, setChests] = useState([]);
  const [legs, setLegs] = useState([]);
  const [feet, setFeet] = useState([]);

  const [hatIndex, setHatIndex] = useState(0);
  const [chestIndex, setChestIndex] = useState(0);
  const [legIndex, setLegIndex] = useState(0);
  const [feetIndex, setFeetIndex] = useState(0);

  useEffect(() => {
    const hats = [];
    const chests = [];
    const legs = [];
    const feet = [];

    clothingItems.forEach((item) => {
      if (['Beanie', 'Cap', 'Scarf', 'Sunglasses'].includes(item.name)) {
        hats.push(item);
      } else if (
        [
          'Coat',
          'Dress',
          'Hoodie',
          'Jacket',
          'Sweatshirt',
          'T-Shirt',
          'New Winter Coat',
        ].includes(item.name)
      ) {
        chests.push(item);
      } else if (
        ['Jeans', 'Shorts', 'Skirt', 'New Sweatpants'].includes(item.name)
      ) {
        legs.push(item);
      } else if (
        ['Boot', 'Sneakers', 'Sandals', `loafers`].includes(item.name)
      ) {
        feet.push(item);
      }
    });

    setHats(hats);
    setChests(chests);
    setLegs(legs);
    setFeet(feet);
  }, [clothingItems]);

  return (
    <div>
      <Section
        items={hats}
        index={hatIndex}
        setIndex={setHatIndex}
        title="Hats"
      />
      <Section
        items={chests}
        index={chestIndex}
        setIndex={setChestIndex}
        title="Chests"
      />
      <Section
        items={legs}
        index={legIndex}
        setIndex={setLegIndex}
        title="Legs"
      />
      <Section
        items={feet}
        index={feetIndex}
        setIndex={setFeetIndex}
        title="Feet"
      />
    </div>
  );
}

export default CustomSideBarImages;
