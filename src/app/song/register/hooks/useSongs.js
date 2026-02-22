import { useState, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL, getAuthHeaders } from "../api";

export const useSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchSongs = useCallback(async (singer_id, song_name) => {
    if (!singer_id || !song_name) {
      setSongs([]);
      return [];
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/songs?singer_id=${singer_id}&song_name=${song_name}`,
        { headers: getAuthHeaders() }
      );
      // The response structure from swagger is { data: { items: [...] } }
      const fetchedSongs = response.data.items || [];
      setSongs(fetchedSongs);
      return fetchedSongs;
    } catch (err) {
      console.error("Failed to fetch songs:", err);
      setError("곡 목록을 불러오는데 실패했습니다.");
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const createSong = useCallback(async (song_name, singer_id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/songs`,
        {
          song_name: song_name,
          singer_id: singer_id, // This will be the dynamic singer_id, not hardcoded 1
        },
        { headers: getAuthHeaders() }
      );
      // The response structure from swagger for POST is { data: { id: 0, song_name: "string", singer: {} } }
      return response.data;
    } catch (err) {
      console.error("Failed to create song:", err);
      setError("곡 생성에 실패했습니다.");
      throw err; // Re-throw to allow further error handling in useSongRegistration
    } finally {
      setLoading(false);
    }
  }, []);

  return { songs, loading, error, searchSongs, createSong };
};
