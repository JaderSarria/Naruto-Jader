import React from "react";
import { Link } from "react-router-dom";
import "./CharacterCard.css";

const CharacterCard = ({ characters }) => {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <div className="card" key={character.id}>
          <Link
            to={`/characters/${character.id}`}
            state={{ character }}
            className="card-link"
          >
            <img
              src={character.images[0]}
              alt={character.name}
              className="card-image"
            />
            <div className="card-content">
              <h2>{character.name}</h2>
              <p>
                <strong>Id:</strong> {character.id}
              </p>
              <p>
                <strong>Clan:</strong>{" "}
                {character.personal.clan || "Desconocido"}
              </p>
              <p>
                <strong>Sexo:</strong>{" "}
                {character.personal.sex || "No disponible"}
              </p>
              <p>
                <strong>Cumpleaños:</strong> {character.personal.birthdate}
              </p>
              <p>
                <strong>Familia:</strong>{" "}
                {character.family?.mother || "No disponible"},{" "}
                {character.family?.father || "No disponible"}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CharacterCard;
