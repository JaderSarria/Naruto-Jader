import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import CharacterDetail from "./pages/CharacterDetail/CharacterDetail";
import ClansList from "./pages/ClansList/ClansList";
import FavoritesList from "./pages/FavoritesList/FavoritesList";
import CharacterCard from "./components/CharacterCard/CharacterCard";
import { db } from "./Firebase/firebaseConfig";
import Village from "./pages/VillagueList/Village";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import KekkeiGenkaiList from "./pages/kekkei-genkaiList/KekkeiGenkaiList";
import AkatsukiList from "./pages/akatsukiList/AkatsukiList";
import Personajes from "./pages/Personajes/Personajes";
import About from "./pages/About/About";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const fetchAllCharacters = async () => {
    try {
      const response = await axios.get(
        "https://dattebayo-api.onrender.com/characters"
      );
      setCharacters(response.data.characters);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data from API", error);
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "favorites"));
      const favoritesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFavorites(favoritesData);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const addFavorite = async (character) => {
    try {
      const docRef = await addDoc(collection(db, "favorites"), character);
      setFavorites([...favorites, { ...character, id: docRef.id }]);
      console.log("Character added to favorites:", character.name);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await deleteDoc(doc(db, "favorites", id));
      setFavorites(favorites.filter((favorite) => favorite.id !== id));
      console.log("Character removed from favorites");
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  useEffect(() => {
    fetchAllCharacters();
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="sharingon">
          <div className="ring">
            <div className="to"></div>
            <div className="to"></div>
            <div className="to"></div>
            <div className="circle"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <div className="App">
        <div className="main-content">
          <Routes>
            <Route
              path="/inicio"
              element={<CharacterCard characters={characters} />}
            />
            <Route
              path="/"
              element={<CharacterCard characters={characters} />}
            />
            <Route path="/characters/:id" element={<CharacterDetail />} />
            <Route path="/favorites" element={<FavoritesList />} />
            <Route path="/clans" element={<ClansList />} />
            <Route path="/aldeas" element={<Village />} />
            <Route path="/kekkei-genkai" element={<KekkeiGenkaiList />} />
            <Route path="/akatsuki" element={<AkatsukiList />} />
            <Route path="/personajes" element={<Personajes />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
