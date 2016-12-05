import stateInf from './stateInf';

const getStates = stateInf => {
  let usStates = [];
  stateInf.map( (obj) => usStates.push(obj.state));
  return usStates;
}

export const usStates = getStates(stateInf);

const getMonths = arr => {
  let monthsArr = [];
  arr.map( (obj) => {
    for (let key in obj) {
      monthsArr.push(key)
    }
  })
  return monthsArr
}

export const monthObjs = [
  {'January': 'jan'},
  {'February': 'feb'},
  {'March': 'mar'},
  {'April': 'apr'},
  {'May': 'may'},
  {'June': 'jun'},
  {'July': 'jul'},
  {'August': 'aug'},
  {'September': 'sep'},
  {'October': 'oct'},
  {'November': 'nov'},
  {'December': 'dec'}
];

export const months = getMonths(monthObjs);

export const seasons = ['spring', 'summer', 'fall', 'winter'];
