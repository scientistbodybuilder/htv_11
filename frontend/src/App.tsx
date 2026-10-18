import './App.css'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'
import Header from './components/Header'
import ResumeBuilder from './components/resume-builder/ResumeBuilder'
import UploadResume from './components/resume-builder/UploadResume'


function MainLayout() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <Header />
      <main className="min-h-0 flex-1">
        <Outlet />
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<UploadResume />} />
          <Route path="/builder" element={<ResumeBuilder />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
