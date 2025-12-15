import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button, Collapse, Stack, Box } from "@mui/material";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      {!visible && (
        <Button variant="contained" onClick={toggleVisibility}>
          {props.buttonLabelShow}
        </Button>
      )}
      <Collapse in={visible} unmountOnExit>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Box>{props.children}</Box>
          <Box>
            <Button variant="outlined" onClick={toggleVisibility}>
              {props.buttonLabelHide}
            </Button>
          </Box>
        </Stack>
      </Collapse>
    </div>
  );
});

Togglable.displayName = "Togglable";
Togglable.propTypes = {
  buttonLabelShow: PropTypes.string.isRequired,
  buttonLabelHide: PropTypes.string.isRequired,
};

export default Togglable;
