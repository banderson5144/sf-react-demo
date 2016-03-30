import {  RECEIVED_ACCTS, UPSERT_ACCTS, ADD_ACCT, UPDATE_ACCTS } from '../constants/index';

export function recAccts(accts) {
  return{
    type: RECEIVED_ACCTS,
    accts: accts
  }
}

export function qryAccts()
{
  return dispatch => {
    ResponsiveCtrl.getAccts(function(r, e) {
      dispatch(recAccts(r))
    },{escape:false});
  }
}

export function upsertAccts(acctStore) {
  return dispatch => {
    ResponsiveCtrl.upsertAccts(acctStore, function(r, e) {
      dispatch(recAccts(r))
    },{escape:false});
  }
}

export function addAcct() {
  return {
    type: ADD_ACCT
  }
}

export function updateAccts(name,index) {
  return {
    type: UPDATE_ACCTS,
    acctName:name,
    listIndex:index
  }
}
