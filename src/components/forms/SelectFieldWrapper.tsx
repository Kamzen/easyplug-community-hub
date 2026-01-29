import React from "react";
import { useField, useFormikContext } from "formik";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material";

interface Option {
  value: string | number;
  label: string;
}

interface Props<T extends Record<string, unknown> = Record<string, unknown>> {
  name: string;
  label: string;
  options: Option[];
  [key: string]: unknown;
}

const SelectFieldWrapper = <T extends Record<string, unknown>>({
  name,
  label,
  options,
  ...otherProps
}: Props<T>) => {
  const { values, setFieldValue } = useFormikContext<T>();
  const [field, meta] = useField(name);

  const handleChange = (event: SelectChangeEvent) => {
    setFieldValue(name, event.target.value);
  };

  const configSelect = {
    ...field,
    ...otherProps,
    variant: "outlined" as const,
    fullWidth: true,
    onChange: handleChange
  };

  const hasError = Boolean(meta && meta.touched && meta.error);

  return (
    <FormControl error={hasError} fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        {...configSelect}
        labelId={`${name}-label`}
        id={`${name}-select`}
        value={values[name] ?? ""}
        label={label}
      >
        {options.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {hasError ? (
        <FormHelperText>{meta.error as string}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default SelectFieldWrapper;
