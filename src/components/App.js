
import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setLoading] = useState(false)

  function handleScroll(e) {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setPage(page=>page + 1)
      setLoading(true)
    }
  }
  console.log(page)
  useEffect(() => {
    try {
      fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`)
        .then(data => data.json())
        .then(newData => {
          setData([...data, ...newData])
          setLoading(false)
        })
    }
    catch (err) {
      console.log(err)
    }
  }, [page])

  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.addEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      {/* Do not remove the main div */}
      {
        data.map((el,i) => {
          return (
            <div key={i} >
              <img src={el.thumbnailUrl} alt="" />
              <p>{el.title}</p>
            </div>
          )
        })
      }
      <p className="loadmore">Loading more items...</p>
    </div>
  )
}

export default App