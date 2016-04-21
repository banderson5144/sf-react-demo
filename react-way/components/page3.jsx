//Import React
import React from 'react'

class Page3Demo extends React.Component {
  constructor (props)
  {
    super(props);
  }

  render() {
    return (
      <div className="slds-grid slds-wrap">
        Page3
      </div>
    );
  }
}

//Connects Redux State to React, Injects reducer as a property
export default Page3Demo;
