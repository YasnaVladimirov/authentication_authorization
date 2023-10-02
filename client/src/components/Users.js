import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Users() {
  const [users, setUsers] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const signal = controller.signal;

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: signal
        });
        isMounted && setUsers(response.data);
      } catch (error) {
        if (!signal.aborted) {
          console.error("Error fetching users, ", error);
          navigate("/login", { state: { from: location } }, {replace: true});
        }
      }
    }
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    }
  }, []);

  return (
    <div>
      <h2>Users list</h2>
      {users?.length
        ? (<ul>
          {users.map(user => <li key={user.id}>{user.username}</li>)}
        </ul>)
        : <p>No users to display</p>}
    </div>
  )
}

export default Users