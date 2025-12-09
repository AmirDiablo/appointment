import {Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useContext } from "react"
import { AdminContext } from "./context/AdminContext"
import Navbar from "./components/Navbar"

function App() {

  const {aToken} = useContext(AdminContext)

  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  )
}

export default App
