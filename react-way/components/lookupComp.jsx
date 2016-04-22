//Import React
import React from 'react'

class LookupComp extends React.Component {
  constructor (props)
  {
    super(props);
    this.state = {
                   lkupList:[],
                   someVal:'',
                   someVal2:'',
                   selectedVal:false,
                   isFocused:false,
                 };
    this.handleChange = this.handleChange.bind(this);
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
    const pillTrunc = {
                        maxWidth:'60%',
                        overflow:'hidden',
                        textOverflow:'ellipsis',
                        whiteSpace:'nowrap'
                      }
    return (
        <div className={"slds-lookup"+(this.state.selVal!=null?" slds-has-selection":"")} data-select="single" data-scope="single" data-typeahead={this.state.selVal!=null?"false":"true"}>
          <div className="slds-form-element">
            <div className="slds-form-element__control slds-input-has-icon slds-input-has-icon--right">
              <svg aria-hidden="true" className={"slds-input__icon slds-icon-text-default"+(this.state.selectedVal!=''?" slds-hide":" slds-show")}>
                <use xlinkHref={rootResUrl + "/assets/icons/utility-sprite/svg/symbols.svg#search"}></use>
              </svg>
              <div className={"slds-pill_container"+(this.state.selectedVal!=''?" slds-show":" slds-hide")}>
                <a className="slds-pill">
                  <svg aria-hidden="true" className="slds-icon slds-icon-standard-account slds-pill__icon">
                    <use xlinkHref={rootResUrl + "/assets/icons/standard-sprite/svg/symbols.svg#account"}></use>
                  </svg>
                  <span className="slds-pill__label" style={pillTrunc}>{this.state.someVal}</span>
                  <button className="slds-button slds-button--icon-bare slds-pill__remove" onClick={this.removeSel}>
                    <svg aria-hidden="true" className="slds-button__icon">
                      <use xlinkHref={rootResUrl + "/assets/icons/utility-sprite/svg/symbols.svg#close"}></use>
                    </svg>
                    <span className="slds-assistive-text">Remove</span>
                  </button>
                </a>
              </div>
              <input id="lookup"
                     className={"slds-input"+(this.state.selectedVal?" slds-hide":" slds-show")}
                     type="text"
                     aria-autocomplete="list"
                     role="combobox"
                     aria-expanded="true"
                     aria-activedescendant=""
                     value={this.state.someVal}
                     onChange={this.handleChange}
                     onBlur={this.blurFunc}
                     onFocus={this.focusFunc}/>
            </div>
          </div>
          { (this.state.someVal != '' && !this.state.selectedVal && this.state.isFocused) &&
            <div className="slds-lookup__menu" role="listbox">
              <div className="slds-lookup__item">
                <button className="slds-button">
                  <svg aria-hidden="true" className="slds-icon slds-icon-text-default slds-icon--small">
                    <use xlinkHref={rootResUrl + "/assets/icons/utility-sprite/svg/symbols.svg#search"}></use>
                  </svg>{'"'+this.state.someVal+'" in Accounts'}</button>
              </div>
              <ul className="slds-lookup__list" role="presentation">
                {
                  this.state.lkupList.length > 0 &&
                  this.state.lkupList.map((v,i)=>
                  {
                    return <li key={i} className="slds-lookup__item" onMouseDown={() => this.selVal(v.rName)}>
                              <span id="s01" role="option">
                                <svg aria-hidden="true" className="slds-icon slds-icon-standard-account slds-icon--small">
                                  <use xlinkHref={rootResUrl + "/assets/icons/standard-sprite/svg/symbols.svg#account"}></use>
                                </svg>{v.rName}</span>
                            </li>
                  })
                }
              </ul>
              <div className="slds-lookup__item">
                <button className="slds-button" onClick={this.modalOpenFunc}>
                  <svg aria-hidden="true" className="slds-icon slds-icon-text-default slds-icon--small">
                    <use xlinkHref={rootResUrl + "/assets/icons/utility-sprite/svg/symbols.svg#add"}></use>
                  </svg>Add Account</button>
              </div>
            </div>
          }
        </div>
    );
  }
}

//Connects Redux State to React, Injects reducer as a property
export default LookupComp;
