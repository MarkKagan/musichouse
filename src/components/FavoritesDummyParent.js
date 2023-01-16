import { useState } from "react"

function FavoritesDummyParent({children}) {
  const [favs, setFavs] = useState();

  return (
    <div>{children}</div>
  )
}

export default FavoritesDummyParent