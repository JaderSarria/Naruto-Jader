import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Personajes.css";
import CharacterCard from "../../components/CharacterCard/CharacterCard";

const Personajes = () => {
  const [allCharacters, setAllCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  const fetchCharacters = async (page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dattebayo-api.onrender.com/characters?page=${page}&pageSize=${pageSize}`
      );

      // Verificamos que no se agreguen personajes duplicados
      const newCharacters = response.data.characters;
      setAllCharacters((prevCharacters) => {
        const uniqueCharacters = [...prevCharacters];

        // Agregamos solo los personajes que no están en el estado actual
        newCharacters.forEach((character) => {
          if (
            !uniqueCharacters.some(
              (prevCharacter) => prevCharacter.id === character.id
            )
          ) {
            uniqueCharacters.push(character);
          }
        });

        return uniqueCharacters;
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching characters from API", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const loadMoreCharacters = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

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
    <div className="personajes-list">
      <h1>Todos los Personajes</h1>
      <CharacterCard characters={allCharacters} />
      {loading && <p>Loading...</p>}
      {!loading && (
        <button onClick={loadMoreCharacters} className="load-more">
          Cargar más personajes
        </button>
      )}
    </div>
  );
};

export default Personajes;
