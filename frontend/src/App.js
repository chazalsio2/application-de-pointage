import './App.css';
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'

import AuthPage from './pages/Auth'
import BookingPage from './pages/Bookings'
import EventPage from './pages/Event'
import Nav from './components/Navigation/nav'


function App() {
  return (
    <>
    <Router>
    <Nav/>
    <main className="my-20 mx-10">
      <Routes>
        <Route path="/" element={<Navigate replace to="/auth"/>}/>
        <Route exact path="/auth" element={<AuthPage/>}/>
        <Route exact path="/booking" element={<BookingPage/>}/>
        <Route exact path="/event" element={<EventPage/>}/>
      </Routes>
      </main>
    </Router>
  </>);
}

export default App;
