import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { v4 as uuidv4 } from "uuid";
// import { gradientPrimary } from "../../theme/theme";
import { useField, useFormikContext } from "formik";
import TextFieldWrapper from "./TextFieldWrapper";

const ReCaptcha = ({ name }) => {
  // Generate random key
  function generateKey() {
    return uuidv4().slice(0, 6);
  }

  console.log(generateKey());

  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <Stack width="100%" spacing={2}>
      <Stack direction="row" spacing={2}>
        <Typography
          sx={{
            fontSize: 30,
            fontWeight: "bold",
            color: "#FFFFFF",
            marginBottom: "20px",
            letterSpacing: "5px",
            background: `linear-gradient(135deg, #ff6600, #ff4d4d)`,
            display: "inline-block",
            borderRadius: 1.5,
            boxShadow: `2px 2px 8px rgba(0, 0, 0, 0.1)`,
            width: "80%",
            textAlign: "center",
            wordWrap: "break-word",
            fontStyle: "italic"
          }}
        >
          {field.value}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          sx={{
            width: "20%",
            background: `linear-gradient(135deg, #ff6600, #ff4d4d)`,
            color: "#FFFFFF",
          }}
          onClick={() => {
            setFieldValue("captchakey", generateKey());
          }}
        >
          Reload
        </Button>
      </Stack>
      <TextFieldWrapper
        name="verifyCaptchaKey"
        label="Enter the key shown above"
      />
    </Stack>
  );
};

export default ReCaptcha;
