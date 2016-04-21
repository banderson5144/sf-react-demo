//Import React
import React from 'react'

class WizardDemo extends React.Component {
  constructor (props)
  {
    super(props);
    this.state = {
                   modalOpen:false,
                   spin:false,
                   lkupList:[],
                   someVal:'',
                   someVal2:'',
                   selectedVal:false,
                   isFocused:false,
                 };
    this.modalOpenFunc = this.modalOpenFunc.bind(this);
    this.modalCloseFunc = this.modalCloseFunc.bind(this);
    this.startSpinner = this.startSpinner.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.selVal = this.selVal.bind(this);
    this.removeSel = this.removeSel.bind(this);
    this.focusFunc = this.focusFunc.bind(this);
    this.blurFunc = this.blurFunc.bind(this);
  }

  focusFunc()
  {
    this.setState({isFocused:true});
  }

  blurFunc()
  {
    this.setState({isFocused:false});
  }

  selVal(rName)
  {
    console.log('test');
    this.setState({
                    someVal:rName,
                    selectedVal:true
                  });
  }

  removeSel(ev)
  {
    this.setState({
                    someVal:'',
                    selectedVal:false
                  });

    var that = ev.currentTarget.parentElement.parentElement.nextSibling;

    ev.preventDefault();
    ev.stopPropagation();

    setTimeout(function(){that.focus();},10);
  }

  handleChange(ev)
  {
    this.setState({someVal:ev.target.value});
    var that = this;
    ResponsiveCtrl.typeAheadFunc(ev.target.value,'Account',[],function(r,e)
    {
      that.setState({lkupList:r});
    });
  }

  handleChange2(ev)
  {
    this.setState({someVal2:ev.target.value});
  }

  startSpinner()
  {
    this.setState({modalOpen:false,spin:true});
    var that = this;
    setTimeout(function(){that.setState({modalOpen:false,spin:false});}, 6000);
  }

  modalOpenFunc()
  {
    this.setState({modalOpen:true});
  }

  modalCloseFunc()
  {
    this.setState({modalOpen:false});
  }

  render() {
    return (
      <div className="slds-grid slds-wrap">
        <div className="slds-tabs--path" role="application">
          <ul className="slds-tabs--path__nav" role="tablist">
            {this.props.stages.map((v,i)=>
              {
                return <li className={"slds-tabs--path__item" +
                                      (v.isComplete?" slds-is-complete":"") +
                                      (v.isCurrent?" slds-is-current":"") +
                                      (!v.isCurrent&&!v.isComplete?" slds-is-incomplete":"")
                                     }
                           role="presentation"
                           key={i}>
                        <a className="slds-tabs--path__link" id={"tabs-path-"+i} aria-controls={"content-path-"+i} aria-selected="false" tabIndex={i} role="tab" href="#void" aria-live="assertive">
                          <span className="slds-tabs--path__stage">
                            <svg aria-hidden="true" className="slds-icon slds-icon--x-small">
                              <use xlinkHref={rootResUrl + "/assets/icons/utility-sprite/svg/symbols.svg#check"}></use>
                            </svg>
                            <span className="slds-assistive-text">Stage Complete</span>
                          </span>
                          <span className="slds-tabs--path__title">{v.stageName}</span>
                        </a>
                      </li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

//Connects Redux State to React, Injects reducer as a property
export default WizardDemo;
