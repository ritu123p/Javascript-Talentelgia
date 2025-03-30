// import { useEffect, useState }  from "react";
// import "../App.css"
// type User={
//     id:number;
//     title:string;
//     res:string;
//     firstName:string;
//     lastName:string;
//     age:number;

// }
// // Define the structure of the API response
// type ApiResponse = {
//     users: User[];
//   };
// const API_URL="https://dummyjson.com/users";
// function table(){
//     const [users,setUsers]=useState<User[]>([])
//     useEffect(()=>{
//         fetch(API_URL)
//         .then((response)=>response.json())
//         .then((data:ApiResponse)=>{
//             console.log(data)
//             setUsers(data.users)
//         })
//         .catch((err)=>{
//             console.log(err)
//         });
//     },[])
//     return(
//         <>
//         <div className="container">
//       <div >
//         <h2 >User List</h2>
//         <ul>
//           {users.map((user) => (
//             <li key={user.id}>
//               <div className="main">
//                 <p >
//                   {user.firstName} {user.lastName}
//                 </p>
//                 <p >Age:{user.age}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//         </>
//     );
// }
// export default table

import React from "react";

import { useEffect, useState } from "react";
import "../src/App.css" ;

// Define the structure of the User object
type User = {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  age: number;
};

// Define the structure of the API response
type ApiResponse = {
  users: User[];
};

const API_URL = "https://dummyjson.com/users";

function Table() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log(data); // Debugging
        setUsers(data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container">
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <div className="main">
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p>Age: {user.age}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Table;
