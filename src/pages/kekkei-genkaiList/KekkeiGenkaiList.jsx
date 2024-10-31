import React, { useEffect, useState } from "react";
import axios from "axios";
import "./KekkeiGenkaiList.css";

const KekkeiGenkaiList = () => {
  const [kekkeiGenkaiList, setKekkeiGenkaiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 20;
  const total = 39; // Total de kekkei genkai según la API

  const fetchAllKekkeiGenkai = async () => {
    try {
      let page = 1;
      let allKekkeiGenkai = [];
      const totalPages = Math.ceil(total / pageSize);

      while (page <= totalPages) {
        const response = await axios.get(
          `https://dattebayo-api.onrender.com/kekkei-genkai?page=${page}&pageSize=${pageSize}`
        );

        const { data } = response;
        allKekkeiGenkai = [...allKekkeiGenkai, ...data["kekkei-genkai"]];
        page += 1;
      }

      setKekkeiGenkaiList(allKekkeiGenkai);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching kekkei genkai from API", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllKekkeiGenkai();
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
    <div className="kekkei-genkai-list">
      <h1>Lista de Kekkei Genkai</h1>
      <ul>
        {kekkeiGenkaiList.map((kg) => (
          <li key={kg.id}>
            <h2>{kg.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KekkeiGenkaiList;
