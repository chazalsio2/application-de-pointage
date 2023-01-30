import './App.css';
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'

import AuthPage from './pages/Auth'
import BookingPage from './pages/Bookings'
import EventPage from './pages/Event'
import Nav from './components/Navigation/nav'
import AuthContext from './context/auth-context'
import React, { Component } from 'react';

class App extends Component  {
  state = {
    token: null,
    userId: null,
  };
  login=(token,userId,TokenExpiration) => {
    this.setState({ token: token, userId: userId})
  }
  logout = ()=> {
    this.setState({ token: null, userId: null})
  }
  render(){
console.log(this.state.token);
  return (
    <Router>
      <React.Fragment>
        <AuthContext.Provider value={{ token:this.state.token,userId:this.state.userId,login:this.login,logout:this.logout }}>
        <Nav/>
          <main className="my-20 mx-10">
            <Routes>
              {!this.state.token && <Route path="/" element={<Navigate replace to="/auth"/>}/>}
              {this.state.token && <Route path="/" element={<Navigate replace to="/event"/>}/>}
              {this.state.token && <Route path="/auth" element={<Navigate replace to="/event"/>}/>}
              {!this.state.token &&<Route exact path="/auth" element={<AuthPage/>}/>}
              {this.state.token &&<Route exact path="/booking" element={<BookingPage/>}/>}
              {this.state.token &&<Route exact path="/event" element={<EventPage/>}/>}
            </Routes>
            </main>
        </AuthContext.Provider>
      </React.Fragment>
    </Router>);
  }
}

export default App;
