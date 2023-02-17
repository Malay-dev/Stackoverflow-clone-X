import * as api from "../api";

export const setLocation = (data) => {
  return {
    type: "FETCH_LOCATION",
    payload: data,
  };
};

export const getLocation = () => async (dispatch) => {
  try {
    const { data } = await api.getLocation();
    console.log(data);
    setLocation(data);
    dispatch({ type: "FETCH_AUTO_LOCATION", payload: data });
  } catch (error) {
    console.log(error);
  }
};
