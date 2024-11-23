import React, { useState } from "react";

const withActionHandlers = (actionHandlers = {}, initialState = {}) => (WrappedComponent) => {
  const HOC = (props) => {
    const [state, setState] = useState(initialState);

    const setUpdatedState = (payload) => {
      setState({ ...state, ...(payload || {}) });
    }

    const onAction = (action) => {

      const { type, payload } = action;

      const handler = actionHandlers[type];
      if (handler) {
        handler({ state, setState: setUpdatedState, ...props }, payload);
      }
    };

    return (
      <WrappedComponent
        {...props}
        {...state}
        onAction={onAction}
      />
    );
  };

  return HOC;
};

export default withActionHandlers;