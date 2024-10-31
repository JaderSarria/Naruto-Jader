import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <img
        id="imgLogo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Naruto_logo.svg/1200px-Naruto_logo.svg.png"
        alt="LogoSerie"
      />

      <nav className="nav-buttons">
        <Link to="/inicio" style={{ textDecoration: "none" }}>
          <button className="nav-button">
            <img src="/logok.png" alt="Logo" className="logo" />
            <p>Inicio</p>
          </button>
        </Link>

        <Link to="/personajes" style={{ textDecoration: "none" }}>
          <button className="nav-button">
            <img src="/personajes.png" alt="Personajes" className="logo" />
            <p>Personajes</p>
          </button>
        </Link>

        <Link to="/clans" style={{ textDecoration: "none" }}>
          <button className="nav-button">
            <img src="/clans.png" alt="Clans" className="logo" />
            <p>Clans</p>
          </button>
        </Link>

        <Link to="/aldeas" style={{ textDecoration: "none" }}>
          <button className="nav-button">
            <img src="/aldea.png" alt="Aldeas" className="logo" />
            <p>Aldeas</p>
          </button>
        </Link>

        <Link to="/kekkei-genkai" style={{ textDecoration: "none" }}>
          <button className="nav-button">
            <img src="/kgk.png" alt="Kekkei Genkai" className="logo" />
            <p>Kekkei Genkai</p>
          </button>
        </Link>

        <Link to="/akatsuki" style={{ textDecoration: "none" }}>
          <button className="nav-button">
            <img src="/akatsuki.png" alt="Akatsuki" className="logo" />
            <p>Akatsuki</p>
          </button>
        </Link>

        <Link to="/favorites" style={{ textDecoration: "none" }}>
          <button className="nav-button">
            <img src="/biju.png" alt="Biju" className="logo" />
            <p>Favoritos</p>
          </button>
        </Link>
      </nav>

      <div className="about-button">
        <Link to="/about" style={{ textDecoration: "none" }}>
          <button className="button">
            <p>About</p>
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
