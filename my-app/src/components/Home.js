import React,{useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
import "../styles/Home.css"
const About=()=>{
    const [data,setData]=useState([])
    useEffect(()=>{
        fetch("http://localhost:5000/items")
        .then(res=>res.json())
        .then(dat=>setData(dat))
    },[])
    const navigate=useNavigate()
   const Carted=(id)=>{
    const chng={carted:true}
    fetch(`http://localhost:5000/items/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(chng)
    }).then(res=>res.json())
    .then(dat=>{
        setData(prev=>prev.map(t=>t._id===id ? {...t,carted:dat.carted} :t))
       
    })
   }
    return (
        <div className="home-container">
            <button onClick={()=>navigate("/cofvendmac")}>cofvendmac</button>
            <button onClick={()=>navigate("/about")}>About</button>
            <button onClick={()=>navigate("/details")}>details</button>
            <button onClick={()=>navigate("/cart")}>cart</button>
            {
                data.map((t,m)=>(
                    <div key={m}>
                        <p>{t.name}</p>
                        <p>{t.price}</p>
                        <p>{t.location}</p>
                        <p>{t.phno}</p>
                        <button onClick={()=>Carted(t._id)}>Add to cart</button>
                       
                    </div>
                ) )
            }
        </div>
    )
}
export default About