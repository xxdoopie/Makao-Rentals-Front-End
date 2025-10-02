import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import ContextProvider from "./context/AppContext";
import { TenantToastProvider } from "./context/TenantToastContext";

// auth & layout
import LoginForm from "./components/LoginForm";
import AdminLayout from "./components/Admin/AdminLayout"; 
import TenantLayout from "./components/Tenant/TenantLayout";

// admin pages
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminReports from "./components/Admin/AdminReports";
import AdminPayments from "./components/Admin/AdminPayments";
import AdminSettings from "./components/Admin/AdminSettings";
import AdminOrganisation from "./components/Admin/AdminOrganisation";
import AdminTenants from "./components/Admin/AdminTenants";
import AdminHelp from "./components/Admin/AdminHelp";

// tenant pages
import TenantDashboard from "./components/Tenant/TenantDashboard";
import TenantPaymentCenter from "./components/Tenant/TenantPaymentCenter";
import TenantReportIssue from "./components/Tenant/TenantReportIssue";
import TenantSettings from "./components/Tenant/TenantSettings";
import TenantSignUpForm from "./components/TenantSignUpForm";

// ---------------- Protected Route ----------------
function ProtectedRoute({ children, role }) {
  const { isLoggedIn, userType } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (role && userType !== role) return <Navigate to="/login" replace />;

  return children;
}

// ---------------- App ----------------
function AppContent() {
  const { isLoggedIn, userType, login } = useAuth();

  return (
    <Routes>
      {/* Public login */}
      <Route
        path="/login"
        element={
          isLoggedIn
            ? <Navigate to={userType === "admin" ? "/admin" : "/tenant"} replace />
            : <LoginForm onLogin={login} />
        }
      />

      {/* Public tenant signup page, can only be accessed if there are free rooms */}
      <Route path="/tenant/signup" element={<TenantSignUpForm />} />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="organisation" element={<AdminOrganisation />} />
        <Route path="tenants" element={<AdminTenants />} />
        <Route path="help" element={<AdminHelp />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Tenant routes */}
      <Route
        path="/tenant"
        element={
          <ProtectedRoute role="tenant">
            <TenantToastProvider>
              <TenantLayout />
            </TenantToastProvider>
          </ProtectedRoute>
        }
      >
        <Route index element={<TenantDashboard />} />
        <Route path="payments" element={<TenantPaymentCenter />} />
        <Route path="report" element={<TenantReportIssue />} />
        <Route path="settings" element={<TenantSettings />} />
      </Route>

      {/* Default → login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ContextProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ContextProvider>
  );
}
