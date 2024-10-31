import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Village.css";

const Village = () => {
  const [villages, setVillages] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 20;
  const total = 39; // Total de aldeas según la API

  const fetchAllVillages = async () => {
    try {
      let page = 1;
      let allVillages = [];
      const totalPages = Math.ceil(total / pageSize);

      while (page <= totalPages) {
        const response = await axios.get(
          `https://dattebayo-api.onrender.com/villages?page=${page}&pageSize=${pageSize}`
        );

        const { data } = response;
        allVillages = [...allVillages, ...data.villages];
        page += 1;
      }

      setVillages(allVillages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching villages from API", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllVillages();
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
    <div className="village-list">
      <h1>Lista de Aldeas</h1>
      <ul>
        {villages.map((village) => (
          <li key={village.id}>
            <h2>{village.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Village;
