//Import Action Constants
import { RECEIVED_ACCTS, UPDATE_ACCTS, ADD_ACCT } from '../constants/index';

//What the initial State of our App Will be
const initialState = [];

/*
Here is the structure of our App:

[{Name:"Account Name",Id:"001XXXXXXXXXXXXXXX"},...]

*/

//Reducer function
export function accts(state = initialState, action) {
  switch (action.type) {
  case RECEIVED_ACCTS:
  //Return the Accouts we receive from Salesforce
    state = action.accts;
    return state;
  case UPDATE_ACCTS:
  //Update our array at the specific index
    var newState = state.slice();
    newState[action.listIndex].Name = action.acctName;
    return newState;
  case ADD_ACCT:
  //Add a new Account to our Array
    var newState = state.slice();
    newState.push({Name:""});
    return newState;
  default:
    return state
  }
}
