import React, {useEffect} from "react";
import NavBar from "./NavBar";
import { useNavigate } from 'react-router-dom';
import useAuth from "../hooks/use-auth";

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const {auth} = useAuth();

  useEffect(() => {
    if(!auth.token){
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