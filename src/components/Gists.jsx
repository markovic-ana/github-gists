import React, { useState, useEffect } from "react"
import useFetch from "react-fetch-hook"
import ReactPaginate from "react-paginate"
import "../index.css"
import styles from './Gists.module.css'

const Gists = () => {
  const [gistList, setGistList] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [activeGist, setActiveGist] = useState('')

  const itemsPerPage = 30
  const pagesVisited = pageNumber * itemsPerPage
  const pageCount = Math.ceil(gistList.length / itemsPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const { isLoading, data, error } = useFetch(
    "https://api.github.com/gists/public?page=30&per_page=100"
  )


  useEffect(() => {
  window.scrollTo(0, 0)
}, [pageNumber])

  useEffect(() => {
    if (!isLoading) {
      setGistList(data)
    }
 
  }, [data, isLoading])

  if (isLoading) return <div className={styles.loading}>Loading...</div>
  if (error)
    return (
      <div>
        <p>Code: {error.status}</p>
      </div>
    )

  return (
    <div>
      {gistList
        .slice(pagesVisited, pagesVisited + itemsPerPage)
        .map((item, id) => {
          return (
            <div key={id}>
            <li  className={styles.gist}>
                <img src={item.owner.avatar_url} alt='profile' className={`${item.id == activeGist ? styles.activeImg : styles.profilePic}`}
            onClick={e => setActiveGist(item.id)}/>
                <h2 className={`${item.id == activeGist ? styles.active : styles.gistName}`}
            onClick={e => setActiveGist(item.id)}>{Object.values(item.files)[0].filename}</h2>
              </li>
              </div>
          )
        })}
      {gistList && (
        <ReactPaginate
          breakLabel={"..."}
          previousLabel={"<"}
          nextLabel={">"}
          pageCount={pageCount}
          pageRangeDisplayed={2}
          onPageChange={changePage}
          containerClassName='pagenation'
          previousLinkClassName='pagenationPreviousLink'
          nextLinkClassName='pagenationNextLink'
          activeClassName='pagenationActive'
          // disabledClassName='pagenationDisabled'
        />
      )}
    </div>
  )
}

export default Gists
