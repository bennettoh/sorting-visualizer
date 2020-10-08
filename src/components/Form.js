import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@material-ui/core';

export default function Form({ formLabel, values, labels, currentValue, onChange }) {
  return (
    <div className="card container-small">
      <FormControl>
        <FormLabel>{formLabel}</FormLabel>
        <RadioGroup value={currentValue} onChange={onChange}>
          {values.map((value, index) => {
            return (<FormControlLabel
              key={`${value}_${index}`}
              value={values[index]}
              control={<Radio />}
              label={labels[index]} />);
          })}
        </RadioGroup>
      </FormControl>
    </div>
  );
}