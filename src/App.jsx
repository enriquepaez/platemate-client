import './App.css'
import { Routes, Route } from "react-router"
import { useEffect, useState } from "react"
import axios from "axios";

// pages
import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Profile from './pages/auth/Profile'
import EditProfile from './pages/auth/EditProfile'
import MyRecipes from "./pages/MyRecipes"
import AddRecipe from "./pages/AddRecipe"
import EditRecipe from "./pages/EditRecipe"
import CommunityRecipes from "./pages/CommunityRecipes"
import RecipeDetails from "./pages/RecipeDetails"
import WeekPlanner from './pages/WeekPlanner'
import WeeklyMealStepper from './pages/WeeklyMealStepper'
import Error404 from './pages/error/Error404'
import Error500 from './pages/error/Error500'

// components
import Navbar from "./components/Navbar"
import Private from "./components/auth/Private"
import Footer from "./components/Footer"

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const authToken = localStorage.getItem('authToken')

        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/user`, {
          headers: { authorization: `Bearer ${authToken}` }
        })
        setUser(response.data)

      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  return (
    <div className="app-container">
      <Navbar user={user} setUser={setUser} />

      <div className='content'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={ <Private> <Profile user={user} /> </Private> } />
          <Route path="/profile/edit" element={ <Private> <EditProfile user={user} setUser={setUser} /> </Private>} />
          <Route path="/myrecipes" element={ <Private> <MyRecipes /> </Private>} />
          <Route path="/addrecipe" element={ <Private> <AddRecipe /> </Private>} />
          <Route path="/editrecipe" element={ <Private> <EditRecipe /> </Private>} />
          <Route path="/communityrecipes" element={ <Private> <CommunityRecipes /> </Private>} />
          <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
          <Route path="/weekplanner" element={ <Private> <WeekPlanner /> </Private>} />
          <Route path="/weekplanner/stepper" element={ <Private> <WeeklyMealStepper /> </Private>} />

          {/* error FE routes here... */}
          <Route path="/*" element={<Error404 />} />
          <Route path="/error" element={<Error500 />} />

        </Routes>
      </div>

      <Footer />
    </div>
  )
}

export default App
