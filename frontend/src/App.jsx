import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router";
import HomePage from "./pages/HomePage";
import ProductPage  from "./pages/ProductPage";
import  ProfilePage  from "./pages/ProfilePage";
import  CreatePage  from "./pages/CreatePage";
import  EditPage  from "./pages/EditPage";
import useAuthReq from "./hooks/useAuthReq";
import useUserSync from "./hooks/useUserSync";
// import { useQuery } from "@tanstack/react-query";



function App() {
  // const {data,isError,isLoading,refetch} = useQuery();
  const {isClerkLoaded} = useAuthReq();
  useUserSync();

  if(!isClerkLoaded){
    return null;
  }


  return (
    <div className="min-h-screen bg-base-100" >
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/"  element={<HomePage />} />
          <Route path="/product/:id"  element={<ProductPage />} />
          <Route path="/profile"  element={<ProfilePage />} />
          <Route path="/create"  element={<CreatePage />} />
          <Route path="/edit/:id"  element={<EditPage />} />
        </Routes>
      </main>
     
    </div>
  );
} export default App;