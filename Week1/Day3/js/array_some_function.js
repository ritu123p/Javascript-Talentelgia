const users = [
    {
      id: 1,
      name: "Charlie Davis",
      age: 28,
      email: "john.doe@example.com",
      address: "123 Main St, Anytown, USA",
      phone: "555-1234",
      isActive: true,
      role: "admin",
      createdAt: "2023-01-01",
      updatedAt: "2023-01-10"
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 34,
      email: "jane.smith@example.com",
      address: "456 Elm St, Othertown, USA",
      phone: "555-5678",
      isActive: false,
      role: "user",
      createdAt: "2023-02-01",
      updatedAt: "2023-02-10"
    },
    {
      id: 3,
      name: "Alice Johnson",
      age: 25,
      email: "alice.johnson@example.com",
      address: "789 Oak St, Sometown, USA",
      phone: "555-8765",
      isActive: true,
      role: "user",
      createdAt: "2023-03-01",
      updatedAt: "2023-03-10"
    },
    {
      id: 4,
      name: "Bob Brown",
      age: 45,
      email: "bob.brown@example.com",
      address: "101 Pine St, Anycity, USA",
      phone: "555-4321",
      isActive: false,
      role: "moderator",
      createdAt: "2023-04-01",
      updatedAt: "2023-04-10"
    },
    {
      id: 5,
      name: "Charlie Davis",
      age: 30,
      email: "charlie.davis@example.com",
      address: "202 Maple St, Anyville, USA",
      phone: "555-6789",
      isActive: true,
      role: "user",
      createdAt: "2023-05-01",
      updatedAt: "2023-05-10"
    }
  ];

  const userAge = (user) => user.age <= 20;

  console.log(users.some(userAge));