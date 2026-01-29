import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";

interface Props extends Omit<TextFieldProps, "name"> {
  name: string;
  label: string;
}

const TextFieldWrapper: React.FC<Props> = ({ name, label, ...otherProps }) => {
  const [field, meta] = useField(name);

  const configTextField: TextFieldProps = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    label
  };

  if (meta?.touched && meta?.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default TextFieldWrapper;
