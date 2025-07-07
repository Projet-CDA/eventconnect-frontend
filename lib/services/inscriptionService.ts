const API_BASE_URL = "http://localhost:3000/api";

export interface Inscription {
  id: number;
  evenement_id: number;
  utilisateur_id: number;
  date_inscription: string;
  statut: string;
}

export interface InscriptionData {
  evenement_id: number;
  utilisateur_id: number;
}

// Récupérer les inscriptions d'un événement
export const getEventInscriptions = async (
  eventId: string | number
): Promise<Inscription[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/inscriptions?evenement_id=${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des inscriptions");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur getEventInscriptions:", error);
    throw error;
  }
};

// Compter les inscriptions d'un événement
export const getInscriptionCount = async (
  eventId: string | number
): Promise<number> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/inscriptions/count/${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors du comptage des inscriptions");
    }

    const data = await response.json();
    return data.count || 0;
  } catch (error) {
    console.error("Erreur getInscriptionCount:", error);
    throw error;
  }
};

// S'inscrire à un événement
export const subscribeToEvent = async (
  inscriptionData: InscriptionData
): Promise<Inscription> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/inscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(inscriptionData),
    });

    if (!response.ok) {
      let errorMessage = `Erreur lors de l'inscription (code ${response.status})`;
      const responseText = await response.text();
      try {
        const errorData = JSON.parse(responseText);
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        if (responseText) errorMessage = responseText;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur subscribeToEvent:", error);
    throw error;
  }
};

// Se désinscrire d'un événement
export const unsubscribeFromEvent = async (
  inscriptionId: number
): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/inscriptions/${inscriptionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de la désinscription");
    }

    return true;
  } catch (error) {
    console.error("Erreur unsubscribeFromEvent:", error);
    throw error;
  }
};

// Vérifier si l'utilisateur est inscrit à un événement
export const checkUserInscription = async (
  eventId: string | number,
  userId: number
): Promise<Inscription | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/inscriptions?evenement_id=${eventId}&utilisateur_id=${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur lors de la vérification de l'inscription");
    }

    const inscriptions = await response.json();
    return inscriptions.length > 0 ? inscriptions[0] : null;
  } catch (error) {
    console.error("Erreur checkUserInscription:", error);
    throw error;
  }
};
