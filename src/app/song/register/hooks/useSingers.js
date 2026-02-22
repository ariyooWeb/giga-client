import { useState, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL, getAuthHeaders } from "../api";

export const useSingers = () => {
  const [singers, setSingers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchSingers = useCallback(async (name_kor) => {
    if (!name_kor) {
      setSingers([]);
      return [];
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/singers?name_kor=${name_kor}`,
        { headers: getAuthHeaders() }
      );
      // The response structure from swagger is { data: { items: [...] } }
      const fetchedSingers = response.data.items || [];
      setSingers(fetchedSingers);
      return fetchedSingers;
    } catch (err) {
      console.error("Failed to fetch singers:", err);
      setError("가수 목록을 불러오는데 실패했습니다.");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createSinger = useCallback(async (name_kor) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/singers`,
        {
          name_eng: "X", // As per instruction
          name_kor: name_kor,
          region: "Korea", // As per instruction
        },
        { headers: getAuthHeaders() }
      );
      // The response structure from swagger for POST is { data: { id: 0, name: "string" } }
      return response.data;
    } catch (err) {
      console.error("Failed to create singer:", err);
      setError("가수 생성에 실패했습니다.");
      throw err; // Re-throw to allow further error handling in useSongRegistration
    } finally {
      setLoading(false);
    }
  }, []);

  return { singers, loading, error, searchSingers, createSinger };
};
