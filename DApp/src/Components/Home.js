import React, { Component } from 'react';
import logo from '../logo.svg';
import './Home.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Properties } from './Properties.js';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



class PopupGuide extends Component {

  render(){

    return (
      <div className='popup'>
        <div style={{color: "black", backgroundColor:"white"}}  className='popup_inner'>

        <u><i><b><h1 >{this.props.text}</h1></b></i></u>
        <p style={{color: "black", backgroundColor:"white"}}> Decentralized Marketplace is a directory service for Identities, Applications and API's.
        Users can search for applications/api and install on their own server. Developers can create & manage entities, Applications & API's </p>

        <p><b>For Installing:</b><br />
        You can direcly search for applications or apis without registering using the search  utility and can then install it on own server and use it.</p>

        <p><b>For Uploading:</b><br />
        In order to register new application or API you should be part of an Entity(organization). You will need wallet account for any new Entity, Application and API. You can create and maintain any number of accounts using metamask.
        </p>
        <br /> <br />
        <Button variant="contained" color="default" onClick={this.props.closePopup}> Close </Button>


        </div>
      </div>
    );
  }
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

class Home extends Component {
  constructor (props) {
    super (props);
    const ABI = JSON.stringify(Properties.ABI_VALUE);
    const ABI_Array = JSON.parse(ABI);

    const MyContract = window.web3.eth.contract(ABI_Array);

        this.state = {
          ContractInstance: MyContract.at (Properties.ADDRESS),
            showPopupAPI: false
          }

          this.togglePopupGuidelines = this.togglePopupGuidelines.bind(this);
        }

    ContainedButtons() {
    const classes = useStyles();
  }

        authenticateUser(){
          const { authenticateUser } = this.state.ContractInstance;

          authenticateUser ((err,res) => {
            if (err) console.error ('An error occured::::', err);
            console.log ('Entity Details::::', res);
          })

          let path = '/Dashboard';
          this.props.history.push(path);
        }

        redirectToTarget () {
        let path = '/register';
        this.props.history.push(path);
        }

        redirectToSearch () {
        let path = '/search';
        this.props.history.push(path);
        }

        redirectToDashboard(){

          const {isUserRegistered} = this.state.ContractInstance;
          isUserRegistered( (err,res) => {

            if(!err) {
                let isUserExist = this.state.ContractInstance.IsUserRegistered();
                isUserExist.watch( (err,res ) => {
                  console.log('Event value is : ', res.args.value);
                  if(res.args.value === true) {
                    alert('Register First');
                  } else {
                    let path = '/Dashboard';
                    this.props.history.push(path);
                  }
                })
          }
        });
      }

        redirectToAuthenticate () {
        let path = '/authenticate';
        this.props.history.push(path);
        this.setState({
          bgColor: 'blue'
    })
        }

        togglePopupGuidelines(){
          this.setState({
            showPopupGuide: !this.state.showPopupGuide
          });
        }

        render () {
          return (
            <div className="App">
            <br/><br /><br />
            <img src={logo}  alt="logo" />
            <h1 style={{fontSize: 50}}> Welcome to Decentralized Marketplace </h1>
            <br />
              <div  className="split right">
                  <div className="box">
                    <br/>
                      <Button variant="contained" color="default" onClick={ this.redirectToTarget.bind(this)}>
                        Register
                      </Button>
                    <h3> New User </h3>

                      <Button variant="contained" color="default" onClick={this.redirectToDashboard.bind(this)}>
                        User Account
                      </Button>
                    <h3> Existing User </h3>
                    <Button variant="contained" color="default" onClick={ this.redirectToSearch.bind(this)}>
                      Search
                    </Button>
                    </div>
                </div>
              <div className="split left">
                  <div className="box">
                    <h3> To Run Decentralized Marketplace </h3>
                    <h3> <a href= "https://metamask.io/"> Install metamask plugin </a> </h3>
                    <h3>Read to use blockchain based marketplace?</h3>
                    <Button variant="contained" color="default" onClick={this.togglePopupGuidelines}>
                      Read More
                    </Button>

                    {this.state.showPopupGuide ?
                      <PopupGuide text='About Decentralized Marketplace' closePopup={this.togglePopupGuidelines} />
                      : null
                    }

                  </div>
              </div>
            </div>
          );
        }
}

export default Home;
