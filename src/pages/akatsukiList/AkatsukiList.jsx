import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AkatsukiList.css";

const AkatsukiList = () => {
  const [akatsukiMembers, setAkatsukiMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 20;
  const total = 44;

  const fetchAllAkatsukiMembers = async () => {
    try {
      let page = 1;
      let allMembers = [];
      const totalPages = Math.ceil(total / pageSize);

      while (page <= totalPages) {
        const response = await axios.get(
          `https://dattebayo-api.onrender.com/akatsuki?page=${page}&pageSize=${pageSize}`
        );

        const { data } = response;
        allMembers = [...allMembers, ...data.akatsuki];
        page += 1;
      }

      setAkatsukiMembers(allMembers);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Akatsuki members from API", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAkatsukiMembers();
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
    <div className="akatsuki-list">
      <h1>Lista de Miembros de Akatsuki</h1>
      <ul>
        {akatsukiMembers.map((member) => (
          <li key={member.id} className="akatsuki-member">
            {member.images && member.images.length > 0 && (
              <img
                src={member.images[0]}
                alt={member.name}
                className="member-image"
              />
            )}
            <h2>{member.name}</h2>
            <p>ID: {member.id}</p>
            <p>Sexo: {member.gender}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AkatsukiList;
