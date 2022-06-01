import './App.css';
import {BrowserRouter, 
        Routes,
        Route} 
        from 'react-router-dom'

import Home from './Components/Home';
import DrinksByCategory from './Components/drinks/DrinksByCategory';
import DrinkDetail from './Components/drinks/DrinkDetail';
import NavBar from './Components/common/Navbar';
import Dashboard from './Components/admin/Dashboard'
import AddDrink from './Components/admin/AddDrink';
import SignUp from './Components/auth/SignUp'
import Profile from './Components/user/Profile'
import UserProvider from './Components/context/UserContext';
import Login from './Components/auth/Login';

function App() {
  return (
    <UserProvider>
        <BrowserRouter>
          <NavBar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/:client_id' element={<Home/>}/>
              <Route path='drinks/:name' element={<DrinksByCategory/>}/>
              <Route path='drinks/:id/details' element={<DrinkDetail/>}/>
              <Route path='admin/dashboard' element={<Dashboard/>}/>
              <Route path='admin/addDrink' element={<AddDrink/>}/>
              <Route path='SignUp' element={<SignUp/>}/>
              <Route path='myProfile' element={<Profile/>}/>
              <Route path='login' element={<Login/>}/>             
            </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
