import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" })); 
app.use(express.json());

interface User {
  id: number;
  firstName: string;
  lastName: string;
  groupName: string;
  role: string;
  expectedSalary: number;
  expectedDateOfDefense: string;
}

let users: User[] = []; // In-memory database

app.get("/users", (req: Request, res: Response<User[]>) => {
  res.json(users);
});

app.post("/users", (req: Request, res: Response<User>) => {
  const newUser: User = { id: Date.now(), ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req: Request, res: Response<User | { message: string }>) => {
  const { id } = req.params;
  const index = users.findIndex(user => user.id === parseInt(id));
  
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.delete("/users/:id", (req: Request, res: Response<{ message: string }>) => {
  users = users.filter(user => user.id !== parseInt(req.params.id));
  res.json({ message: "User deleted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
