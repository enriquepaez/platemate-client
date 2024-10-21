import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Componente contexto
const AuthContext = createContext()

// Componente envoltorio
function AuthWrapper(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUserId, setLoggedUserId] = useState(null)
  const [isValidatingToken, setIsValidatingToken] = useState(true)

  // para verificar si el usuario está logueado o no cuando visita la página (cuando en toda la página ocurre el componentDidMount)
  useEffect(() =>  {
    authenticateUser()
  }, [])

  // llama a la ruta /verify y nos actualiza los estados. Se llamará luego de hacer login/logout o volver a la app.
  const authenticateUser = async () => {

    try {
      const authToken = localStorage.getItem("authToken")

      const response = await axios.get("http://localhost:5005/api/auth/verify", {
        headers: { authorization: `Bearer ${authToken}` }
      })

      // el token es válido
      setIsLoggedIn(true)
      setLoggedUserId(response.data._id)
      setIsValidatingToken(false)

    } catch (error) {
      // el token no es válido o no existe
      console.log(error)
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsValidatingToken(false)
    }
  }

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser
  }

  if (isValidatingToken) {
    return <h3>... validating credentials</h3>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthWrapper
}
