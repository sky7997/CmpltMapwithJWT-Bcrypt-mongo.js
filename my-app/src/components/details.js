import React from "react"
import {useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
const Details=()=>{
    const navigate=useNavigate()
    const [name,setName]=useState("")
    const [price,setPrice]=useState("")
    const [location,setLocation]=useState("")
    const [phno,setPhno]=useState("")
    const [data,setData]=useState([])
    const [editid,setEditId]=useState(null)
    
    useEffect((()=>{
        fetch("http://localhost:5000/items")
        .then(res=>res.json())
        .then(dat=>setData(dat))
    }),[])
    const submitF=(e)=>{
        e.preventDefault()
        if (!name || !price || !location || !phno) return
        const newdat={name:name,price:price,location:location,phno:phno}
        fetch("http://localhost:5000/items",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newdat)
        }).then(res=>res.json())
        .then(dat=>{
            setData(prev=>[...prev,dat])
            setName("");
            setPrice("");
            setLocation("");
            setPhno("");
            setEditId(null);
        })
    }
    const editidd=(id)=>{
        const fnd=data.find(t=>t._id===id)
        setEditId(fnd._id)
        setName(fnd.name)
        setPrice(fnd.price)
        setLocation(fnd.location)
        setPhno(fnd.phno)
    }
    const editF=(editid)=>{
        if (!name || !price || !location || !phno) return
        const chnage={name:name,price:price,location:location,phno:phno}
        fetch(`http://localhost:5000/items/${editid}`,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(chnage)
        }).then(res=>res.json())
        .then(dat=>{
            setData(prev=>prev.map(t=>t._id===editid ? {...t,...dat} :t))
            setName("");
            setPrice("");
            setLocation("");
            setPhno("");
            setEditId(null);
        })
    }
    const deleteF=(id)=>{
        fetch(`http://localhost:5000/items/${id}`,{
            method:"DELETE"
        }).then(res=>res.json())
        .then(()=>{
            setData(prev=>prev.filter(t=>t._id !==id))
        })
        
    }
    return (
        <div>
            <p>Details</p>
            <button onClick={()=>navigate("/")}>Home</button>
            <div>
        <form onSubmit={submitF}>
        <input
        type="text"
        value={name}
        onChange={e=>setName(e.target.value)}
        />
        <input
        type="number"
        value={price}
        onChange={e=>setPrice(e.target.value)}
        />
        <input
        type="text"
        value={location}
        onChange={e=>setLocation(e.target.value)}
        />
        <input
        type="number"
        value={phno}
        onChange={e=>setPhno(e.target.value)}
        />
        <button type="submit">Submit</button>
        
        </form>
        
            </div>
            {editid !== null ? <button onClick={()=>editF(editid)}>Update</button>:<p></p>}
            <div>
                {data? (data.map((t,m)=>(
                    <div key={m}>
                        <p>{t.name}</p>
                        <p>{t.price}</p>
                        <p>{t.location}</p>
                        <p>{t.phno}</p>
                        <button onClick={()=>editidd(t._id)}>Edit</button>
                        <button onClick={()=>deleteF(t._id)}>Delete</button>
                    </div>
                ) )) : (<p>No Data</p>)}
            </div>
        </div>
    )
}
export default Details