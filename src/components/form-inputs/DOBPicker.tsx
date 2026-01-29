import * as React from "react";
import { useField, useFormikContext } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface DOBPickerProps {
  name: string;
  label?: string;
  minDate?: Date;
  maxDate?: Date;
  disableFuture?: boolean;
}

const DOBPicker: React.FC<DOBPickerProps> = ({
  name,
  label = "Date of Birth",
  minDate,
  maxDate,
  disableFuture = true
}) => {
  const [field, meta, helpers] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={field.value || null}
        onChange={(date) => setFieldValue(name, date)}
        minDate={minDate}
        maxDate={maxDate}
        disableFuture={disableFuture}
        slotProps={{
          textField: {
            fullWidth: true,
            error: Boolean(meta.touched && meta.error),
            helperText: meta.touched && meta.error ? meta.error : ""
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default DOBPicker;
