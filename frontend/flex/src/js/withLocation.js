import React from "react";
import { useLocation } from "react-router-dom";

export const withLocation = (Component) => {
  const Wrapper = (props) => {
    const location = useLocation();
    
    return (
      <Component
        location={location}
        {...props}
      />
    );
  };
  
  return Wrapper;
};