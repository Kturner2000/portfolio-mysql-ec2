import { Routes, Route, Navigate} from 'react-router'
import Home from './pages/Home'
import CategoryPage from './pages/Category'
import ContactPage from './pages/Contact'
import LoginPage from './pages/Login'
import PhotoUploadPage from './pages/Upload'
import Header from './components/Header/Header'

const ProtectedRoute = ({ children }) => {
  if (!hasAuth) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

function App() {


  return (
    <div className='body'>
    <Header />
    <div className='page'>

    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/admin/login" element={<LoginPage />} />
      <Route path="/admin/upload" element={
        <ProtectedRoute>
          <PhotoUploadPage />
        </ProtectedRoute>
      }
    />

    </Routes> 
    </div>
    </div>
  )
}

export default App
