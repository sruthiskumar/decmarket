import React, { Component } from 'react';
import logo from '../logo.svg';
import { Properties } from './Properties.js';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Grid, Paper, AppBar, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
});


class EntityDetails extends Component {
  constructor (props) {
    super (props);
    const ABI = JSON.stringify(Properties.ABI_VALUE);
    const ABI_Array = JSON.parse(ABI);
    const MyContract = window.web3.eth.contract(ABI_Array);
    var name = props.location.search;
    name = name.substring(1,name.length);
    name = name.split('=')[1];
    console.log('Entity -- ', name);


    this.state = {
      ContractInstance: MyContract.at (Properties.ADDRESS),
      contractKey: '',
      contractName:'',
      buttonInput: '',
      searchType: '',
      output: [],
      showPopupAPI: false,
      showPopupApp: false,
      showPopupUser: false,
      name: name,
      outputDetails: [],
      updateField: ''
    }

    this.handleContractLoginSubmit = this.handleContractLoginSubmit.bind(this);
    this.togglePopupAPI = this.togglePopupAPI.bind(this);
    this.togglePopupApp = this.togglePopupApp.bind(this);
  }

  addToOutput = (value) => {
    this.setState({
      output: [...this.state.output, value]
    })
  }
    queryContractEntity () {
      const { authenticateUser } = this.state.ContractInstance;

      authenticateUser ((err,entities) => {
        if (err) console.error ('An error occured::::', err);
          console.log ('Entity Details::::', entities);
      })
    }
    hexToStr = (hex) => {
      var str = '';
      for (var i = 0; i < hex.length; i += 2) {
         var v = parseInt(hex.substr(i, 2), 16);
         if (v) str += String.fromCharCode(v);
      }

      let params = [];
      let res = "";
      for (var i=0; i<= str.length; i++){
        if(str.charCodeAt(i) > 31){
          res = res + str[i];
        }
        else{
          params.push(res);
          res = "";
        }
      }
      params.pop();

      return params;
    }
    handleContractLoginSubmit(event) {
        event.preventDefault ();
      const { getApps } = this.state.ContractInstance;
      const { getApis } = this.state.ContractInstance;
      const { getUsers } = this.state.ContractInstance;
      const { searchType } = this.state;
      let getFunction = null;
      if( this.state.searchType === 'application'){
        getFunction = getApps
      }
      else if(this.state.searchType=== 'api') {
        getFunction = getApis
      }
      else if (this.state.searchType=== 'user'){
        getFunction = getUsers
      }

      getFunction(this.state.name, (err, output) => {
        console.log('entity----------', this.state.name);
        console.log(output);
        let data = []
        // output.forEach(element=> data.push(this.hexToStr(element)));
        data.push(this.hexToStr(output));
        let info = {}
        for(let i=0; i<data.length; i++) {
          for(let j=0; j< data[0].length; j++) {
            if(typeof info[j] === 'undefined'){
             info[j] = [ data[i][j] ];
            }else{
              info[j].push(data[i][j]);
            }
          }
        }
        this.setState({output: Object.values(info), outputType: searchType, outputDetails: []} )
        console.log(info);
      })
    }

    handleSearch(searchInput) {
    const { searchApp } = this.state.ContractInstance;
    const { searchApi } = this.state.ContractInstance;
    const { searchUser } = this.state.ContractInstance;
    const {searchType } = this.state
    let searchFunction = null;
    if( this.state.searchType === 'application'){
      searchFunction = searchApp
    }
    else if(this.state.searchType=== 'api') {
      searchFunction = searchApi
    }
    else if (this.state.searchType=== 'user'){
      searchFunction = searchUser
    }
    console.log(searchInput)
    this.setState({
      updateField: searchInput
    })
    searchFunction(searchInput, (err, output) => {
      console.log(output);
      let data = []
      output.forEach(element=> data.push(this.hexToStr(element)));

      let info = {}
      for(let i=0; i<data.length; i++) {
        for(let j=0; j< data[0].length; j++) {
          if(typeof info[j] === 'undefined'){
           info[j] = [ data[i][j] ];
          }else{
            info[j].push(data[i][j]);
          }
        }
      }
      this.setState({outputDetails: Object.values(info)})
    })
  }

    displayPopup(type) {
      const input = this.state.updateField
      console.log(type, '  type ')
      if( type === 'application'){
        this.togglePopupApp(input)
      }
      else if(type=== 'api') {
        this.togglePopupAPI(input)
      }
    }

    togglePopupAPI(apiName) {

      console.log('Apiname-- ' + apiName);
      this.setState({
        showPopupAPI: !this.state.showPopupAPI,
        apiName: this.state.updateField
      }, () =>{
        console.log('name------ ' + this.state.apiName);
      });
    }

    togglePopupApp(appName) {
      this.setState({
        showPopupApp: !this.state.showPopupApp,
        appName: this.state.updateField
      });
    }


    redirectToUpload() {
      let path = '/Upload?name='+this.state.name;
      this.props.history.push(path);
    }

    redirectToDashboard(){
      let path = '/Dashboard';
      this.props.history.push(path);
    }

    redirectToHome () {
      let path = '/Home';
      this.props.history.push(path);
    }
    setSearchType = (event) => {
      let value = event.target.value
      this.setState({
        searchType: value
      })
      // this.setState({ searchType: event.target.value });
    }
    render () {
      const { classes } = this.props;
    return (

          <div className="backgroundGradient">
          <br /><br /><br />
          <img src={logo} alt="logo" />
          <h1 style={{fontSize: 50}}> Decentralized Marketplace </h1>
          <div>
          <h1 style={{color: "black"}}> {this.state.name} </h1>
          <view style={{flexDirection: 'row'}}>
          <Button variant="contained" onClick={ this.redirectToUpload.bind(this) }>
               Upload New
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="contained" onClick={ this.redirectToDashboard.bind(this) }>
               Dashboard
          </Button>
          </view>
          </div>
        <div className= "root">
          <form className= "formControl" component="fieldset" onSubmit={ this.handleContractLoginSubmit }>

          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender2"
              value={this.state.searchType}
              onChange={this.setSearchType}
            >
              <FormControlLabel
                value="api"
                control={<Radio color="primary" />}
                label="API"
                labelPlacement="start"
              />
              <FormControlLabel
                value="application"
                control={<Radio color="primary" />}
                label="App"
                labelPlacement="start"
              />
              <FormControlLabel
                value="user"
                control={<Radio color="primary" />}
                label="User"
                labelPlacement="start"
              />
            </RadioGroup>
          </FormControl>
             <br />
             <br />
             <Button variant="contained"  type="submit" onClick={this.handleContractLoginSubmit.bind(this)}>
                 fetch
             </Button>
        </form>
      </div>
        <br />
        <div>
        { this.state.output.length > 0 &&
          this.state.output.map((values, i) => {
            return (
              <Button key={i} variant="contained" color="default" onClick={() => {this.handleSearch(values[0])}}>
                  {values}
              </Button>
            );
          })

        }

        </div>
        <br /> <br />
        {
          this.state.showPopupAPI &&
          <PopupAPI text='Update API' apiName={this.state.apiName} closePopup={this.togglePopupAPI} />
        }
        {
          this.state.showPopupApp &&
          <PopupApp text='Update Application' appName={this.state.updateField} closePopup={this.togglePopupApp} />
        }

        <br />
        { this.state.outputDetails.length > 0 && (
          <div  className={classes.root} >
            <div className={classes.root}>
                <Toolbar>
                  <Typography variant="h6" color="inherit">
                    Details
                  </Typography>
                </Toolbar>
            </div>
            <div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              {this.state.outputDetails.map((values, i) => (

                <Grid  item>
                  {
                    values.map((item, index)=>{
                      return (
                        <Paper key={index}>
                         {item}
                        </Paper>
                       )
                    })
                  }
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        </div>
        <br/>
        <Button variant="contained" color="default" onClick={() => {this.displayPopup(this.state.outputType)}}>
            Add Version
        </Button>
        </div>)
        }

      </div>
    );
  }
}
export default  withStyles(styles)(EntityDetails);


class PopupAPI extends Component {
  constructor (props) {
    super (props);
    const ABI = JSON.stringify(Properties.ABI_VALUE);
    const ABI_Array = JSON.parse(ABI);
    const MyContract = window.web3.eth.contract(ABI_Array);

        this.state = {
          ContractInstance: MyContract.at (Properties.ADDRESS),
          ApiVersion: '',
          APIUrl: '',
          apiName: this.props.apiName

        }
        this.handleUpdateAPI = this.handleUpdateAPI.bind(this);
      }

      handleUpdateAPI= (event)=> {
        console.log('Inside handleUpdateAPI');
        event.preventDefault ();

        const { addApiVersion} = this.state.ContractInstance;
        const { apiName } = this.props;
        const { ApiVersion: apiVersion } = this.state;
        const { APIUrl: url } = this.state;

        console.log('details', this.state.apiName, apiVersion, url);
        addApiVersion ( this.state.apiName, apiVersion,url, (err, result) => {

          console.log ('Updating API',result);
          alert(' API updated successfully');
        })
      }

  render() {
    return (

      <div className='popup'>
        <div className='popup_inner'>

          <h1>{this.props.text}</h1>
          <form onSubmit={ this.handleUpdateAPI}>

            <input
              type="text"
              name="state-change"
              placeholder="Enter Version"
              value ={ this.props.ApiVersion}
              onChange={ event => this.setState ({ ApiVersion: event.target.value }) } />
            <br /><br/>

            <input
              type="text"
              name="state-change"
              placeholder="Enter URL"
              value ={ this.props.APIUrl}
              onChange={ event => this.setState ({ APIUrl: event.target.value }) } />
            <br /><br/>

          <view style={{flexDirection: 'row'}}>
          <Button variant="contained" color="default" type="submit"> Submit </Button>
          &nbsp;&nbsp;
        <Button variant="contained" color="default" onClick={this.props.closePopup}> Close </Button>
        </view>
            </form>

        </div>
      </div>
    );
  }
}


class PopupApp extends Component {

  constructor (props) {
    super (props);
    const ABI = JSON.stringify(Properties.ABI_VALUE);
    const ABI_Array = JSON.parse(ABI);
    const MyContract = window.web3.eth.contract(ABI_Array);
    console.log(props.appName)
    this.state = {
      ContractInstance: MyContract.at (Properties.ADDRESS),
      showMenu: false,
      apiName: '',
      apiVersions: [],
      selectedVersions: [],
      selectedVersion: '',
      AppVersion:'',
      appName: props.appName
    }
    this.handleUpdateApp = this.handleUpdateApp.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  addVersionToSelectedVersions = ()  => {
    let finalVersion = this.state.apiName+'/'+this.state.selectedVersion;
    this.setState({
      selectedVersions: [...this.state.selectedVersions, finalVersion],
      apiName: '',
      selectVersion: '',
      apiVersions: []
    });

    console.log(this.state.selectedVersions);
  }
  selectVersion = ({target: {value}}) => {
    console.log('Selected version', value);
    this.setState({
      selectedVersion: value
    })
  }
  getVersionsFromAPI = () => {
    const { isApiExist } = this.state.ContractInstance;
    const { apiName } = this.state;
    console.log(apiName, " api name")
    isApiExist (apiName, (err,versions) => {
        if (err) {
          console.error ('An error occured::::', err);
        } else {
          console.log(versions);
          this.setState({
            apiVersions: this.hexToStr(versions)
          })
          console.log ('Versions Details::', this.hexToStr(versions));
        }
    });
  }

  hexToStr = (hex) => {
    var str = '';
    for (var i = 0; i < hex.length; i += 2) {
       var v = parseInt(hex.substr(i, 2), 16);
       if (v) str += String.fromCharCode(v);
    }

    let params = [];
    let res = "";
    for (var i=0; i<= str.length; i++){
      if(str.charCodeAt(i) > 31){
        res = res + str[i];
      }
      else{
        params.push(res);
        res = "";
      }
    }
    params.pop();

    return params;
  }

  handleDropdown(event) {
    event.preventDefault ();

    const { isApiExist } = this.state.ContractInstance;
    const { apiName: name } = this.state;

    isApiExist (name, (err,versions) => {
        if (err) {
          console.error ('An error occured::::', err);
        } else {
          console.log('versions:',versions);
          this.setState({
            apiVersions: this.hexToStr(versions)
          })
          console.log ('Versions Details::', this.hexToStr(versions));
        }
    });
    this.showMenu(event);
  }

      showMenu(event) {
          event.preventDefault();
          this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
          });
      }

      closeMenu(event) {
          this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
          });
      }


      handleUpdateApp (event) {
        event.preventDefault ();

        const { addAppVersion } = this.state.ContractInstance;
        const { appName } = this.props;
        const { AppVersion: appVersion } = this.state;
        const { AppUrl: url } = this.state;
        const { Appname: name } = this.state;

        console.log('details', this.state.appName, appVersion, url, this.state.selectedVersions.join(','));

        addAppVersion (
          this.state.appName, appVersion, url, this.state.selectedVersions.join(','),
           (err, result) => {
            console.log ('Uploading APP',result);
          }
        )
      }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>

          <h1>{this.props.text}</h1>
          <form onSubmit={ this.handleUpdateApp }>
          <input
            type="text"
            name="state-change"
            placeholder="Enter URL"
            value ={ this.props.AppUrl}
            onChange={ event => this.setState ({ AppUrl: event.target.value }) } />
          <br /><br/>
              <input
                type="text"
                name="state-change"
                placeholder="Enter App Version"
                value ={ this.state.AppVersion }
                onChange={ event => this.setState ({ AppVersion: event.target.value }) } />
                <br />
                <br />
                <input
                  type="text"
                  name="state-change"
                  placeholder="Enter Api Name"
                  value ={ this.state.apiName }
                  onChange={ event => this.setState ({ apiName: event.target.value }) } />
                  &nbsp;&nbsp;&nbsp;&nbsp;

                  <Button style={{width: 30}} variant="contained" color="default" onClick={this.getVersionsFromAPI}> Api </Button>
                  <div>
                  { this.state.apiVersions.length > 0 &&
                    ([<select
                      onChange={this.selectVersion}>
                        <option disabled selected value> Select API Version </option>
                        {
                          this.state.apiVersions.map((version, i) => {
                            return (
                            <option key={i} value={version}> { version } </option>
                            )
                          })
                        }
                      </select>,
                      <Button style={{height: 30}} variant="contained" color="default" onClick={this.addVersionToSelectedVersions}>Add Version</Button>
                    ])
                  }
                  </div>
                    <br />
                    <br />

          <view style={{flexDirection: 'row'}}>
            <Button variant="contained" color="default" type="submit"> Submit </Button>
        &nbsp;&nbsp;
        <Button variant="contained" color="default" onClick={this.props.closePopup}> Close </Button>
        </view>
        </form>
        </div>
      </div>
    );
  }
}
