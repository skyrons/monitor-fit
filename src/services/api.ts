const API_URL = 'http://localhost:3001';

const SERVER_UNAVAILABLE_MSG =
  'Servidor indisponível. Inicie o JSON Server com: npm run server';

async function handleResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  let data: T;
  try {
    data = (text ? JSON.parse(text) : {}) as T;
  } catch {
    data = {} as T;
  }
  if (!response.ok) {
    throw new Error(
      response.status === 404 || response.status >= 500
        ? SERVER_UNAVAILABLE_MSG
        : (data as { message?: string })?.message ?? 'Erro na requisição'
    );
  }
  return data;
}

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

export type Macronutrientes = {
  proteinas_g: number | null;
  lipideos_g: number | null;
  carboidratos_g: number | null;
};

export type Micronutrientes = {
  umidade_pct: number | null;
  energia_kcal: number | null;
  energia_kj: number | null;
  colesterol_mg: number | null;
  fibra_alimentar_g: number | null;
  cinzas_g: number | null;
  calcio_mg: number | null;
  magnesio_mg: number | null;
  manganes_mg: number | null;
  fosforo_mg: number | null;
  ferro_mg: number | null;
  sodio_mg: number | null;
  potassio_mg: number | null;
  cobre_mg: number | null;
  zinco_mg: number | null;
  retinol_mcg: number | null;
  re_mcg: number | null;
  rae_mcg: number | null;
  tiamina_mg: number | null;
  riboflavina_mg: number | null;
  piridoxina_mg: number | null;
  niacina_mg: number | null;
  vitamina_c_mg: number | null;
};

export type Alimento = {
  id: number;
  descricao: string;
  macronutrientes: Macronutrientes;
  micronutrientes: Micronutrientes;
};

export const api = {
  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${API_URL}/users`);
      return handleResponse<User[]>(response);
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        throw new Error(SERVER_UNAVAILABLE_MSG);
      }
      throw err;
    }
  },

  async getUserById(id: number): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/users/${id}`);
      return handleResponse<User>(response);
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        throw new Error(SERVER_UNAVAILABLE_MSG);
      }
      throw err;
    }
  },

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      return handleResponse<User>(response);
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        throw new Error(SERVER_UNAVAILABLE_MSG);
      }
      throw err;
    }
  },

  async updateUser(id: number, user: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      return handleResponse<User>(response);
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        throw new Error(SERVER_UNAVAILABLE_MSG);
      }
      throw err;
    }
  },

  async login(email: string, password: string): Promise<User | null> {
    const users = await this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
  },

  async getAlimentos(): Promise<Alimento[]> {
    try {
      const response = await fetch(`${API_URL}/alimentos`);
      return handleResponse<Alimento[]>(response);
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        throw new Error(SERVER_UNAVAILABLE_MSG);
      }
      throw err;
    }
  },

  async searchAlimentosPorNome(nome: string): Promise<Alimento[]> {
    try {
      const response = await fetch(`${API_URL}/alimentos`);
      const todos = await handleResponse<Alimento[]>(response);
      const termo = nome.trim().toLowerCase();
      if (!termo) return todos;
      return todos.filter((a) =>
        a.descricao.toLowerCase().includes(termo)
      );
    } catch (err) {
      if (err instanceof TypeError && err.message.includes('fetch')) {
        throw new Error(SERVER_UNAVAILABLE_MSG);
      }
      throw err;
    }
  },
};
