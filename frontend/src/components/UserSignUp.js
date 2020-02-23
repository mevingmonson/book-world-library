import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import backendInstance from "../api";
import { withRouter } from "react-router-dom";

// gradient taken from https://uigradients.com/#LoveCouple
const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(to top right, #3a6186, #89253e)"
};

const formStyle = {
  padding: "3%",
  borderRadius: "20px",
  background: "#f1f1f1",
  boxShadow: "3px -1px 20px 1px rgba(230,230,230,0.5)"
};

class SignUp extends React.Component {
  state = {
    fullname: "",
    username: "",
    email: "",
    password: "",
    repassword: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    // omit repassword and copy everything else
    let { repassword, ...data } = this.state;

    backendInstance
      .post("/user", data)
      .then(res => {
        alert("Successful. Redirecting to Sign In Page");
        this.props.history.push("/signin");
      })
      .catch(err => {
        alert("Something went wrong.");
      });
  };

  render() {
    return (
      // It's totally possbile to use Bootstrap classes like you do with normal HTML
      // You can also use bootstrap classes
      <div style={containerStyle} className="pt-5">
        <div
          className="offset-md-3 offset-lg-4 col-md-6 col-lg-4"
          style={formStyle}
        >
          <Form className="pr-2 pl-2" onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                placeholder="Enter full name"
                name="fullname"
                value={this.state.fullname}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control
                placeholder="Desired username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="repassword"
                value={this.state.repassword}
                onChange={this.handleChange}
              />
            </Form.Group>
            <div className="text-right">
              <Button
                variant="primary"
                type="submit"
                style={{ border: "none", backgroundColor: "#0b60bb" }}
              >
                Submit
              </Button>
            </div>
          </Form>

          <p className="mt-5 text-center">
            Already have an account? <Link to="/signin">Sign In Here</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
