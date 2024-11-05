import React, { useState, useEffect } from 'react';
import { Badge, ListGroup } from 'react-bootstrap';
import { _getAllUsers } from '../services/user';
import useAuth from '../hooks/use-auth';

const UserList = () => {
  const {auth} = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await _getAllUsers();
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    
    getAllUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      <ListGroup>
        {users.map(user => (
           <ListGroup.Item key={user.id}>{user.name} - {user.email} {auth.user.id == user.id ?  <Badge pill bg="primary">Logged In</Badge> : ''}  </ListGroup.Item>
        ))}
        </ListGroup>
    </div>
  );
};

export default UserList;
