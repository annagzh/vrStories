import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import FriendList from './components/FriendList.jsx';
import MediaFrame from './components/MediaFrame.jsx';
import Dashboard from './components/Dashboard.jsx';
import { Header, Container, Segment, Grid, Button } from 'semantic-ui-react';
import { BrowserRouter, Switch, Route, hashHistory } from 'react-router-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      dashboard: false
    };
    this.verify = this.verify.bind(this);

  }

  componentDidMount() {
    this.verify();
    console.log('this:', this);
    // this.Router.props.history.listen(function(ev) {
    //   console.log('listen', ev.pathname);
    // });
  }

  verify() {
    axios.get('/verify')
      .then(response => {
        this.setState({
          authenticated: response.data
        });
      });
  }

  getDashboard() {
    axios.get('/dashboard')
      .then(() => {
        this.setState({
          dashboard: true
        })
      })
  }

  render () {
    const { authenticated, user } = this.state;
    // if (dashboard) {
    //   return <Dashboard/>
    // } else {
      return (
        <div>
        <Switch>
        <Route path="/dashboard" component={Dashboard}/>
        </Switch>

        <div>
          {!authenticated
            ? <Grid>
            <Grid.Row color='black' id='login'>
              <Button href='/login' floated='left'>Login with Facebook</Button>
            </Grid.Row>

            <Grid.Row color='black' id='banner' textAlign='center'>
              <Header inverted >
                VRStories
              </Header>
            </Grid.Row>

            <Grid.Row id='tag'>
              GitHub: positivepotatoes
            </Grid.Row>
          </Grid>
          : <Home/>
      }
    </div>

    </div>
  );

    // }
  }
}


ReactDOM.render((
  <BrowserRouter history={hashHistory}>
    <App />
  </BrowserRouter>
), document.getElementById('app'));
