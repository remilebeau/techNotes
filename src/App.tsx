import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
function App() {
  return (
    <Routes>
      {/* begin public routes */}

      {/* layout for public routes */}
      <Route path="/" element={<Layout />}>
        {/* / */}
        <Route index element={<Public />} />

        {/* /login */}
        <Route path="login" element={<Login />} />

        {/* end public routes */}

        {/* begin protected routes */}

        {/* layout for protected routes */}
        <Route path="dash" element={<DashLayout />}>
          {/* /dash */}
          <Route index element={<Welcome />} />

          {/* /dash/notes */}
          <Route path="notes" element={<NotesList />}>
            {/* add more notes routes here */}
          </Route>

          {/* /dash/users */}
          <Route path="users" element={<UsersList />}>
            {/* add more users routes here */}
          </Route>

          {/* end protected routes */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
