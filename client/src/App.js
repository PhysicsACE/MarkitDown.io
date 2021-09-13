import { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link,
  NavLink as RRNavLink,
} from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import WorkspacePage from './pages/WorkspacePage';
import IndexPage from './pages/IndexPage';
import SharedPage from './pages/SharedPage';
import './App.css';

class App extends Component {

  state = {
    type: 'index'
  }

  toggleType = () => {
    this.setState((state) => ({
      type: state.type === 'index' ? 'shared' : 'index'
    }))
  }

  render() {
    const navbarHeight = '56px';
    return (
      <Router>
        <>
          <Navbar
            color="dark"
            dark
            expand="md"
            style={{ flexShrink: 0, height: navbarHeight }}
          >
            <NavbarBrand tag={Link} to="/">
              MarkitDown.io
            </NavbarBrand>
            <Nav navbar />
            <Nav navbar>
              <NavItem>
                <NavLink tag={RRNavLink} to='/shared'>
                  Shared
                </NavLink>
              </NavItem>
            </Nav>
          </Navbar>
          <div
            style={{ height: `calc(100% - ${navbarHeight})`, overflow: 'none' }}
          >
            <Switch>
              <Route exact path="/" component={IndexPage} />
              <Route exact path="/workspace/:id" component={WorkspacePage} />
              <Route exact path='/shared' component={SharedPage} />
              {/* <Route exact path="/">
                <IndexPage toggleType={this.toggleType}/>
              </Route>
              <Route exact path="/workspace/:id">
                <WorkspacePage type={this.state.type}/>
              </Route> */}
              {/* <Route exact path='/shared'>
                <SharedPage toggleType={this.toggleType}/>
              </Route> */}
              {/* <Route exact path="/workspace/:id" render={props => <WorkspacePage {...props} type={this.state.type} />} /> */}
              {/* <Route exact path="/workspace/:id" component={WorkspacePage} /> */}
            </Switch>
          </div>
        </>
      </Router>
    );
  }
}

export default App;
