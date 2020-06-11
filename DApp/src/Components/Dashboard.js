import React, { Component } from 'react';
import logo from '../logo.svg';
import { Properties } from './Properties.js';
import Button from '@material-ui/core/Button';
import Loader from 'react-loader-spinner';
import { Fab, Icon, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
//import { Link } from "react-router-dom";

class Dashboard extends Component {

  entityNames = null;
  componentWillMount() {

    const { authenticateUser } = this.state.ContractInstance;
    let entities = [];
    authenticateUser ((err,entities) => {
        this.entities = entities;
        if (err) {
          console.error ('An error occured::::', err);
        } else {
          console.log ('Entity Details::::', entities);
          this.entityNames = [];
          entities.forEach( (entity) => {
            console.log('Inside Map');
            const { getEntityDetails } = this.state.ContractInstance;
            getEntityDetails(entity, (err,res) => {
                if (!err) {
                  console.log('Entity Details', res);
                  console.log('name', res[0]);
                  this.state.name = res[0];
                  this.entityNames.push(res[0]);
                  this.forceUpdate();
                } else {
                  console.log ('Error occured in entity details', err);
                }
              }
            );
          })
          this.forceUpdate();
        }
    });
  }

  constructor (props) {
    super (props);
    const ABI = JSON.stringify(Properties.ABI_VALUE);
    const ABI_Array = JSON.parse(ABI);
    const MyContract = window.web3.eth.contract(ABI_Array);

        this.state = {
          ContractInstance: MyContract.at (Properties.ADDRESS),
          name:''
        }
      }

      redirectToEntity () {
        let path = '/registerEntity';
        this.props.history.push(path);
      }
      rediredctToSearch () {
        let path = '/search';
        this.props.history.push(path);
      }
      redirectToUpdate() {
        let path = '/entityDetails?name='+this.state.name;
        this.props.history.push(path);
      }

  render () {
    return (
      (this.entityNames === null)? (<div> <Loader type="Puff" color="#00BFFF" height="100"	width="100"/> Loading..</div> ) : (

      <div className="backgroundGradient">
        {/* <Button variant="contained" color="default"
          > Search 
        </Button> */}
          <IconButton onClick={this.rediredctToSearch.bind(this)}  aria-label="Delete">
            <SearchIcon /> Search
          </IconButton>
                  <br /><br /><br />
          <img src={logo} alt="logo" />


          <h1 style={{fontSize: 50}}> Decentralized Marketplace </h1>
          <br />
          <view style={{flexDirection: 'row'}}>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="contained" color="default"
          onClick={this.redirectToEntity.bind(this)}> Register Entity </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          Click to register entity
          </view>
          <br />
          <br /><br />
          <view style={{flexDirection: 'row'}}>
          {
            this.entityNames.map( (l,i) => {
              return (
                
                <Button key={i} variant="contained" color="default" onClick={this.redirectToUpdate.bind(this)}>
                    {l}
                </Button>
              );

            })
          }
          </view>
      </div>)
    );
  }
}
export default Dashboard;
