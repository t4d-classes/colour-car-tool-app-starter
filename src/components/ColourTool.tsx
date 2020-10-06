import React, { useState } from 'react';

import { Colour, NewColour } from '../models/colour';

import { ToolHeader } from './ToolHeader';
import { ItemList } from './ItemList';
import { ColourForm } from './ColourForm';

export type ColourToolProps = {
  colours: Colour[];
};

export function ColourTool(props: ColourToolProps) {
  const [colours, setColours] = useState([...props.colours]);

  const addColour = (newColour: NewColour) => {
    setColours([
      ...colours,
      {
        ...newColour,
        id: Math.max(...colours.map((c) => c.id), 0) + 1,
      },
    ]);
  };

  return (
    <>
      <ToolHeader headerText="Color Tool" />
      <ItemList
        items={colours}
        keyFn={(item) => item.id}
        contentFn={(item) => item.name + ' ' + item.hexcode}
      />
      <ColourForm buttonText="Add Colour" onSubmitColour={addColour} />
    </>
  );
}
