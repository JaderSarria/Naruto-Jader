import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1>Jader Sambony</h1>
        <p>
          Soy un estudiante de ingeniería de sistemas apasionado por la
          programación y el diseño web. Actualmente, estoy trabajando en un
          proyecto interactivo basado en el universo de <strong>Naruto</strong>,
          que permite a los usuarios explorar clanes y personajes de este
          icónico mundo ninja.
        </p>
        <h2>Características del Proyecto</h2>
        <ul>
          <li>
            <strong>Exploración de Personajes:</strong> Los usuarios pueden ver
            una lista de personajes, incluyendo imágenes, nombres y detalles
            relevantes.
          </li>
          <li>
            <strong>Listado de Clanes:</strong> Sección dedicada a aprender
            sobre los clanes y sus historias.
          </li>
          <li>
            <strong>Favoritos:</strong> Opción para guardar personajes favoritos
            utilizando Firestore.
          </li>
          <li>
            <strong>Diseño Atractivo:</strong> Interfaz estilizada con tarjetas
            visualmente atractivas y un fondo animado.
          </li>
        </ul>
        <h2>Mi Experiencia como Ingeniero</h2>
        <p>
          Como estudiante de ingeniería de sistemas, he desarrollado habilidades
          en programación y diseño web. He trabajado con tecnologías como React,
          Axios y Firestore, lo que me ha permitido crear aplicaciones
          interactivas y funcionales. Este proyecto de Naruto es una excelente
          oportunidad para aplicar mis conocimientos y seguir aprendiendo en un
          campo que me apasiona.
        </p>
      </div>
      <img className="about-image" src="/yo.jpg" alt="Jader Sambony" />
    </div>
  );
};

export default About;
