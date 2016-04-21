//Import React
import React from 'react'

class Page5Demo extends React.Component {
  constructor (props)
  {
    super(props);
  }

  render() {
    return (
      <div className="slds-grid slds-wrap">
        Page5
      </div>
    );
  }
}

//Connects Redux State to React, Injects reducer as a property
export default Page5Demo;
