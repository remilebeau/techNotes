import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import PersistLogin from "./features/auth/PersistLogin";

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

        {/* wrap the protected routes in Prefetch and PersistLogin*/}
        <Route element={<Prefetch />}>
          <Route element={<PersistLogin />}>
            {/* layout for protected routes */}
            <Route path="dash" element={<DashLayout />}>
              {/* /dash */}
              <Route index element={<Welcome />} />

              {/* /dash/users */}
              <Route path="users">
                <Route index element={<UsersList />} />
                {/* /dash/users/:id */}
                <Route path=":id" element={<EditUser />} />
                {/* /dash/users/new */}
                <Route path="new" element={<NewUserForm />} />
              </Route>

              {/* /dash/notes */}
              <Route path="notes">
                <Route index element={<NotesList />} />
                {/* /dash/notes/:id */}
                <Route path=":id" element={<EditNote />} />
                {/* /dash/notes/new */}
                <Route path="new" element={<NewNote />} />
              </Route>

              {/* end protected routes */}
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
