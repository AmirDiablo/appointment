import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([])
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : '')

  const currency = "$"
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const getAllDoctors = async () => {
    try {
        const {data} = await axios.get(backendUrl + "/api/doctor/list")

        if(data.success) {
          setDoctors(data.doctors)
        } else {
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    getAllDoctors()
  }, [])

  const value = {
    doctors,
    currency,
    backendUrl,
    token, setToken
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
