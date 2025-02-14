import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function GetSallesData(refresh) {
  const API_URL = process.env.REACT_APP_API_URL;
  const [sallesData, setSallesData] = useState({});
  const [properties, setProperties] = useState({
    loading: true,
    error: false,
  });

  const getDataFacilities = () => {
    axios.get(`${API_URL}/api/salles`, { withCredentials: true })
      .then((res) => {
        setSallesData(res.data);
        setProperties({
          loading: false,
          error: false,
        });
      })
      .catch((error) => {
        setProperties({
          loading: false,
          error: true,
        });
        console.error("Error fetching salles data:", error);
      });
  };

  useEffect(() => {
    getDataFacilities();
  }, [refresh]);

  return { sallesData, getDataFacilities, properties };
}