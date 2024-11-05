import React, { useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserList from '../components/UserList';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import Landing from '../components/Landing';
import DashboardLayout from '../components/DashboardLayout';
import { UserContext } from '../context';
import { initialAuth,userReducer } from '../reducer/user';

function App() {
  const [auth, dispatchUser] = useReducer(userReducer, initialAuth);
  return (
    <Router>
      <UserContext.Provider value={[auth, dispatchUser]}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />

          <Route
              path="/admin/*"
              element={
                auth.token ? (
                  <DashboardLayout>
                    <Routes>
                      <Route exact path="dashboard" element={<Dashboard />} />
                      <Route exact path="users" element={<UserList />} />
                    </Routes>
                  </DashboardLayout>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
        </Routes>
      </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
