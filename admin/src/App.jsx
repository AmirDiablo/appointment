import {Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import {ToastContainer, toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <div>
      <Login />
      <ToastContainer />
    </div>
      
  )
}

export default App
