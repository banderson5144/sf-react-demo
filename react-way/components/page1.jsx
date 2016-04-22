//Import React
import React from 'react'
import LookupComp from './lookupComp'
import { connect } from 'react-redux'
import { addAcct, upsertAccts, qryAccts, updateAccts } from '../actions/index';

class Page1Demo extends React.Component {
  constructor (props)
  {
    super(props);
    console.log(this);
  }

  //Perform Upsert Actions
  upsertAccts(e)
  {
    this.props.dispatch(upsertAccts(this.props.accts))
  }

  //Add new Account to the Array
  addAcct(event)
  {
    this.props.dispatch(addAcct());
  }

  //onChange function to handle when a name is changed
  handleChange(ev,index)
  {
    this.props.dispatch(updateAccts(ev.target.value,index));
  }

  dateChange(e)
  {
    console.log(e.target.value);
  }

  render() {
    return (
      <div>
        <h1>Accounts</h1>
        <ul>
         {this.props.accts.map((v,i) => <li key={i}><input style={{width:'500px'}} onChange={event => this.handleChange(event,i)} value={v.Name}/></li>) }
        </ul>
        <div className="slds-grid slds-wrap">
          <div className="slds-size--1-of-2 slds-small-size--1-of-3 slds-medium-size--1-of-4 slds-large-size--1-of-3">
            <input type="date" className="slds-input" onChange={e=>this.dateChange(e)}/>
          </div>
          <div className="slds-size--1-of-2 slds-small-size--1-of-3 slds-medium-size--1-of-4 slds-large-size--1-of-3">
            <LookupComp/>
          </div>
        </div>
        <button onClick={e => this.upsertAccts(e)}>Upsert list</button>
        <button onClick={e => this.addAcct(e)}>Add Account</button>
      </div>
    );
  }
}

//Connects Redux State to React, Injects reducer as a property
//export default Page1Demo;
export default connect(state => ({ accts: state.accts }))(Page1Demo);
