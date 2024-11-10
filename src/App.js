import './App.css';
import {  Routes, Route, Navigate, HashRouter} from 'react-router-dom';
import { useState } from 'react';
import Aboutus from './homePage/Aboutus';
import Contactus from './homePage/Contactus';
import LoginPage from './loginAuthentication/LoginPage';
import Dashboard from './IssueManagement/Dashboardview/Dashboard';
import IssueCreationPage from './IssueManagement/IssueCrud/IssueCreationPage';
import PagenotFound from './homePage/PagenotFound';
import HeaderNavbarLogin from './homePage/HeaderNavbarLogin';
import Home from './homePage/Home';
import Footer from './homePage/Footer';
import FetchApi from './fetchApiData/FetchApi';
import Demo from './homePage/Demo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const loginData = JSON.parse(localStorage.getItem("loggedInData") || "{}");
  const [isLoggedinUser, setLoggedInUser] = useState(loginData?.loginSuccess === true);

  return(
    //we use HashRouter instead of BrowserRouter to avoid 404 error in production build when page refreshed
    <HashRouter>
    <div>
      <ToastContainer/>
      {isLoggedinUser && 
        <HeaderNavbarLogin 
          isLoggedinUser={loginData}
          setLoggedInUser={setLoggedInUser}
        />
      }
      <Routes>
        {isLoggedinUser === true ? (
          <>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/issuecreate" element={<IssueCreationPage/>}/>
            <Route path="/fetch-api" element={<FetchApi/>}/>
            <Route path="/demo-tasks" element={<Demo/>}/>
            <Route path="/aboutus" element={<Aboutus/>}/>
            <Route path="/contactus" element={<Contactus/>}/>

            <Route path="/pagenotfound" element={<PagenotFound/>}/>
            <Route path="*" element={<Navigate to="/pagenotfound" replace/>}/>
          </>)
          : (
          <>
            <Route path="/" element={<LoginPage setLoggedInUser={setLoggedInUser}/>}/>
            <Route path="*" element={<Navigate to="/" replace/>}/>
          </>)
        }
      </Routes>
      {isLoggedinUser && <Footer/>}
    </div>
    </HashRouter>
  );
}

export default App;
