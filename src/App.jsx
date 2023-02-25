import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { Books, Categories, Dashboard, Feedbacks, Users } from "./pages";
import { SideBar } from "./components";
import { Login } from "./modals";
import { getCookie } from "./utils/getCookie";
import { Nav, Toast, ToastContainer } from "react-bootstrap";

function App() {
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleToastClose = () => setShowToast(false);

  useEffect(() => {
    const token = getCookie("loggedIn");
    if (!token) {
      setShowToast(true);
      setShowLoginModal(true);
    } else {
      const expirationTime = new Date(getCookie("expirationTime")).getTime();
      const currentTime = Date.now();
      if (expirationTime < currentTime) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "expirationTime=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setShowLoginModal(true);
      }
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <SideBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/books"
          element={
            <ProtectedRoute>
              <Books />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedbacks"
          element={
            <ProtectedRoute>
              <Feedbacks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Login
        show={showLoginModal}
        handleClose={() => setShowLoginModal(false)}
      />
      <ToastContainer position="bottom-center">
        <Toast show={showToast} onClose={handleToastClose}>
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>You need to login first.</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const token = getCookie("loggedIn");

  if (!token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default App;
