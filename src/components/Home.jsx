import { useState, useEffect } from "react";
import { Dashboard } from "../pages/dashboard/Dashboard";
import axios from "axios";

export const Home = () => {
  
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/accounts");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchData();
  }, []);

  return <main>{<Dashboard users={clients} />}</main>;
};
