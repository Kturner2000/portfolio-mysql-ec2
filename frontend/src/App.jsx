import { Routes, Route} from 'react-router'
import Home from './pages/Home'
import CategoryPage from './pages/Category'
import LoginPage from './pages/Login'
import PhotoUploadPage from './pages/Upload'

function App() {

  return (
    <>
    // navbar
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<CategoryPage />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/upload" element={<PhotoUploadPage />} />


    </Routes> 
    </>
  )
}

export default App
