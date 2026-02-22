import { useState, useCallback, useEffect } from "react";
import { useSingers } from "./useSingers";
import { useSongs } from "./useSongs";

export const useSongRegistration = () => {
  const {
    singers: fetchedSingers,
    loading: singersLoading,
    error: singersError,
    searchSingers,
    createSinger,
  } = useSingers();
  const {
    songs: fetchedSongs,
    loading: songsLoading,
    error: songsError,
    searchSongs,
    createSong,
  } = useSongs();

  const [singerNameInput, setSingerNameInput] = useState("");
  const [songTitleInput, setSongTitleInput] = useState("");

  const [currentSingers, setCurrentSingers] = useState([]);
  const [selectedSinger, setSelectedSinger] = useState(null); // Full singer object
  const [singerExists, setSingerExists] = useState(false);

  const [currentSongs, setCurrentSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null); // Full song object
  const [songExists, setSongExists] = useState(false);

  const [registrationLoading, setRegistrationLoading] = useState(false);
  const [registrationError, setRegistrationError] = useState(null);

  // Effect to update currentSingers and singerExists based on fetchedSingers
  useEffect(() => {
    setCurrentSingers(fetchedSingers);
    if (fetchedSingers.length > 0) {
      setSingerExists(true);
      // Auto-select if there's an exact match or single result and no singer currently selected
      const exactMatch = fetchedSingers.find(s => s.name === singerNameInput);
      if (exactMatch && (!selectedSinger || selectedSinger.id !== exactMatch.id)) {
        setSelectedSinger(exactMatch);
      } else if (fetchedSingers.length === 1 && (!selectedSinger || selectedSinger.id !== fetchedSingers[0].id)) {
        setSelectedSinger(fetchedSingers[0]);
      } else if (selectedSinger && !fetchedSingers.some(s => s.id === selectedSinger.id)) {
        // If previously selected singer is no longer in results, deselect
        setSelectedSinger(null);
      }
    } else {
      setSingerExists(false);
      setSelectedSinger(null); // Clear selected singer if no singers match
    }
  }, [fetchedSingers, singerNameInput, selectedSinger]);

  // Effect to update currentSongs and songExists based on fetchedSongs
  useEffect(() => {
    setCurrentSongs(fetchedSongs);
    if (fetchedSongs.length > 0) {
      setSongExists(true);
      const exactMatch = fetchedSongs.find(s => s.song_name === songTitleInput);
      if (exactMatch && (!selectedSong || selectedSong.id !== exactMatch.id)) {
        setSelectedSong(exactMatch);
      } else if (fetchedSongs.length === 1 && (!selectedSong || selectedSong.id !== fetchedSongs[0].id)) {
        setSelectedSong(fetchedSongs[0]);
      } else if (selectedSong && !fetchedSongs.some(s => s.id === selectedSong.id)) {
        // If previously selected song is no longer in results, deselect
        setSelectedSong(null);
      }
    } else {
      setSongExists(false);
      setSelectedSong(null); // Clear selected song if no songs match
    }
  }, [fetchedSongs, songTitleInput, selectedSong]);


  const handleSingerNameInputChange = useCallback((name) => {
    setSingerNameInput(name);
    // Trigger search after a short delay to prevent too many API calls
    // For now, call directly, will add debounce later if needed
    if (name.length > 0) {
      searchSingers(name);
    } else {
      setCurrentSingers([]);
      setSingerExists(false);
      setSelectedSinger(null);
    }
  }, [searchSingers]);

  const handleSongTitleInputChange = useCallback((title) => {
    setSongTitleInput(title);
    if (title.length > 0 && selectedSinger) {
      searchSongs(selectedSinger.id, title);
    } else {
      setCurrentSongs([]);
      setSongExists(false);
      setSelectedSong(null);
    }
  }, [selectedSinger, searchSongs]);

  const registerSong = useCallback(async () => {
    setRegistrationLoading(true);
    setRegistrationError(null);

    try {
      let finalSinger = selectedSinger;
      let finalSingerId = selectedSinger?.id;

      // Case 3 (existing singer, existing song) check
      if (singerExists && songExists && finalSinger?.name_kor === singerNameInput && selectedSong?.song_name === songTitleInput) {
        alert("이미 등록된 정보입니다");
        setRegistrationLoading(false);
        return;
      }

      // Case 1 & 2: Handle Singer Creation if not existing or not selected
      if (!finalSinger || finalSinger.name_kor !== singerNameInput) {
        // This means the input singerNameInput is new or not yet selected
        // Check if there's an exact match in currentSingers that might not be selected yet
        const exactMatch = currentSingers.find(s => s.name_kor === singerNameInput);
        if (exactMatch) {
          finalSinger = exactMatch;
          finalSingerId = exactMatch.id;
          setSingerExists(true);
          setSelectedSinger(exactMatch);
        } else {
          // Case 1: Singer does not exist, create new singer
          const newSingerData = await createSinger(singerNameInput);
          finalSinger = { id: newSingerData.id, name_kor: singerNameInput, name_eng: "X", region: "Korea" }; // Assuming this structure
          finalSingerId = newSingerData.id;
          setSingerExists(true);
          setSelectedSinger(finalSinger);
          alert(`새 가수 '${singerNameInput}' 등록 완료.`);
        }
      }

      // After ensuring singer is finalized, register song
      if (!finalSingerId) {
        throw new Error("가수 정보가 유효하지 않습니다.");
      }

      // Case 2 or 1: Song does not exist or input songTitle is new
      if (!songExists || selectedSong?.song_name !== songTitleInput) {
        // Check if there's an exact match in currentSongs that might not be selected yet
        const exactMatchSong = currentSongs.find(s => s.song_name === songTitleInput && s.singer?.id === finalSingerId);
        if (exactMatchSong) {
          // If song exists for this singer but wasn't selected, mark as existing
          setSongExists(true);
          setSelectedSong(exactMatchSong);
          alert("이미 등록된 곡 정보입니다 (가수는 같지만 곡이 이미 존재)");
          setRegistrationLoading(false);
          return;
        } else {
          await createSong(songTitleInput, finalSingerId);
          alert("곡 등록이 완료되었습니다.");
          setSongExists(true); // Mark song as now existing
          // Optionally, re-search songs to update the list with the newly created one
          if (finalSinger) {
            searchSongs(finalSinger.id, songTitleInput);
          }
        }
      } else {
        // If song exists and is selected, but flow reached here (should be caught by Case 3)
        alert("이미 등록된 정보입니다 (가수와 곡 모두 일치)");
      }

    } catch (err) {
      console.error("Registration failed:", err);
      setRegistrationError(err.message || "등록 중 오류가 발생했습니다.");
    } finally {
      setRegistrationLoading(false);
    }
  }, [
    singerNameInput,
    songTitleInput,
    selectedSinger,
    selectedSong,
    singerExists,
    songExists,
    currentSingers,
    currentSongs,
    createSinger,
    createSong,
    searchSongs
  ]);

  return {
    singerNameInput,
    setSingerNameInput,
    songTitleInput,
    setSongTitleInput,
    singers: currentSingers,
    singersLoading: singersLoading,
    singersError,
    handleSingerNameInputChange,
    setSelectedSinger,
    selectedSinger,
    singerExists,
    songs: currentSongs,
    songsLoading: songsLoading,
    songsError,
    handleSongTitleInputChange,
    setSelectedSong,
    selectedSong,
    songExists,
    registerSong,
    registrationLoading,
    registrationError,
  };
};