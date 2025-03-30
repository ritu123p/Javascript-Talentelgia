import React, { useState } from 'react'

const HOC = () => {
    const [count,setCount]=useState(0);
  return (
    <>
    <div>HOC</div>
    <h2>{count}</h2>
    <button onClick={()=>setCount(count+1)}>ADD</button>
    </>
  )
}
export default HOC




