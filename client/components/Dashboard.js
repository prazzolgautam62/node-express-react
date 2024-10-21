import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [user,setUser] = useState({});

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData.user);
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
    </div>
  );
};

export default Dashboard;
