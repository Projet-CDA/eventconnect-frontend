const API_BASE_URL = "http://localhost:3000/api";

export interface LoginData {
  email: string;
  mot_de_passe: string;
}

export interface RegisterData {
  nom: string;
  email: string;
  mot_de_passe: string;
}

export interface AuthResponse {
  token: string;
  utilisateur: {
    id: number;
    nom: string;
    email: string;
  };
}

// Connexion utilisateur
export const loginUser = async (
  loginData: LoginData
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/utilisateurs/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de la connexion");
    }

    return data;
  } catch (error) {
    console.error("Erreur loginUser:", error);
    throw error;
  }
};

// Inscription utilisateur
export const registerUser = async (
  registerData: RegisterData
): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/utilisateurs/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de l'inscription");
    }

    return data;
  } catch (error) {
    console.error("Erreur registerUser:", error);
    throw error;
  }
};

// Vérification du token
export const verifyToken = async (): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const response = await fetch(`${API_BASE_URL}/utilisateurs/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.ok;
  } catch (error) {
    console.error("Erreur verifyToken:", error);
    return false;
  }
};
