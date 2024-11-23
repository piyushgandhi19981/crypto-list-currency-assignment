import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Loader from "../../../components/loader";
import withActionHandlers from "../../../hocs/withActionHandlers";
import { DEFAULT_CURRENCY } from "../../../constants/currencies";

import ACTION_HANDLERS from "../actionHandlers/cryptoList.actionHandlers";
import { INITIAL_STATE, LS_KEYS } from "../constants/cryptoList.constants";

const withOtherProps = (WrappedComponent) => {
  return function (props){

    const [loading, setLoading] = useState(true);
    const [initialState, setInitialState] = useState(INITIAL_STATE);

    const handleInit = async () => {
      let curr = await localStorage.getItem(LS_KEYS.CURRENCY);
      let updatedState = initialState;
      const recentSearches = await localStorage.getItem(LS_KEYS.RECENT_SEARCHES);
      if(!curr) {
        curr = DEFAULT_CURRENCY.id;
        await localStorage.setItem(LS_KEYS.CURRENCY, curr);
      } else {
        updatedState = { ...updatedState, currency: curr };
      }
      if(recentSearches) {
        try {
          const searches = JSON.parse(recentSearches)?.recentSearches || [];
          updatedState = { ...updatedState, recentSearches: searches }
        } catch {
            toast.error("Invalid JSON format! Please check your input.");
        }
      }
      setInitialState(updatedState);
      setLoading(false);
    };

    useEffect(() => {
      handleInit();
    }, [])

    const navigate = useNavigate();

    if(loading) return <Loader />;

    const Component = withActionHandlers(ACTION_HANDLERS, initialState)(WrappedComponent);

    return <Component {...props} navigate={navigate} />
  }
}
  
export default withOtherProps;
