// import { useEffect, useState } from "react";
// // import { EmployeeData,employeeData } from "./componnets/EmpData/EmpData";
// import { EmployeeData,employeeData } from "../EmpData/EmpData";
// import "./App.css";
 
// function CRUDOperations() {
//   // Correct useState with proper typing
//   const [data, setData] = useState<EmployeeData[]>([]);

//   // Set data when component mounts
//   useEffect(() => {
//     setData(employeeData);
//   }, []);

//   return (
//     <div className="APP">
//       <h1>Employee List</h1>
//       <table >
//         <thead>
//           <tr>
//             <th>Sr.No</th>
//             <th>Id</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Age</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index}>
//               <td>{index + 1}</td>
//               <td>{item.id}</td>
//               <td>{item.firstName}</td> {/* Fixed from firsName to firstName */}
//               <td>{item.lastName}</td>
//               <td>{item.age}</td>
//               <td>
//                 <button className="btn btn-primary">Edit</button>&nbsp;
//                 <button className="btn btn-danger">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CRUDOperations;
