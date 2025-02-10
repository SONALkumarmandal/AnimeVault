import { BrowserRouter,Routes,Route } from 'react-router-dom' 

import LoginLayout from './Layouts/LoginLayout'
import Signup from './components/Signup'
import Login from './components/Login'
import HomeLayout from './Layouts/HomeLayout'
import TrendingPage from './pages/TrendingPage'
import TopRated from './pages/TopRated'
import MostPopular from './pages/MostPopular'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginLayout/>}>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
          </Route>
          <Route path='/home' element={<HomeLayout/>}>
          <Route index element={<TrendingPage />} />
            <Route path='toprated' element={<TopRated/>}/>
            <Route path='popular' element={<MostPopular/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App