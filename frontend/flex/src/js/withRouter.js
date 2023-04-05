// Import this file into class components so you can do this.props.navigate(path)
// This is a workaround since I'm using class components instead of hooks with functional components
// Any components that use this have to have export default withRouter(ComponentName)


import { useNavigate } from 'react-router-dom';
import React from 'react';

export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    
    return (
      <Component
        navigate={navigate}
        {...props}
      />
    );
  };
  
  return Wrapper;
};