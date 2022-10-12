import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import { fetchBooks } from 'actions/action';

import './css/index.css'

import gotHeader from 'assets/gotHeader.png'

import BookDetails from 'components/BookDetails/BookDetails'
import MainContainer from 'components/MainContainer/MainContainer'

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  return (
    <Router>
      <nav className='navbar text-white bg-white justify-content-center sticky-top'>
        <Link to='/'>
          <img className='header-logo' src={gotHeader} alt='game-of-thrones-logo' />
        </Link>
      </nav>
      <div className='bg-image'>
          <Routes>
            <Route path='/' element={<MainContainer />} />
            <Route path='/book/:bookId' element={<BookDetails />} />
          </Routes>
      </div>
    </Router>
  )
}

export default App
