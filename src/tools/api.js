const API_BASE_URL = "http://1.231.152.182:3333/api/v1";

export const loginApi = async (loginId, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ loginId, password }),
  });

  if (!response.status === "success") {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};

// 서버 상태 확인 API
export const checkHealthApi = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
    });

    if (!response.ok) {
      // 서버가 응답은 하지만 200번대 코드가 아닐 경우
      throw new Error(`Server status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // 네트워크 연결 자체가 실패하거나 서버가 꺼져있을 경우
    console.error("Health check failed:", error);
    throw error;
  }
};
