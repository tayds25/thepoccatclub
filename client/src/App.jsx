import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'

function App() {

  return (
    <Router>
      <div className="min-h-screen bg-[#FFFDF0]">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App