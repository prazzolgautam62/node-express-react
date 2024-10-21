import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserList from '../components/UserList';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import Landing from '../components/Landing';
import DashboardLayout from '../components/DashboardLayout';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />

          <Route
            path="/admin/*"
            element={
                <DashboardLayout>
                  <Routes>
                    <Route exact path="dashboard" element={<Dashboard />} />
                    <Route exact path="users" element={<UserList />} />
                  </Routes>
                </DashboardLayout>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
