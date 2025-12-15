import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="mb-3">
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabelShow}</Button>
      </div>
      <div style={showWhenVisible} className="p-3 bg-white border rounded shadow-sm">
        {props.children}
        <div className="mt-3">
          <Button variant="outline-secondary" onClick={toggleVisibility}>
            {props.buttonLabelHide}
          </Button>
        </div>
      </div>
    </div>
  );
});

Togglable.displayName = "Togglable";
Togglable.propTypes = {
  buttonLabelShow: PropTypes.string.isRequired,
  buttonLabelHide: PropTypes.string.isRequired,
};

export default Togglable;
