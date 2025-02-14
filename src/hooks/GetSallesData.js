import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function GetSallesData(refresh) {
  const API_URL = process.env.REACT_APP_API_URL;
  //const bearerToken = useSelector((state) => state.login.token);

  /* const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Access-Control-Allow-Headers":
        "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
      Authorization: `Bearer ${bearerToken}`,
    },
  }); */

  const [sallesData, setSallesData] = useState({});
  const [properties, setProperties] = useState({
    loading: true,
    error: false,
  });

  const getDataFacilities = () => {
    axios.get(`${API_URL}/api/salles`).then((res) => {
      setSallesData(res.data);
      setProperties({
        loading: false,
        error: false,
      });
    });
  };

  useEffect(() => getDataFacilities(), [refresh]);

  return { sallesData, getDataFacilities, properties };
}
