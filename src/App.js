import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// const Main = lazy(() => import("./pages/Main"));
const Login = lazy(() => import("./pages/Login"));
const Logout = lazy(() => import("./pages/Logout"));
const Signup = lazy(() => import("./pages/Signup"));
const AllQuestions = lazy(() => import("./pages/AllQuestions"));
const AskQuestions = lazy(() => import("./pages/AskQuestions"));
const EditQuestion = lazy(() => import("./pages/EditQuestion"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading....!</div>}></Suspense>
      <Routes>
        {/* <Route path="/" element={<Main />}></Route> */}
        <Route path="/" element={<AllQuestions />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        {/* <Route path="/allquestions" element={<AllQuestions />}></Route> */}
        <Route path="/askquestions" element={<AskQuestions />}></Route>
        <Route path="/editquestion" element={<EditQuestion />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
