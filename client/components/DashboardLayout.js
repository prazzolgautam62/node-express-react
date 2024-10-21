import React, {useEffect} from "react";
import NavBar from "./NavBar";
import { useNavigate } from 'react-router-dom';

function DashboardLayout({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'));
    let isAuthenticated = (user ? !!user.token : false);
    if(!isAuthenticated){
      navigate('/login');
    }
  },[])

    return (
      <>
        <NavBar />
        <div className="container">{children}</div>
      </>
    );
  }

  export default DashboardLayout;