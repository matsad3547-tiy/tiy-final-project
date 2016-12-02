 const usState = (state, action) => {
   console.log('cheese');
  // let newState = action.usState;
  return {
    // type: GET_SOLAR_DATA,
    usState: action.usState
  };
}

export default usState
