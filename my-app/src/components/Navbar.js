
import React,{useState,useEffect} from "react"
import {Link} from "react-router-dom"
const Navbar=({onLogout})=>{
  const [data,setData]=useState([])
  const [leng,setLength]=useState(0)
    useEffect(()=>{
        const interval=setInterval(()=>{
          fetch("http://localhost:5000/items")
        .then(res=>res.json())
        .then(dat=>{
            const filterd=dat.filter(t=>t.carted)
            setData(filterd)
          
            setLength(filterd.length)
        })
        },2000)
        return ()=> clearInterval(interval) // u clearing this outside of interval function not inside of interval func
    },[])
  return (
    <nav>
      <Link to="/about">about  | </Link>
      <Link to="/details">details  | </Link>
      <Link to="/cart">cart{leng}  | </Link>
      <button onClick={onLogout}>Logout</button>
    </nav>
  )
}
export default Navbar