//Import React
import React from 'react'

//Import Redux Components
import { connect } from 'react-redux';

//Import Action
import { addAcct, upsertAccts, qryAccts, updateAccts } from '../actions/index';

class TableDemo extends React.Component {
  constructor (props)
  {
    super(props);
  }

  //Perform Functions when our React Component is about to mount
  componentWillMount()
  {
    this.props.dispatch(qryAccts());
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

  render () {
    return (
      <div>
        <h1>Accounts</h1>
        <ul>
         {this.props.accts.map((v,i) => <li key={i}><input style={{width:'500px'}} onChange={event => this.handleChange(event,i)} value={v.Name}/></li>) }
        </ul>
        <button onClick={e => this.upsertAccts(e)}>Upsert list</button>
        <button onClick={e => this.addAcct(e)}>Add Account</button>
      </div>
    );
  }
}

//Connects Redux State to React, Injects reducer as a property
export default connect(state => ({ accts: state.accts }))(TableDemo);
