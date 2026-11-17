export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`Eroare server: ${res.status}`);
  }

  return res.status === 204 ? null : res.json();
}

export function fetchJocuri() {
  return request("/jocuri");
}

export function createJoc(joc) {
  return request("/jocuri", {
    method: "POST",
    body: JSON.stringify(joc),
  });
}

export function updateJoc(id, changes) {
  return request(`/jocuri/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deleteJoc(id) {
  return request(`/jocuri/${id}`, {
    method: "DELETE",
  });
}