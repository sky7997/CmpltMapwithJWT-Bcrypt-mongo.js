import React from "react"
import { useNavigate } from 'react-router-dom';
const Cofvendmac=()=>{
  const navigate=useNavigate()
return(
  <div>
    <h2>coffee vending machine</h2>
    <button onClick={() => navigate('/')}>Home</button>

  </div>
)

}
export default Cofvendmac