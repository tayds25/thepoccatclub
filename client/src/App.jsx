import { BrowserRouter as Router, Outlet, useLocation } from 'react-router-dom'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'

function AppContent() {

  return (
    <div className="min-h-screen bg-[#FFFDF0]">
      <Header />
      <main className={`container mx-auto px-4 py-8`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return <AppContent />;
}

export default App