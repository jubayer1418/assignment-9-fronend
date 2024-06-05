const AdminDashboard = () => {
  const users = [
    {
      id: 1,
      username: "admin",
      email: "admin@example.com",
      role: "Admin",
      active: true,
    },
    {
      id: 2,
      username: "user1",
      email: "user1@example.com",
      role: "User",
      active: true,
    },
    {
      id: 3,
      username: "user2",
      email: "user2@example.com",
      role: "User",
      active: false,
    },
  ];

  return (
    <div className="flex justify-center items-center text-5xl text-gradient">
      <h1>Dashboard</h1>
    </div>
  );
};

export default AdminDashboard;
