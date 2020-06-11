import React, { Component } from 'react';
import logo from '../logo.svg';
import { Properties } from './Properties.js';
import Button from '@material-ui/core/Button';

class RegisterEntity extends Component {
  constructor (props) {
    super (props);
    const ABI = JSON.stringify(Properties.ABI_VALUE);
    const ABI_Array = JSON.parse(ABI);
    const MyContract = window.web3.eth.contract(ABI_Array);

        this.state = {
          ContractInstance: MyContract.at (Properties.ADDRESS),
          contractKey: '',
          contractName:''
        }

        this.handleContractLoginSubmit = this.handleContractLoginSubmit.bind(this);
        this.queryContractEntity = this.queryContractEntity.bind(this);
      }

 queryContractEntity () {
        const { authenticateUser } = this.state.ContractInstance;

        authenticateUser ((err,entities) => {
          if (err) console.error ('An error occured::::', err);
            console.log ('Entity Details::::', entities);
        })
      }

  handleContractLoginSubmit (event) {
    event.preventDefault ();

    const { registerEntity } = this.state.ContractInstance;
    const { isEntityNameUnique } = this.state.ContractInstance;
    const { contractKey: key } = this.state;
    const { contractName: name} = this.state;

    isEntityNameUnique(
    name,
    (err, res) => {
       if(err) {
          alert('registerEntityname, Entity name registration Failed');
       } else {
           let isEvent = this.state.ContractInstance.IsExistEntity();
           isEvent.watch( (err, result) => {
             if (err) {
                console.log('could not get event isEvent()')
             } else {
                console.log('Value is : ', result.args.value);
                if (result.args.value === true) {
                  registerEntity (
                  key,name,
                  (err, result) => {
                    if(!err) {
                      console.log ('Registering Entity',result);
                      let path = '/Dashboard';
                      this.props.history.push(path);
                      }
                    }
                  )
                } else {
                  console.log('registered successfully : ', result.args.value);
                  alert('Entity registration Failed');
                }
             } })
         }
      }
  )
  }

  render () {
    return (
      <div className="backgroundGradient">
      <br /><br /><br />
          <img src={logo} alt="logo" />
          <h1 style={{fontSize: 50}}> Decentralized Marketplace </h1>
          <br />


        <form onSubmit={ this.handleContractLoginSubmit }>
        <h1> Register Entity </h1>
        <br />
        <br />
          <view style={{flexDirection: 'row'}}>
            <input
              type="text"
              name="state-change"
              placeholder="Enter Identity"
              value ={ this.state.contractKey }
              onChange={ event => this.setState ({ contractKey: event.target.value }) } />
              <br />
              <br />
              <input
                type="text"
                name="state-change"
                placeholder="Enter Name"
                value ={ this.state.contractName }
                onChange={ event => this.setState ({ contractName: event.target.value }) } />
             <br />
             <br />
              <Button variant="contained" color="default" type="submit"> Submit </Button>
          </view>
        </form>
        <br />
      </div>
    );
  }
}
export default RegisterEntity;
