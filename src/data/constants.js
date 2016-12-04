import stateInf from './stateInf';

const getStates = stateInf => {
  let usStates = [];
  stateInf.map( (obj) => usStates.push(obj.state));
  return usStates;
}

export const usStates = getStates(stateInf);

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const seasons = ['spring', 'summer', 'fall', 'winter'];
