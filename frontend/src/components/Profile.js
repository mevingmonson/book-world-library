import React from "react";
import backendInstance from '../api';
import { withRouter } from 'react-router-dom';


class Profile extends React.Component {
  componentDidMount() {
    backendInstance.get('/user/self')
      .then(res => {
        this.setState({ fullname: res.data.fullname, loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }

  state = {
    fullname: "",
    loading: true
  }

  logout = () => {
    localStorage.setItem("token", "");
    this.props.history.push('/signin');
  };

  render() {
    if (this.state.loading) {
      return (
        <div>
          <div>Loading Image</div>
        </div>
      )
    }
    return (
      <div>
        <h1>Profile Page</h1>
        <h3>Welcome {this.state.fullname}</h3>
        <button onClick={this.logout}>logout</button>
      </div>
    );
  }
}

export default withRouter(Profile);
