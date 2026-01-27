const API_URL = 'http://localhost:3001';

export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  weight?: number;
  height?: number;
  age?: number;
  gender?: 'masculino' | 'feminino';
  activityLevel?: 'sedentario' | 'regularmente' | 'ativo' | 'muito-ativo';
  neckCircumference?: number;
  waistCircumference?: number;
  hipCircumference?: number;
};

export const api = {
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_URL}/users`);
    return response.json();
  },

  async getUserById(id: number): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`);
    return response.json();
  },

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response.json();
  },

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return response.json();
  },

  async login(email: string, password: string): Promise<User | null> {
    const users = await this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
  },
};
