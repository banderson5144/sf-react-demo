//Import React
import React from 'react'

class Wizard2Demo extends React.Component {
  constructor (props)
  {
    super(props);
    this.state = {
                   stages:this.props.stages.map((v,i)=>
                                                {
                                                  v.isCurrent = i==0?true:false;
                                                  v.isComplete = false;
                                                  return v;
                                                }),
                    currentStage:0
                 };
     this.nextStage = this.nextStage.bind(this);
     this.prevStage = this.prevStage.bind(this);
     this.skipTo = this.skipTo.bind(this);
  }

  nextStage()
  {
    if(this.state.currentStage < this.state.stages.length-1)
    {
      var ind = this.state.currentStage;
      var newStages = this.state.stages.slice();

      newStages[ind].isComplete=true;
      newStages[ind].isCurrent=false;

      ind = ind + 1;

      newStages[ind].isComplete=false;
      newStages[ind].isCurrent=true;

      this.setState({stages:newStages,currentStage:ind});
    }
  }

  skipTo(ev,ind)
  {
    var newStages = this.state.stages.slice();

    for(var i=0;i<newStages.length;i++)
    {
      if(i<ind)
      {
        newStages[i].isCurrent=false;
        newStages[i].isComplete=true;
      }else if(i==ind)
      {
        newStages[i].isCurrent=true;
        newStages[i].isComplete=false;
      }else
      {
        newStages[i].isCurrent=false;
        newStages[i].isComplete=false;
      }
    }

    this.setState({stages:newStages,currentStage:ind});
  }

  prevStage()
  {
    if(this.state.currentStage > 0)
    {
      var ind = this.state.currentStage;
      var newStages = this.state.stages.slice();

      newStages[ind].isComplete=false;
      newStages[ind].isCurrent=false;

      ind = ind - 1;

      newStages[ind].isComplete=false;
      newStages[ind].isCurrent=true;

      this.setState({stages:newStages,currentStage:ind});
    }
  }

  render() {

    const totLen = this.state.stages.length-1;
    const cItems = this.state.stages.filter((v)=>{return v.isComplete}).length;
    const curInd = this.state.currentStage;

    return (
      <div>
        <div>
          <div className="slds-wizard" role="navigation">
            <ol className="slds-wizard__list">
              {this.state.stages.map((v,i)=>
               {
                 return <li key={i}
                            className={"slds-wizard__item" +
                                       ((v.isCurrent||v.isComplete)?" slds-is-active":"")
                                      }
                            onClick={(e) => this.skipTo(e,i)}>
                         <a className="slds-wizard__link">
                           <span className="slds-wizard__marker"></span>
                           <span className="slds-wizard__label slds-text-heading--label">{v.stageName}</span>
                         </a>
                       </li>
               })
              }
            </ol>
            <span className="slds-wizard__progress">
              <span className="slds-wizard__progress-bar" style={{width:((cItems/totLen)*100+'%')}}></span>
            </span>
          </div>
        </div>
        <div>
          {
              this.state.stages.filter((v)=>{return v.isCurrent;})[0].pageContent
          }
        </div>
        <div>
          <div className="slds-float--left">
            <button className="slds-button slds-button--neutral slds-button--brand" onClick={this.prevStage}>Previous Stage</button>
          </div>
          <div className="slds-float--right">
            <button className={"slds-button slds-button--neutral slds-button--brand"+(curInd < totLen?"":" slds-hide")} onClick={this.nextStage}>Next Stage</button>
            <button className={"slds-button slds-button--neutral slds-button--brand"+(curInd == totLen?" slds-show":" slds-hide")}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

//Connects Redux State to React, Injects reducer as a property
export default Wizard2Demo;
