import './App.css'
import { Routes, Route } from "react-router"

// pages
import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import Profile from "./pages/Profile"
import MyRecipes from "./pages/MyRecipes"
import AddRecipe from "./pages/AddRecipe"
import EditRecipe from "./pages/EditRecipe"
import CommunityRecipes from "./pages/CommunityRecipes"

// components
import Navbar from "./components/Navbar"
import Private from "./components/auth/Private"
import Footer from "./components/Footer"

function App() {

  return (
    <div className="app-container">
      <Navbar />

      <br />

      <div className='content'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={ <Private> <Profile /> </Private>} />
          <Route path="/myrecipes" element={ <Private> <MyRecipes /> </Private>} />
          <Route path="/addrecipe" element={ <Private> <AddRecipe /> </Private>} />
          <Route path="/editrecipe" element={ <Private> <EditRecipe /> </Private>} />
          <Route path="/communityrecipes" element={ <Private> <CommunityRecipes /> </Private>} />

          {/* error FE routes here... */}

        </Routes>
      </div>

      <br />

      <Footer />
    </div>
  )
}

export default App
