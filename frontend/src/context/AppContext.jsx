import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([])
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : '')
  const [userData, setUserData] = useState(false)

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

  const loadUserProfileData = async () => {
    try {
      const {data} = await axios.get(backendUrl + "/api/user/get-profile", {headers: {Authorization: `Bearer ${token}`}})

      if(data.success) {
        setUserData(data.userData)
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

  useEffect(()=> {
    if(token) {
      loadUserProfileData()
    } else {
      setUserData(false)
    }
  }, [token])

  const value = {
    doctors,
    currency,
    backendUrl,
    token, setToken,
    userData, setUserData,
    loadUserProfileData, getAllDoctors
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
