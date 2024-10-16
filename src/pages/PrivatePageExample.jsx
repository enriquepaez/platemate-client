import { useEffect, useState } from 'react'

function PrivatePageExample() {

  const [dataOnlyForLoggedUsers, setData] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      
      // call a private route here...

    } catch (error) {
      console.log(error)
    }
  }

  // loading handler here

  return (
    <div>
      
      <h3>Ejemplo de página privada</h3>
      <p>Solo usuarios que hayan validado credenciales deberian poder acceder y ver la siguiente información:</p>

    </div>
  )
}

export default PrivatePageExample