const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function getIdeas() {
  const res = await fetch(`${API_URL}/api/ideas`);
    if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || errorData.error || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}