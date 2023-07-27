import * as React from "react";
import { styled } from "@mui/material/styles";
import Radio, { RadioProps } from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const BpIcon = styled("span")(({ theme }) => ({
  borderRadius: "50%",
  width: 12, // Adjust the width to make it smaller
  height: 12, // Adjust the height to make it smaller
  border: "2px solid #000", // Set the border to black
  position: "relative", // Add relative positioning
  ".Mui-focusVisible &": {
    outline: "2px auto rgba(19,124,189,.6)",
    outlineOffset: 2
  },
  "input:hover ~ &": {
    backgroundColor: theme.palette.mode === "dark" ? "`#30404d`" : "`#ebf1f5`"
  },
  "input:disabled ~ &": {
    boxShadow: "none",
    background:
      theme.palette.mode === "dark"
        ? "rgba(57,75,89,.5)"
        : "rgba(206,217,224,.5)"
  }
}));

const BpCheckedIcon = styled(BpIcon)({
  "&:before": {
    content: '""',
    width: 6, // Adjust the width to make the dot smaller
    height: 6, // Adjust the height to make the dot smaller
    borderRadius: "50%",
    backgroundColor: "#000", // Set the dot color to black when selected
    position: "absolute", // Add absolute positioning
    top: "50%", // Move the dot to the vertical center
    left: "50%", // Move the dot to the horizontal center
    transform: "translate(-50%, -50%)" // Center the dot precisely
  },
  "input:hover ~ &": {
    backgroundColor: "`#106ba3`"
  }
});

// Inspired by blueprintjs
function BpRadio(props: RadioProps) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}

export default function CustomizedRadios() {
  return (
    <FormControl>
      <FormLabel id="demo-customized-radios">Gender</FormLabel>
      <RadioGroup
        defaultValue="female"
        aria-labelledby="demo-customized-radios"
        name="customized-radios"
      >
        <FormControlLabel value="female" control={<BpRadio />} label="Female" />
        <FormControlLabel value="male" control={<BpRadio />} label="Male" />
        <FormControlLabel value="other" control={<BpRadio />} label="Other" />
        <FormControlLabel
          value="disabled"
          disabled
          control={<BpRadio />}
          label="(Disabled option)"
        />
      </RadioGroup>
    </FormControl>
  );
}
