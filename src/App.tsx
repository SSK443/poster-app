import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { login,logout } from './store/features/authSlice';
import authService from './appwrite/auth';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';

function App() {
const[isLoading,setIsloading]=useState<boolean>(true);
const dispatch=useDispatch();


useEffect(() => {
  authService
    .currentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData));
      } else {
        dispatch(logout());
      }
    })
    .catch((error) => {
      console.log("Error in currentUser:", error);
    })
    .finally(() => setIsloading(false));
}, []);

return !isLoading?(

  <div className='min-h-screen w-full bg-gray-500'>
    <div>
      <Header/>
    <main>
  {    <Outlet/>}
    </main>
      <Footer/>
    </div>

  </div>
):(null)
  

}

export default App
