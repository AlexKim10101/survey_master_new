import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import { PRIMARY_COLOR } from "../../consts/const";

const GreenRadio = withStyles({
  root: {
    color: PRIMARY_COLOR,
    "&$checked": {
      color: PRIMARY_COLOR,
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

export default GreenRadio;