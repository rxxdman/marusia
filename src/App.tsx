
import './App.css'
import { MainPage, GenresPage, GenrePage, MoviePage, AccountPage } from "./pages";
import { Route, Routes} from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/footer/footer';

function App() {

  return (
    <>
      <Header/>
      <main className='container'>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/genres/:genres" element={<GenrePage />} />
          <Route path="/movie/:movieId" element={<MoviePage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
      </main>
     <Footer/>
    </>
  )
}

export default App
