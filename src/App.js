import './App.css';
import {  Routes, Route, BrowserRouter, Navigate} from 'react-router-dom';
import { useState } from 'react';
import Aboutus from './HomePage/Aboutus';
import Contactus from './HomePage/Contactus';
import LoginPage from './LoginAuthentication/LoginPage';
import Dashboard from './IssueManagement/Dashboardview/Dashboard';
import IssueCreationPage from './IssueManagement/IssueCrud/IssueCreationPage';
import PagenotFound from './HomePage/PagenotFound';
import HeaderNavbarLogin from './HomePage/HeaderNavbarLogin';
import Home from './HomePage/Home';
import Footer from './HomePage/Footer';
import FetchApi from './FetchApiData/FetchApi';
import Demo from './HomePage/Demo';

export function App() {
  const loginData = JSON.parse(localStorage.getItem("loggedInData") || "{}");
  const [isLoggedinUser, setLoggedInUser] = useState(loginData?.loginSuccess === true);

  return(
    <BrowserRouter>
    <div>
      {isLoggedinUser && 
        <HeaderNavbarLogin 
          isLoggedinUser={loginData}
          setLoggedInUser={setLoggedInUser}
        />
      }
      <Routes>
        {isLoggedinUser === true ? (
          <>
            <Route path="/" element={<LoginPage/>}/>
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
    </BrowserRouter>
  );
}

export default App;
