import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import ScrollToTop from './components/ui/ScrollToTop'

// Public Pages
import HomePage from './pages/public/HomePage'
import AboutPage from './pages/public/AboutPage'
import ContactPage from './pages/public/ContactPage'
import VacanciesPage from './pages/public/VacanciesPage'
import ExamDatesPage from './pages/public/ExamDatesPage'
import ProcessPage from './pages/public/ProcessPage'
import ClassDatesPage from './pages/public/ClassDatesPage'
import FAQPage from './pages/public/FAQPage'
import NotFoundPage from './pages/public/NotFoundPage'

// Auth
import LoginPage from './pages/auth/LoginPage'

// Admin Pages
import AdminLayout from './components/layout/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminStudents from './pages/admin/AdminStudents'
import AdminContent from './pages/admin/AdminContent'
import AdminSchedule from './pages/admin/AdminSchedule'
import AdminNotifications from './pages/admin/AdminNotifications'
import AdminVacancies from './pages/admin/AdminVacancies'

// Student Pages
import StudentLayout from './components/layout/StudentLayout'
import StudentDashboard from './pages/student/StudentDashboard'
import VideoLessons from './pages/student/VideoLessons'
import Downloads from './pages/student/Downloads'
import MCQTests from './pages/student/MCQTests'
import NotificationsPage from './pages/student/NotificationsPage'

function ProtectedRoute({ children, role }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (role && user.role !== role) return <Navigate to="/login" replace />
  return children
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ── Public ── */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/vacancies" element={<VacanciesPage />} />
        <Route path="/exam-dates" element={<ExamDatesPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/class-dates" element={<ClassDatesPage />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* ── Auth ── */}
        <Route path="/login" element={<LoginPage />} />

        {/* ── Admin (protected) ── */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="schedule" element={<AdminSchedule />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="vacancies" element={<AdminVacancies />} />
        </Route>

        {/* ── Student (protected) ── */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StudentDashboard />} />
          <Route path="lessons" element={<VideoLessons />} />
          <Route path="downloads" element={<Downloads />} />
          <Route path="tests" element={<MCQTests />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* ── 404 ── */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
