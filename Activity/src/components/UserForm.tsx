import { useState, useEffect } from "react";
import "../UserForm.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/users";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  groupName: string;
  role: string;
  expectedSalary: number;
  expectedDateOfDefense: string;
}

type FormData = Omit<User, "id">;

export default function UserForm() {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    groupName: "",
    role: "",
    expectedSalary: 0,
    expectedDateOfDefense: "",
  });

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch users");
        const data: User[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), 
      });

      if (!response.ok) throw new Error("Failed to add user");

      const newUser: User = await response.json();
      setUsers(prev => [...prev, newUser]);

      // This is for the form to reset after submission
      setFormData({
        firstName: "",
        lastName: "",
        groupName: "",
        role: "",
        expectedSalary: 0,
        expectedDateOfDefense: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="user-form-container">
      <h2>User Management</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" onChange={handleChange} value={formData.firstName} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} value={formData.lastName} required />
        <input name="groupName" placeholder="Group Name" onChange={handleChange} value={formData.groupName} required />
        <input name="role" placeholder="Role" onChange={handleChange} value={formData.role} required />
        <input name="expectedSalary" type="number" placeholder="Expected Salary" onChange={handleChange} value={formData.expectedSalary} required />
        <input name="expectedDateOfDefense" type="date" onChange={handleChange} value={formData.expectedDateOfDefense} required />
        <button type="submit" disabled={!formData.firstName || !formData.lastName || !formData.groupName || !formData.role}>
          Add User
        </button>
      </form>

      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.firstName} {user.lastName} ({user.role})
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}
