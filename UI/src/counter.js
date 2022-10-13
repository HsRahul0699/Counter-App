import React,{useState,useEffect} from 'react'
import axios from 'axios'
// import 'bootstrap/dist/css/bootstrap.min.css';
const Counter=(props)=>{
    const [counters,setCounters]=useState([])
    useEffect(()=>{
        axios.get('http://localhost:3050/api/counters')
        .then((res)=>{
            console.log(res.data)
            setCounters(res.data)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    },[])
/* 
    const incFunc=(id)=>{
        axios.put(`http://localhost:3050/api/counters/${id}?type=increment`)
        .then((res)=>{
            console.log(res.data)
            const result=counters.map((counter)=>{
                if(counter._id==id){
                    return {...counter,...{count:res.data.count}}
                }
                else{
                    return {...counter}
                }
            })
            setCounters(result)
        })
        .catch((err)=>{
            console.log('inc err',err.message)

        })
    }

    const decFunc=(id)=>{
        axios.put(`http://localhost:3050/api/counters/${id}?type=decrement`)
        .then((res)=>{
            console.log(res.data)
            const result=counters.map((counter)=>{
                if(counter._id==id){
                    return {...counter,...{count:res.data.count}}
                }
                else{
                    return {...counter}
                }
            })
            setCounters(result)
        })
        .catch((err)=>{
            console.log('inc err',err.message)

        })
    }

    const resetFunc=(id)=>{
        axios.put(`http://localhost:3050/api/counters/${id}?type=reset`)
        .then((res)=>{
            console.log(res.data)
            const result=counters.map((counter)=>{
                if(counter._id==id){
                    return {...counter,...{count:res.data.count}}
                }
                else{
                    return {...counter}
                }
            })
            setCounters(result)
        })
        .catch((err)=>{
            console.log('inc err',err.message)

        })
    } */

    const addCounterFunc=()=>{
        axios.post('http://localhost:3050/api/counters')
        .then((res)=>{
            console.log(res.data)
            const result=[...counters,res.data]
            setCounters(result)
        })
        .catch((err)=>{
            console.log(err.message)
        })

    }

    const deleteCounterFunc=(e,id)=>{
        axios.delete(`http://localhost:3050/api/counters/${id}`)
        .then((res)=>{
            const result=counters.filter(counter=>counter._id!==id)
            setCounters(result)
        })
        .catch((err)=>{
            console.log(err.message)
        })
    }
    const updateFunc=(e,id)=>{
        if(e.target.id=='inc'){
            axios.put(`http://localhost:3050/api/counters/${id}?type=increment`)
        .then((res)=>{
            console.log(res.data)
            const result=counters.map((counter)=>{
                if(counter._id==id){
                    return {...counter,...{count:res.data.count}}
                }
                else{
                    return {...counter}
                }
            })
            setCounters(result)
        })
        .catch((err)=>{
            console.log('inc err',err.message)

        })
        }
        else if(e.target.id=='dec'){
            axios.put(`http://localhost:3050/api/counters/${id}?type=decrement`)
        .then((res)=>{
            console.log(res.data)
            const result=counters.map((counter)=>{
                if(counter._id==id){
                    return {...counter,...{count:res.data.count}}
                }
                else{
                    return {...counter}
                }
            })
            setCounters(result)
        })
        .catch((err)=>{
            console.log('inc err',err.message)

        })
        }
        else if(e.target.id=='res'){
            axios.put(`http://localhost:3050/api/counters/${id}?type=reset`)
            .then((res)=>{
                console.log(res.data)
                const result=counters.map((counter)=>{
                    if(counter._id==id){
                        return {...counter,...{count:res.data.count}}
                    }
                    else{
                        return {...counter}
                    }
                })
                setCounters(result)
            })
            .catch((err)=>{
                console.log('inc err',err.message)
    
            })
        }
    }
    return (
        <div >
            <h1>Counter App <button onClick={addCounterFunc}>Add Counter</button></h1>
            {
                counters.length>0&&(
                    <>
                      {counters.map((counter)=>{
                        return (
                            <>
                                <h1>{counter.count} <button onClick={(e)=>{deleteCounterFunc(e,counter._id)}}>Delete Counter</button></h1>
                                <button onClick={(e)=>{
                                    updateFunc(e,counter._id)
                                }} name='inc' id='inc'>Increment</button>

                                <button onClick={(e)=>{
                                    updateFunc(e,counter._id)
                                }} disabled={counter.count==0?true:false} name='dec' id='dec'>Decrement</button>

                                <button onClick={(e)=>{
                                    updateFunc(e,counter._id)
                                }} name='res' id='res'>Reset</button>
                            </>
                        )
                      })}  
                    </>
                )
            }

        </div>
    )
}

export default Counter