import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/use-auth';

const Dashboard = () => {
  const [user,setUser] = useState({});
  const {auth} = useAuth();

  return (
    <div>
      <h1>Welcome, {auth?.user?.name}</h1>
    </div>
  );
};

export default Dashboard;
