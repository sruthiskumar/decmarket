import React, { Component } from 'react';
import logo from '../logo.svg';
import { Properties } from './Properties.js';
import Button from '@material-ui/core/Button';
//import { makeStyles } from '@material-ui/core/styles';

class Register extends Component {
  constructor (props) {
    super (props);
    const ABI = JSON.stringify(Properties.ABI_VALUE);
    const ABI_Array = JSON.parse(ABI);
    const MyContract = window.web3.eth.contract(ABI_Array);

        this.state = {
          ContractInstance: MyContract.at (Properties.ADDRESS),
          contractKey: '',
          contractUrl: '',
          contractName:'',
          loading: false
        }

        this.handleContractLoginSubmit = this.handleContractLoginSubmit.bind(this);
      }


  updateUser (event) {
    event.preventDefault ();

    const { updateUser } = this.state.ContractInstance;
    const { contractUrl: url } = this.state;
    const { contractKey: key } = this.state;

    updateUser (
      url,key,
       (err, result) => {
        console.log ('Updating User');
      }
    )
  }

  redirectToHome () {
    let path = '/Home';
    this.props.history.push(path);
  }

  redirectToDashboard(){
    let path = '/Dashboard';
    this.props.history.push(path);
  }

  handleContractLoginSubmit (event) {
    event.preventDefault ();

    const { isUserNameUnique } =this.state.ContractInstance;
    const { registerUser } = this.state.ContractInstance;
    const { contractName: name } = this.state;
    const { contractUrl: url } = this.state;
    const { contractKey: key } = this.state;

    let fetchdata = () =>{
      this.setState({loading : true});
    }

    //console.log('name is : ',name);
    //console.log('account : ',window.web3.eth.accounts[0]);
    isUserNameUnique (
      name,
      (err, res) => {
         if(err) {
            alert('UserName registration Failed');
         } else {
             let isEvent = this.state.ContractInstance.IsExist();
             isEvent.watch( (err, result) => {
               if (err) {
                  console.log('could not get event isEvent()')
               } else {
                  console.log('Value is : ', result.args.value);
                  if (result.args.value === true) {
                    registerUser (
                    url,key,name,
                    (err, result) => {
                      if(!err) {
                          //Fire Alert.
                          let isExistUser = this.state.ContractInstance.IsExistUser();
                          isExistUser.watch( (err, result) => {
                            if(result.args.value === false) {
                              alert('Already Registered with this address');
                            } else {
                                console.log ('Registering User',result);
                                let path = '/Dashboard';
                                this.props.history.push(path);
                            }
                          })
                        }
                      }
                    )
                  } else {
                    alert('UserName Already Exist!');
                  }
               } })
           }
        }


    )
  }

  render () {
    const {loading} = this.state;
    return (
    <div className="backgroundGradient">
    <br /><br /><br />
    <img src={logo} alt="logo" />
    <h1 style={{fontSize: 50}}> Decentralized Marketplace </h1>
    <br />

    <form onSubmit={ this.handleContractLoginSubmit }>
       <h1> Register </h1>
       <br />
       <input
          type="text"
          name="state-change"
          placeholder="Enter Name"
          value ={ this.state.contractName }
          onChange={ event => this.setState ({ contractName: event.target.value }) }
        />
          <br /><br/>
        <input
            type="text"
            name="state-change"
            placeholder="Enter URL"
            value ={ this.state.contractUrl }
            onChange={ event => this.setState ({ contractUrl: event.target.value }) }
        />
            <br /><br/>
        <input
              type="text"
              name="state-change"
              placeholder="Enter Key"
              value ={ this.state.contractKey }
              onChange={ event => this.setState ({ contractKey: event.target.value }) }
          />
              <br />
              < br/>
        <view style={{flexDirection: 'row'}}>
          <Button variant="contained" onClick={this.redirectToHome.bind(this)}>
               Home
          </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="contained" color="default" type="submit" disabled={loading}>
            {loading} Submit
          </Button>
          </view>
        </form>
        <br /><br /><br /><br />
      </div>
    );
  }
}
export default Register;
