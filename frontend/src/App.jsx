import { Routes, Route} from 'react-router'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import Home from './pages/Home'
import CategoryPage from './pages/Category'
import ContactPage from './pages/Contact'
import LoginPage from './pages/Login'
import PhotoUploadPage from './pages/Upload'
import Header from './components/Header/Header'

function App() {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
      checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
      return (
          <div>
              Loading....
          </div>
      );
  }


  return (
    <div className='body'>
    <Header />
    <div className='page'>

    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      <Route path="/contact" element={<ContactPage />} />
      
    <Route
                    path='/admin'
                    element={
                        authUser ? (
                            <PhotoUploadPage />
                        ) : (
                           <LoginPage />
                        )
                    }
                />

    </Routes> 
    </div>
    </div>
  )
}

export default App
