import React, { useEffect, useState } from "react";
import { getRequest } from "../../services/apiGateway";
import { API_ROUTES } from "../../services/apiRoutes";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRequest(API_ROUTES.USERS)
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load users");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} – {user.email}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
