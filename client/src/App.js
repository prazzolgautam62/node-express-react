import React, { useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/Login';
import NotFound from '../components/NotFound';
import Landing from '../components/Landing';
import { UserContext } from '../context';
import { initialAuth,userReducer } from '../reducer/user';
import AdminRoute from '../routes/AdminRoute';
import Register from '../components/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [auth, dispatchUser] = useReducer(userReducer, initialAuth);
  return (
    <Router>
      <UserContext.Provider value={[auth, dispatchUser]}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />

          <Route
              path="/admin/*"
              element={
                auth.token ? (
                  <AdminRoute/>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
