import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from '../components/UserList';
import Dashboard from '../components/Dashboard';
import DashboardLayout from '../components/DashboardLayout';

function AdminRoute() {
  return (
    <DashboardLayout>
        <Routes>
          <Route exact path="dashboard" element={<Dashboard />} />
          <Route exact path="users" element={<UserList />} />
        </Routes>
    </DashboardLayout>
  );
}

export default AdminRoute;
