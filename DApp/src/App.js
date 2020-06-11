import React, { Component } from 'react';

import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from './Components/Home';
import Register from './Components/Register';
import RegisterEntity from './Components/RegisterEntity';
import Dashboard from './Components/Dashboard';
import Upload from './Components/Upload';
import Search from './Components/Search';
import EntityDetails from './Components/EntityDetails';



class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route exact path="/" component={Home} />
					<Route path="/search" component={Search} />
					<Route path="/home" component={Home} />
					<Route path="/register" component={Register} />
					<Route path="/registerEntity" component ={RegisterEntity} />
					<Route path="/Dashboard" component ={Dashboard} />
					<Route path="/Upload" component ={Upload} />
					<Route path="/entityDetails" component={EntityDetails} />
				
				</div>
			</Router>
		);
	}
}

export default App;
