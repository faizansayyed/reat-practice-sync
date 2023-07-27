import React from "react";
import { Button } from "@mui/material";

export default function CustomButton() {
  return (
    <Button
      variant="outlined"
      sx={{
        color: "rgb(28, 32, 37)", // Set the text color to rgb(28, 32, 37)
        borderColor: "rgb(224, 224, 224)", // Set the border color to rgb(224, 224, 224)
        "&:hover": {
          borderColor: "rgb(28, 32, 37)" // Change the border color on hover (optional)
        }
      }}
    >
      Outlined
    </Button>
  );
}
