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
//utah data
        // values: [ {x: 1, y: 3.63}, {x: 2, y: 4.45}, {x: 3, y: 6.2}, {x: 4, y: 6.63},{x: 5, y: 7.65}, {x: 6, y: 8.96}, {x: 7, y: 8.43}, {x: 8, y: 7.54}, {x: 9, y: 7.69}, {x: 10, y: 6.73}, {x: 11, y: 5.08}, {x: 12, y: 3.75} ]
