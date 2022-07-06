import React, { useState, useEffect } from "react"
import useFetch from "react-fetch-hook"
import ReactPaginate from "react-paginate"
import "../index.css"

const Gists = () => {
  const [gistList, setGistList] = useState([])
  const [pageNumber, setPageNumber] = useState(0)

  const itemsPerPage = 30
  const pagesVisited = pageNumber * itemsPerPage
  const pageCount = Math.ceil(gistList.length / itemsPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  const { isLoading, data, error } = useFetch(
    "https://api.github.com/gists/public?page=2&per_page=100"
  )

  useEffect(() => {
    if (!isLoading) {
      setGistList(data)
    }
  }, [data, isLoading])

  if (isLoading) return <div>Loading...</div>
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
            <div key={id} className="gist">
                <img src={item.owner.avatar_url} alt='profile' className='profilePic'/>
                <h2 className="gistName">{Object.values(item.files)[0].filename}</h2>
            </div>
          )
        })}
      {gistList && (
        <ReactPaginate
          previousLabel={"«"}
          nextLabel={"»"}
          pageCount={pageCount}
          pageRangeDisplayed={4}
          onPageChange={changePage}
          //   containerClassName={pagenationButtons}
          //   previousLinkClassName={AlbumsListstyles.pagenationPreviousLink}
          //   nextLinkClassName={AlbumsListstyles.pagenationNextLink}
          //   activeClassName={AlbumsListstyles.pagenationActive}
          //   disabledClassName={AlbumsListstyles.pagenationDisabled}
        />
      )}
    </div>
  )
}

export default Gists
