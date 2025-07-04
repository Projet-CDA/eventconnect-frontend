const API_BASE_URL = "http://localhost:3000/api";

// Récupérer tous les événements
export const getAllEvents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/evenements`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des événements");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur getAllEvents:", error);
    throw error;
  }
};

// Récupérer un événement par ID
export const getEventById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/evenements/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la récupération de l'événement");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur getEventById:", error);
    throw error;
  }
};

// Créer un événement
export const createEvent = async (eventData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/evenements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création de l'événement");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur createEvent:", error);
    throw error;
  }
};

// Modifier un événement
export const updateEvent = async (id, eventData) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/evenements/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la modification de l'événement");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur updateEvent:", error);
    throw error;
  }
};

// Supprimer un événement
export const deleteEvent = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/evenements/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'événement");
    }

    return true;
  } catch (error) {
    console.error("Erreur deleteEvent:", error);
    throw error;
  }
};
