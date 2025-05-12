import React,{useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
const Cart=()=>{
    const [data,setData]=useState([])
    useEffect(()=>{
        fetch("http://localhost:5000/items")
        .then(res=>res.json())
        .then(dat=>{
            const filterd=dat.filter(t=>t.carted)
            setData(filterd)
        })
    },[])
    const navigate=useNavigate()
    const removeItem=(id)=>{
        const chng={carted:false}
    fetch(`http://localhost:5000/items/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(chng)
    }).then(res=>res.json())
    .then(()=>{
        setData(prev=>prev.filter(t=>t._id!==id ))
       
    })
    }
    return (
        <div>
            <p>Cart</p>
            <button onClick={()=>navigate("/")}>Home</button>
            {
                data.map((t)=>(
                    <div key={t._id}>
                        <p>{t.name}</p>
                        <p>{t.price}</p>
                        <p>{t.location}</p>
                        <p>{t.phno}</p>
                        <button onClick={()=>removeItem(t._id)}>remove from cart</button>
                       
                    </div>
                ) )
            }
        </div>
    )
}
export default Cart