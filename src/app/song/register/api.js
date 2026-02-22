const API_BASE_URL = "http://1.231.152.182:3333/api/v1";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export { API_BASE_URL, getAuthHeaders };
