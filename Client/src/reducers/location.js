const locationReducer = (state = { data: null }, action) => {
  // console.log(action);
  switch (action.type) {
    case "FETCH_LOCATION":
      return action.payload;
    case "FETCH_AUTO_LOCATION":
      return { ...state, data: action.payload };
    default:
      return state;
  }
};
export default locationReducer;
