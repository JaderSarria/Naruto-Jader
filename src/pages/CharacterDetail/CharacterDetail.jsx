import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import "./CharacterDetail.css";
import { db } from "../../Firebase/firebaseConfig";
import { collection, addDoc, deleteDoc, doc, getDoc } from "firebase/firestore";

const CharacterDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const characterFromLink = location.state?.character;

  const [character, setCharacter] = useState(characterFromLink);
  const [loading, setLoading] = useState(!characterFromLink);
  const [selectedImage, setSelectedImage] = useState(
    characterFromLink?.images[0] || ""
  );

  const [isFavorited, setIsFavorited] = useState(false); // Estado para manejar el favorito

  const handleFavoriteClick = async () => {
    const favoritesCollection = collection(db, "favorites");

    if (isFavorited) {
      // Elimina de favoritos si ya está marcado
      try {
        const favoriteDocRef = doc(favoritesCollection, character.id);
        await deleteDoc(favoriteDocRef);
        console.log("Favorito eliminado de Firestore");
      } catch (error) {
        console.error("Error al eliminar favorito:", error);
      }
    } else {
      // Agrega a favoritos si no está marcado
      try {
        await addDoc(favoritesCollection, { ...character });
        console.log("Favorito guardado en Firestore");
      } catch (error) {
        console.error("Error al guardar favorito:", error);
      }
    }

    setIsFavorited(!isFavorited);
  };

  useEffect(() => {
    const checkIfFavorited = async () => {
      const favoriteDocRef = doc(collection(db, "favorites"), character.id);
      const docSnap = await getDoc(favoriteDocRef);

      if (docSnap.exists()) {
        setIsFavorited(true);
      }
    };

    if (characterFromLink) {
      setCharacter(characterFromLink);
      setSelectedImage(characterFromLink.images[0]);
      setLoading(false);
      checkIfFavorited();
    }
  }, [characterFromLink]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!character) {
    return <p>No se encontró el personaje.</p>;
  }

  return (
    <div className="character-detail">
      <Link to="/">Regresar</Link>
      <div className="character-header">
        <h2>{character.name || "Nombre no disponible"}</h2>
        <div className="favorite-icon" onClick={handleFavoriteClick}>
          <i className={`fas fa-heart ${isFavorited ? "favorited" : ""}`}></i>
        </div>
      </div>

      <div className="image-container">
        <img src={selectedImage} alt={character.name} className="large-image" />
        <div className="thumbnail-container">
          {character.images && character.images.length > 0 ? (
            character.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${character.name} ${index + 1}`}
                className="thumbnail"
                onClick={() => setSelectedImage(image)}
              />
            ))
          ) : (
            <p>No hay imágenes disponibles.</p>
          )}
        </div>
      </div>
      <p>
        <strong>Id:</strong> {character.id}
      </p>
      <p>
        <strong>Clan:</strong> {character.personal?.clan || "Desconocido"}
      </p>
      <p>
        <strong>Sexo:</strong> {character.personal?.sex || "No disponible"}
      </p>
      <p>
        <strong>Edad:</strong>{" "}
        {character.personal.age
          ? Object.entries(character.personal.age).map(([stage, age]) => (
              <span key={stage}>
                {stage}: {age}
                <br />
              </span>
            ))
          : "No disponible"}
      </p>

      <p>
        <strong>Cumpleaños:</strong>{" "}
        {character.personal?.birthdate || "No disponible"}
      </p>
      <p>
        <strong>Familia:</strong>
        {character.family?.mother
          ? ` Madre: ${character.family.mother}`
          : " No disponible"}
        ,
        {character.family?.father
          ? ` Padre: ${character.family.father}`
          : " No disponible"}
        ,
        {character.family?.brother
          ? ` Hermano: ${character.family.brother}`
          : " No disponible"}
      </p>
      <p>
        <strong>Debut (Manga):</strong>{" "}
        {character.debut?.manga || "No disponible"}
      </p>
      <p>
        <strong>Debut (Anime):</strong>{" "}
        {character.debut?.anime || "No disponible"}
      </p>
      <p>
        <strong>Jutsus:</strong>{" "}
        {character.jutsu && character.jutsu.length > 0
          ? character.jutsu.join(", ")
          : "No disponible"}
      </p>
      <p>
        <strong>Tipo de naturaleza:</strong>{" "}
        {character.natureType && character.natureType.length > 0
          ? character.natureType.join(", ")
          : "No disponible"}
      </p>
      <p>
        <strong>Clasificación:</strong>{" "}
        {character.personal?.classification || "No disponible"}
      </p>
      <p>
        <strong>Herramientas:</strong>{" "}
        {character.tools && character.tools.length > 0
          ? character.tools.join(", ")
          : "No disponible"}
      </p>
      <p>
        <strong>Títulos:</strong>{" "}
        {character.personal?.titles?.join(", ") || "No disponible"}
      </p>
      <p>
        <strong>Actores de voz:</strong>{" "}
        {character.voiceActors?.japanese || "No disponible"}
      </p>
    </div>
  );
};

export default CharacterDetail;
