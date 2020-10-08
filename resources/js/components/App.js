import React, { Component } from 'react'
import ReactDOM from 'react-dom'
//import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import ProjectsList from './ProjectsList'
import Register from './Register'
import NewProject from './NewProject'
import Signup from "./signUp/Signup";
import Signin from "./SignIn/Signin";
import Home from "./Home/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch,NavLink } from "react-router-dom";

class App extends Component {
	
	render() {
		let navLink = (
		  <div className="Tab">
			<NavLink to="/sign-in" activeClassName="activeLink" className="signIn">
			  Sign In
			</NavLink>
			<NavLink exact to="/" activeClassName="activeLink" className="signUp">
			  Sign Up
			</NavLink>
		  </div>
		);
		const login = localStorage.getItem("isLoggedIn");
	

		return (
			<div className="App">
			{login ? (
			 <BrowserRouter>
			 <div>
			   <Header />
			 
			   <Switch>
			   <Route exact path="/" component={Signup}></Route>
		   <Route path="/sign-in" component={Signin}></Route>
		   <Route path="/home" component={Home}></Route>
				   </Switch>
			 </div>
		   </BrowserRouter>
			) : (
				<BrowserRouter>
				<div>
				  <Header />
				
				  <Switch>
				  <Route exact path="/" component={Signup}></Route>
			  <Route path="/sign-in" component={Signin}></Route>
			  <Route path="/home" component={Home}></Route>
					  </Switch>
				</div>
			  </BrowserRouter>
			
			
			)}
		  </div>
			
		  )








		// return (
		//   <div className="App">
		// 	{login ? (
		// 	  <Router>
		// 		<Route exact path="/" component={Signup}></Route>
		// 		<Route path="/sign-in" component={Signin}></Route>
		// 		<Route path="/home" component={Home}></Route>
		// 	  </Router>
		// 	) : (
		// 	  <Router>
		// 		{navLink}
		// 		<Route exact path="/" component={Signup}></Route>
		// 		<Route path="/sign-in" component={Signin}></Route>
		// 		<Route path="/home" component={Home}></Route>
		// 	  </Router>
		// 	)}
		//   </div>
		// );
}
}

ReactDOM.render(<App />, document.getElementById('app'))