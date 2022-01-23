import React, { useState, useEffect } from 'react';
// import Card from '../card/Card';
// import "./characters.css"

function Characters() {
  const [data,setData] = useState([])
  const [page,setPage] = useState(1)
  const [prevP, setPrevP] = useState(false);
  const [nextP, setNextP] = useState(false);


  useEffect(() => {
    fetch(`https://swapi.dev/api/planets/?page=${page}`)
     .then( res => {
        return res.json()
     })
     .then(async (resultat) => {
       setData(resultat.results)
       if (resultat.next != null) {
         setNextP(true)
       } else {
        setNextP(false)
       }

       if (resultat.previous != null) {
         setPrevP(true)
       } else {
         setPrevP(false)
       }
     })
  },[page])

  const nextPage = (event) => {
    event.preventDefault()
    let pages = page + 1
    setPage(pages)
  }

  const prevPage = (event) => {
    event.preventDefault()
    let pages = page - 1
    setPage(pages)
}

  return <div>
    <h1 style={{textAlign:"center"}}>planetes</h1>
    <div style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}} className='planets'>
     {data?.map((planets , key) => (
       <a key={key} href={"planets/"+planets.url.slice(30,-1)}>{planets.name}</a>
      ))}
    </div>
    <div style={{display:"flex",justifyContent:"space-around"}}>
      {prevP
        ? <a href='prev' className='btn' onClick={prevPage}>prev</a>
        : <div></div>
      }
      {nextP
        ? <a  href='next' className='btn' onClick={nextPage}><p>next</p></a>
        : <div></div>
      }
    </div>
  </div>;
}

export default Characters;
