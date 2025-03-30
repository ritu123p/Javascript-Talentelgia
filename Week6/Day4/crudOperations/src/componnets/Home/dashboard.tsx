import { useEffect, useState } from "react";
import { EmployeeData,employeeData } from "../EmpData/EmpData"
// import "./App.css";
function Dashboard() {
  const [data, setData] = useState<EmployeeData[]>([]);
  const [firstName,setFirstName]=useState<string>("")
  const [lastName,setLastName]=useState<string>("")
  const [age,setAge]=useState<string>("")
  const[id,setId]=useState("")
  const [isupdate,setupdate]=useState(false)
  // Set data when component mounts
  useEffect(() => {
    setData(employeeData);
  }, []);

  const handleEdit=(id:number)=>{
    const dt:any=data.filter(item=>item.id===id)
    if(dt !==undefined)
    {
      setupdate(true)
      setId(id)
      setFirstName(dt[0].firstName)
      setLastName(dt[0].lastName)
      setAge(dt[0].age)

    }
  }
  const handleDelete=(id:number)=>{
    if(id>0){
      if(window.confirm("Are you sure to dlete this items ?")){
        const dt:any=data.filter(item=>item.id!==id);
      setData(dt)
      }
      
    }
  }
  const handleSave=(e:Event)=>{
    let error='';
    if(firstName==='')
      error+="first naem is required. "
    if(lastName==='')
      error+="last name id required. ";
    if(age <=0 )
      error+="Age is required";
    if(error==='')
      {
        e.preventDefault()
        const dt=[...data]
        const newObje={
          id:data.length+1,
          firstName:firstName.trim(),
          lastName:lastName.trim(),
          age:age
        }
        dt.push(newObje)
        setData(dt)
      }else{
        alert(error)
      }
   
  }
  const handleUpdate=()=>{
    const index=data.map((item)=>{
      return item.id
    }).indexOf(id);
    const dt=[...data];
    dt[index].firstName=firstName;
    dt[index].lastName=lastName;
    dt[index].age=age;

    setData(dt)
    handleClear();
  }
  const handleClear=()=>{
    setId('')
    setFirstName('')
    setLastName( '' )
    setAge('')
    setupdate(false)
     
  }
 
  return (
   <>
     

<div className="APP">
  {/* <Login_Sigup/> */}
      <h1>Employee List</h1>
      
      <div className="flex flex-col items-center space-y-4 bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
  <div className="w-full">
    <label className="block text-gray-700 font-semibold">First Name:</label>
    <input
      type="text"
      placeholder="Enter first name"
      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
      onChange={(e) => setFirstName(e.target.value)}
      value={firstName}
    />
  </div>

  <div className="w-full">
    <label className="block text-gray-700 font-semibold">Last Name:</label>
    <input
      type="text"
      placeholder="Enter last name"
      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
      onChange={(e) => setLastName(e.target.value)}
      value={lastName}
    />
  </div>

  <div className="w-full">
    <label className="block text-gray-700 font-semibold">Age:</label>
    <input
      type="text"
      placeholder="Enter your age"
      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
      onChange={(e) => setAge(e.target.value)}
      value={age}
    />
  </div>
   <div className="flex space-x-4">
          {
            !isupdate ?
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" onClick={(e)=>handleSave(e)}>Save</button>
            :
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition" onClick={()=>handleUpdate( )}>Update</button>

          }
        </div>
        <button
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
      onClick={() => handleClear()}
    >
      Clear
    </button>
</div>


      <table className="min-w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-blue-500 text-white">
    <tr>
      <th className="py-3 px-6 border-b">Sr.No</th>
      <th className="py-3 px-6 border-b">Id</th>
      <th className="py-3 px-6 border-b">First Name</th>
      <th className="py-3 px-6 border-b">Last Name</th>
      <th className="py-3 px-6 border-b">Age</th>
      <th className="py-3 px-6 border-b">Actions</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, index) => (
      <tr key={index} className="border-b hover:bg-gray-100 transition">
        <td className="py-2 px-4 text-center">{index + 1}</td>
        <td className="py-2 px-4 text-center">{item.id}</td>
        <td className="py-2 px-4 text-center">{item.firstName}</td>
        <td className="py-2 px-4 text-center">{item.lastName}</td>
        <td className="py-2 px-4 text-center">{item.age}</td>
        <td className="py-2 px-4 flex justify-center gap-2">
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
            onClick={() => handleEdit(item.id)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
   </>
   
  
 
  );
}

export default Dashboard;
