const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getRequest = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
};
