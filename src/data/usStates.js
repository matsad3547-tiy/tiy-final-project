import stateInf from './stateInf';

const getStates = stateInf => {
  let usStates = [];
  stateInf.map( (obj) => usStates.push(obj.state));
  return usStates;
}

let usStates = getStates(stateInf);

export default usStates;
