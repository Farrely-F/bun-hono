import { generateUUID } from "../utils/uuid";

class User {
  id: string;
  name: string;
  email: string;
  password: string;

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static users: User[] = [
    new User(
      "14f15366-82ba-4aaa-aaaa-aaaaaaaaaaaa",
      "Alice",
      "pD6Kj@example.com",
      "123456789"
    ),
    new User(
      "14f15366-82ba-4aaa-aaaa-aaaaaaaaaaab",
      "Bob",
      "pD6Kj@example.com",
      "123456789"
    ),
    new User(
      "cfac0e11-3d65-4555-9555-555555555555",
      "Charlie",
      "pD6Kj@example.com",
      "123456789"
    ),
  ];

  static async findAll(): Promise<User[]> {
    return this.users;
  }

  static async create(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const user = this.users.find((u) => u.email === email);
    if (user) {
      throw new Error("User already exists");
    }

    switch (true) {
      case !name:
        throw new Error("Name is required");
      case !email:
        throw new Error("Email is required");
      case !email.includes("@"):
        throw new Error("Invalid email");
      case !password || password.trim().length < 6 || password.includes(" "):
        throw new Error(
          !password
            ? "Password is required"
            : password.includes(" ")
            ? "Password cannot have spaces"
            : "Password too short"
        );
    }

    const newUser = new User(generateUUID(), name, email, password);
    this.users.push(newUser);
    return newUser;
  }

  static async login(email: string, password: string): Promise<User> {
    const user = this.users.find((u) => u.email === email);

    if (user) {
      if (user?.password !== password) {
        throw new Error("Invalid password");
      }
      return user;
    }

    throw new Error("Invalid Email, user not found");
  }
}

export { User };
