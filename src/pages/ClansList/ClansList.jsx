import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ClansList.css";

const ClansList = () => {
  const [clans, setClans] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 20;
  const total = 58; // Total de clanes según la API

  const fetchAllClans = async () => {
    try {
      let page = 1;
      let allClans = [];
      const totalPages = Math.ceil(total / pageSize);

      while (page <= totalPages) {
        const response = await axios.get(
          `https://dattebayo-api.onrender.com/clans?page=${page}&pageSize=${pageSize}`
        );

        const { data } = response;
        allClans = [...allClans, ...data.clans];
        page += 1;
      }

      setClans(allClans);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching clans from API", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllClans();
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
    <div className="clans-list">
      <h1>Lista de Clanes</h1>
      <ul>
        {clans.map((clan) => (
          <li key={clan.id}>
            <h2>{clan.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClansList;
