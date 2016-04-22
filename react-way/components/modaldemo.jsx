//Import React
import React from 'react'
import LookupComp from './lookupComp'

class ModalDemo extends React.Component {
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
      <div className="slds">
        <button className="slds-button slds-button--brand"
                onClick={this.modalOpenFunc}>Pop Modal</button>
        <button className="slds-button slds-button--brand"
                onClick={this.startSpinner}>Start Spinner</button>
        <LookupComp/>
        <div className="slds-spinner_container" style={{display:(this.state.spin?'':'none')}}>
          <div className="slds-spinner--brand slds-spinner slds-spinner--large" aria-hidden="false" role="alert">
            <div className="slds-spinner__dot-a"></div>
            <div className="slds-spinner__dot-b"></div>
          </div>
        </div>
        <div className={"slds-modal"+ (this.state.modalOpen?" slds-fade-in-open":"")} aria-hidden="false" role="dialog">
          <div className="slds-modal__container">
            <div className="slds-modal__header">
              <button className="slds-button slds-button--icon-inverse slds-modal__close"
                      onClick={this.modalCloseFunc}>
                <svg aria-hidden="true" className="slds-button__icon slds-button__icon--large">
                  <use xlinkHref={rootResUrl + "/assets/icons/action-sprite/svg/symbols.svg#close"}></use>
                </svg>
                <span className="slds-assistive-text">Close</span>
              </button>
              <h2 className="slds-text-heading--medium">Modal Header</h2>
            </div>
            <div className="slds-modal__content slds-p-around--medium">
              <div>
                <p>Sit nulla est ex deserunt exercitation anim occaecat. Nostrud ullamco deserunt aute id consequat veniam incididunt duis in sint irure nisi. Mollit officia cillum Lorem ullamco minim nostrud elit officia tempor esse quis. Cillum sunt ad dolore
                  quis aute consequat ipsum magna exercitation reprehenderit magna. Tempor cupidatat consequat elit dolor adipisicing.</p>
                <p>Dolor eiusmod sunt ex incididunt cillum quis nostrud velit duis sit officia. Lorem aliqua enim laboris do dolor eiusmod officia. Mollit incididunt nisi consectetur esse laborum eiusmod pariatur proident. Eiusmod et adipisicing culpa deserunt
                  nostrud ad veniam nulla aute est. Labore esse esse cupidatat amet velit id elit consequat minim ullamco mollit enim excepteur ea.</p>
              </div>
            </div>
            <div className="slds-modal__footer">
              <button className="slds-button slds-button--neutral" onClick={this.modalCloseFunc}>Cancel</button>
              <button className="slds-button slds-button--neutral slds-button--brand">Save</button>
            </div>
          </div>
        </div>
        <div className={"slds-backdrop"+ (this.state.modalOpen?" slds-backdrop--open":"")}></div>
      </div>
    );
  }
}

//Connects Redux State to React, Injects reducer as a property
export default ModalDemo;
