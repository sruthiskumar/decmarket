import React, { Component } from 'react';
import logo from '../logo.svg';
import { Properties } from './Properties.js';
import Button from '@material-ui/core/Button';

class PopupAPI extends Component {
  constructor (props) {
    super (props);
    const ABI = JSON.stringify(Properties.ABI_VALUE);
    const ABI_Array = JSON.parse(ABI);
    const MyContract = window.web3.eth.contract(ABI_Array);

        this.state = {
          ContractInstance: MyContract.at (Properties.ADDRESS),
          APIKey: '',
          EntityId: '',
          ApiVersion: '',
          APIUrl: '',
          APIname: '',
          entityName: this.props.entityName

        }
        this.handleUploadAPI = this.handleUploadAPI.bind(this);

      }

      handleUploadAPI= (event)=> {
        console.log('Inside handleUploadAPI');
        event.preventDefault ();

        const { registerApi, isApiNameUnique } = this.state.ContractInstance;
        const { APIname: name } = this.state;
        const { APIKey: key } = this.state;
        const { entityName } = this.props;
        const { ApiVersion: apiVersion } = this.state;
        const { APIUrl: url } = this.state;

        console.log('details', name, key , this.state.entityName,apiVersion,url);

        isApiNameUnique (
          name,
          (err, res) => {
            if(err) {
              alert('isApiNameUnique, Api Name registration Failed');
           } else {
               let IsExistApiName = this.state.ContractInstance.IsExistApiName();
               IsExistApiName.watch( (err, result) => {
                 if (err) {
                    console.log('could not get event IsExistApiName()')
                 } else {
                    console.log('Value is : ', result.args.value);
                    if (result.args.value === true) {
                      registerApi (key, name, this.state.entityName, apiVersion,url, (err, result) => {
                        console.log ('Uploading API',result);
                        if(err) {
                          console.log('Upload Failed', err);
                        } else {
                          console.log('Uploaded successfully : ');
                          alert(' API uploaded successfully');
                        }
                      })
                    } else {
                      alert('API Name already exist');
                    }
                  }
                })
              }
          })      
      }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>

          <h1>{this.props.text}</h1>
          <form onSubmit={ this.handleUploadAPI}>

          <input
            type="text"
            name="state-change"
            placeholder="Enter Name"
            valuekey ={ this.props.APIname }
            onChange={ event => this.setState ({ APIname: event.target.value }) } />
              <br />
              <br />

          <input
            type="text"
            name="state-change"
            placeholder="Enter Key"
            valuekey ={ this.props.APIKey }
            onChange={ event => this.setState ({ APIKey: event.target.value }) } />
            <br /><br/>

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

    this.state = {
      ContractInstance: MyContract.at (Properties.ADDRESS),
      showMenu: false,
      apiName: '',
      apiVersions: [],
      selectedVersions: [],
      selectedVersion: '',
      AppVersion:'',
      entityName: this.props.entityName
    }
    this.handleUploadApp = this.handleUploadApp.bind(this);
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


      handleUploadApp (event) {
        event.preventDefault ();

        const { registerApp } = this.state.ContractInstance;
        const { isAppNameUnique } =this.state.ContractInstance;
        const { AppKey: key } = this.state;
        const { entityName } = this.props;
        const { AppVersion: appVersion } = this.state;
        const { AppUrl: url } = this.state;
        const { Appname: name } = this.state;

        console.log('details', key , this.state.entityName,appVersion,url,this.state.selectedVersions.join(','));

        isAppNameUnique (
          name ,
          (err, res) => {
            if(err) {
              alert('isAppNameUnique, App Name registration Failed');
           } else {
               let IsExistAppName = this.state.ContractInstance.IsExistAppName();
               IsExistAppName.watch( (err, result) => {
                 if (err) {
                    console.log('could not get event IsExistAppName()')
                 } else {
                    console.log('Value is : ', result.args.value);
                    if (result.args.value === true) {
                      registerApp (
                        key, name, this.state.entityName, appVersion, url, this.state.selectedVersions.join(','),
                         (err, result) => {
                          console.log ('Uploading APP',result);
                          if(!err) {
                            console.log('Uploaded successfully : ');
                            alert(' App uploaded successfully');        
                          }
                        }
                      )
                    } else {
                      alert('APP Name already exist');
                    }
                  }
                })
              }
          })
    }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>

          <h1>{this.props.text}</h1>
          <form onSubmit={ this.handleUploadApp }>
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
            placeholder="Enter Key"
            value ={ this.state.AppKey }
            onChange={ event => this.setState ({ AppKey: event.target.value }) } />
            <br /><br/>
            <input
              type="text"
              name="state-change"
              placeholder="Enter Name"
              value ={ this.state.Appname }
              onChange={ event => this.setState ({ Appname: event.target.value }) } />
              <br />
              <br />
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

class PopupUser extends Component {
  constructor (props) {
    super (props);
    const ABI = JSON.stringify(Properties.ABI_VALUE);
    const ABI_Array = JSON.parse(ABI);
    const MyContract = window.web3.eth.contract(ABI_Array);

        this.state = {
          ContractInstance: MyContract.at (Properties.ADDRESS),
        }
        this.handleAddUser = this.handleAddUser.bind(this);
      }

      handleAddUser (event) {
        event.preventDefault ();

        const { addUserToEntity } = this.state.ContractInstance;
        const { isUserAlreadyRegistered } = this.state.ContractInstance;
        const { Username: name } = this.state;
        const { UserKey: key } = this.state;

        isUserAlreadyRegistered(key, (err,res) => {

          if(!err) {
              let isUserExist = this.state.ContractInstance.IsUserRegistered();
              isUserExist.watch( (err,res ) => {
                console.log('Pop up Event value is : ', res.args.value);
                if(res.args.value === false) {
                  alert('Register First');
                } else {

                  addUserToEntity (
                    name,key,
                     (err, result) => {
                      console.log ('Adding User',result);
                    }
                  );

                }
              })
        }
      });

    }

  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>

          <h1>{this.props.text}</h1>
          <form onSubmit={ this.handleAddUser }>
            <input
                type="text"
                name="state-change"
                placeholder="Enter Identifier"
                valuekey ={ this.props.UserKey }
                onChange={ event => this.setState ({ UserKey: event.target.value }) } />
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


class Upload extends Component {
  constructor (props) {
    super (props);
    const ABI = JSON.stringify(Properties.ABI_VALUE);
    const ABI_Array = JSON.parse(ABI);
    const MyContract = window.web3.eth.contract(ABI_Array);
    var name = props.location.search;
    name = name.substring(1,name.length);
    name = name.split('=')[1];


    console.log(name, ' eeeeeenttititiiti');

        this.state = {
          ContractInstance: MyContract.at (Properties.ADDRESS),
          showPopupAPI: false,
          showPopupApp: false,
          showPopupUser: false,
          name: name

        }
        this.togglePopupAPI = this.togglePopupAPI.bind(this);
        this.togglePopupApp = this.togglePopupApp.bind(this);
        this.togglePopupUser = this.togglePopupUser.bind(this);

      }

      redirectToEntity () {
        let path = '/registerEntity';
        this.props.history.push(path);
      }

      redirectToEntityDetails(){
        let path = '/entityDetails';
        this.props.history.push(path);
      }

      redirectToDashboard(){
        let path = '/Dashboard';
        this.props.history.push(path);
      }

      togglePopupAPI() {
        this.setState({
          showPopupAPI: !this.state.showPopupAPI
        });
      }
      togglePopupApp() {
        this.setState({
          showPopupApp: !this.state.showPopupApp
        });
      }
      togglePopupUser() {
        this.setState({
          showPopupUser: !this.state.showPopupUser
        });
      }

  render () {
    console.log(this.state.name)
    return (
      <div className="backgroundGradient">
      <br /><br /><br />
          <img src={logo} alt="logo" />
          <h5 style={{fontSize: 50}}> Decentralized Marketplace </h5>
          <br />
          <h1> Upload </h1>
          <br/>
          <view style={{flexDirection: 'row'}}>
            <Button variant="contained" color="default"
            onClick={ this.togglePopupAPI }> API</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="default"
            onClick={this.togglePopupApp.bind(this)}> Application </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
            <Button variant="contained" color="default"
            onClick={this.togglePopupUser.bind(this)}> User</Button>
          </view>
        {this.state.showPopupAPI ?
          <PopupAPI text='Upload API' entityName={this.state.name} closePopup={this.togglePopupAPI} />
          : null
        }
        {this.state.showPopupApp ?
          <PopupApp text='Upload Application' entityName={this.state.name} closePopup={this.togglePopupApp} />
          : null
        }
        {this.state.showPopupUser ?
          <PopupUser text='Add User' closePopup={this.togglePopupUser} />
          : null
        }

        <br /><br /><br />
        <Button variant="contained" color="default"
        onClick={this.redirectToDashboard.bind(this)}> Dashboard</Button>
      </div>
    );
  }
}
export default Upload;
