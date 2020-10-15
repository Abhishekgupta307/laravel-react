import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import "./signup.css";
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';

export default class Signup extends Component {
 
  constructor(props) {
    super(props);
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    this.state = {
      signupData: {
        name: "",
        email: "",
        phone: "",
        password: "",
        isLoading: "",
      },
      msg: "",
    };
    this.onChangehandler=this.onChangehandler.bind(this)
    this.onSubmitHandler=this.onSubmitHandler.bind(this)
  }

  onChangehandler(e)  {
    const { signupData } = this.state;
    signupData[e.target.name] = e.target.value;
    this.setState({ signupData });
  };
  onSubmitHandler(e) {
    e.preventDefault();
    if (this.validator.fieldValid('email') && this.validator.fieldValid('name') && this.validator.fieldValid('phone') 
    && this.validator.fieldValid('password')) {
     
      this.setState({ isLoading: true });
    axios.post("api/user-signup", this.state.signupData)
      .then((response) => {
           
        this.setState({ isLoading: false });
        if (response.data.status === 200) {
            this.validator.hideMessages();
                this.setState({
            msg: response.data.message,
                });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 2000);
             
        }

        if (response.data.status === "failed") {
          this.setState({ msg: response.data.message });
          setTimeout(() => {
            this.setState({ msg: "" });
          }, 10000);
        }
      });
      
    }
    else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  render() {
    const isLoading = this.state.isLoading;
    return (
      <div>
        <Form className="containers shadow">
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="name"
              name="name"
              placeholder="Enter name"
              value={this.state.signupData.name}
              onChange={this.onChangehandler}
              onBlur={() => this.validator.showMessageFor('name')}
            />
            <span style={{color:'red'}}>{this.validator.message('name', this.state.signupData.name, 'required|min:3')}</span>
						
          </FormGroup>
          <FormGroup>
            <Label for="email">Email id</Label>
            <Input
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.signupData.email}
              onChange={this.onChangehandler}
              onBlur={() => this.validator.showMessageFor('email')}
            />
            <span style={{color:'red'}}>{this.validator.message('email', this.state.signupData.email, 'required|email')}</span>
          </FormGroup>
          <FormGroup>
            <Label for="phone">Phone Number</Label>
            <Input
              type="phone"
              name="phone"
              placeholder="Enter phone number"
              value={this.state.signupData.phone}
              onChange={this.onChangehandler}
              onBlur={() => this.validator.showMessageFor('phone')}
            />
            <span style={{color:'red'}}>{this.validator.message('phone', this.state.signupData.phone, 'required|phone')}</span>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.signupData.password}
              onChange={this.onChangehandler}
              onBlur={() => this.validator.showMessageFor('password')}
            />
            <span style={{color:'red'}}>{this.validator.message('password', this.state.signupData.password, 'required|min:6')}</span>
          </FormGroup>
          <p className="text-white">{this.state.msg}</p>
          <Button
            className="text-center mb-4"
            color="success"
            onClick={this.onSubmitHandler}
          >
            Sign Up
            {isLoading ? (
              <span
                className="spinner-border spinner-border-sm ml-5"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <span></span>
            )}
          </Button>
          <Link to="/sign-in" className="text-white ml-5">I'm already member</Link>
        </Form>
      </div>
    );
  }
}
