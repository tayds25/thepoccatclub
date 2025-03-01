import { BrowserRouter as Router, Outlet, useLocation } from 'react-router-dom'
import Header from './components/header.jsx'
import Footer from './components/footer.jsx'

function AppContent() {
  const location = useLocation();
  const isRegisterPage = location.pathname === '/register';

  return (
    <div className="min-h-screen bg-[#FFFDF0]">
      {!isRegisterPage && <Header />}
      <main className={`container mx-auto px-4 ${isRegisterPage ? 'py-0' : 'py-8'}`}>
        <Outlet />
      </main>
      {!isRegisterPage && <Footer />}
    </div>
  )
}

function App() {
  return <AppContent />;
}

export default App