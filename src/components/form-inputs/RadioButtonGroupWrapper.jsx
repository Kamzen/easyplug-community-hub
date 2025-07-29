import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";

const RadioButtonGroupWrapper = ({ name, label, options, ...otherProps }) => {
  const { values, setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (event) => {
    setFieldValue(name, event.target.value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    onChange: handleChange
  };

  return (
    <FormControl error={meta && meta.touched && meta.error ? true : null}>
      <FormLabel sx={{ fontSize: 15 }}>{label}</FormLabel>
      <RadioGroup
        row
        name="venderClassification"
        value={values[name]}
        {...configSelect}
      >
        {options?.map((opt, i) => {
          return (
            <FormControlLabel
              key={i}
              value={opt}
              control={<Radio />}
              label={opt}
            />
          );
        })}
      </RadioGroup>
      {meta.touched && meta.error ? (
        <FormHelperText>{meta.error}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default RadioButtonGroupWrapper;
