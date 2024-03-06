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
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("Dan D. Repairs");
  return (
    <Routes>
      {/* begin public routes */}
      <Route path="/" element={<Layout />}>
        {/* / */}
        <Route index element={<Public />} />
        {/* /login */}
        <Route path="login" element={<Login />} />
        {/* end public routes */}

        {/* begin protected routes */}
        {/* wrap the protected routes in Prefetch, PersistLogin, and RequireAuth components */}
        <Route element={<Prefetch />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<PersistLogin />}>
              <Route path="dash" element={<DashLayout />}>
                {/* /dash */}
                <Route index element={<Welcome />} />

                {/* /dash/users */}
                <Route
                  element={
                    <RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />
                  }
                >
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    {/* /dash/users/:id */}
                    <Route path=":id" element={<EditUser />} />
                    {/* /dash/users/new */}
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>

                {/* /dash/notes */}
                <Route path="notes">
                  <Route index element={<NotesList />} />
                  {/* /dash/notes/:id */}
                  <Route path=":id" element={<EditNote />} />
                  {/* /dash/notes/new */}
                  <Route path="new" element={<NewNote />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
        {/* end protected routes */}
      </Route>
    </Routes>
  );
}

export default App;
