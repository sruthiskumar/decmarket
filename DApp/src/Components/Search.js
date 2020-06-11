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


class Search extends Component {
  tags = ['Version', 'URL', 'APIs']
  userTags = ['URL', 'Public Key']
  constructor (props) {
    super (props);
    const ABI = JSON.stringify(Properties.ABI_VALUE);
    const ABI_Array = JSON.parse(ABI);
    const MyContract = window.web3.eth.contract(ABI_Array);

    this.state = {
      ContractInstance: MyContract.at (Properties.ADDRESS),
      contractKey: '',
      contractName:'',
      searchInput: '',
      searchType: '',
      output: [],
      outputType: ''
    }

    this.handleContractLoginSubmit = this.handleContractLoginSubmit.bind(this);
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

      searchFunction(this.state.searchInput, (err, output) => {
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
        this.setState({output: Object.values(info), outputType: searchType})
      })
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
          <div className="search">
          <input
              id="outlined-full-width"
              placeholder="Search"
              variant="outlined"
              InputLabelProps={{
              shrink: true,
              }}
              onChange={ event => this.setState ({ searchInput: event.target.value }) }
          />
          </div>
        <div className= "root">
          <form className= "formControl" component="fieldset" onSubmit={ this.handleContractLoginSubmit }>
          <FormControl component="fieldset">
            <FormLabel component="legend">MarketPlace</FormLabel>
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

              <Button variant="contained"  type="submit">
                  Search
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" onClick={this.redirectToHome.bind(this)}>
                   Home
              </Button>

        </form>
      </div>
        <br />
        { this.state.output.length > 0 && (
          <div>
            <div className={classes.root}>
                <Toolbar>
                  <Typography variant="h6" color="inherit">
                    Search Results
                  </Typography>
                </Toolbar>
            </div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              {this.state.output.map((values, i) => (
                <Grid key={i} item>
                  {
                    values.map((item, index)=>{
                      return (<Paper key={index}>
                        <span style={{fontWeight: "bold"}}>{this.state.outputType === 'user'? this.userTags[index]: this.tags[index]} </span> : {item}
                      </Paper>)
                    })
                  }
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        </div>)
        }
      </div>
    );
  }
}
export default  withStyles(styles)(Search);
