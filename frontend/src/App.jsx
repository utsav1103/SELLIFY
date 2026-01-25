import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";



function App() {
  return (
    <div className="min-h-screen bg-base-100" >
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/"  element={<HomePage />} />
        </Routes>
      </main>
     
    </div>
  );
} export default App;