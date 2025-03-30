// components/EmpData/EmpData.ts

export type EmployeeData = {
    id: number;
    firstName: string;
    lastName: string;
    age: string;
  };
  
export const employeeData: EmployeeData[] = [
    { id: 1, firstName: "Mark", lastName: "David", age: '20' },
    { id: 2, firstName: "John", lastName: "Doe", age: '30' },
    { id: 3, firstName: "Alice", lastName: "Smith", age: '40' },
    { id: 4, firstName: "Chris", lastName: "Brown", age: '25' },
    { id: 5, firstName: "Emily", lastName: "Clark", age: '22' },
  ];
  