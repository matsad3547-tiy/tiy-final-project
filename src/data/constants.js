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

//
// //Utah Data
// const annualData = {
//   'apr': 6.63,
//   'aug': 7.54,
//   'dec': 3.75,
//   'feb': 4.45,
//   'jan': 3.63,
//   'jul': 8.43,
//   'jun': 8.96,
//   'mar': 6.2,
//   'may': 7.65,
//   'nov': 5.08,
//   'oct': 6.73,
//   'sep': 7.69
// }
