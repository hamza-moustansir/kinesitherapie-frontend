import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function GetPrestationsData(refresh) {
  const API_URL = process.env.REACT_APP_API_URL;

  const [prestationsData, setPresetationsData] = useState({});
  const [properties, setProperties] = useState({
    loading: true,
    error: false,
  });

  const getDataPresetations = () => {
    axios.get(`${API_URL}/api/prestations`).then((res) => {
      setPresetationsData(res.data);
      setProperties({
        loading: false,
        error: false,
      });
    });
  };

  useEffect(() => getDataPresetations(), [refresh]);

  return { prestationsData, getDataPresetations, properties };
}
