import { useEffect, useState } from "react";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const API = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    fetch(API)
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  return (  
    <div >
      <h2>Admin Panel</h2>
      {users.map((user) => (
        <h3 key={user.id} className="border-2 border-solid black">ID: {user.id}, Name: {user.name}</h3>
      ))}
    </div>
  );
};

export default Admin;
