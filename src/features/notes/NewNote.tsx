import { useAppSelector } from "../../app/hooks";
import { selectAllUsers } from "../users/usersApiSlice";
import NewNoteForm from "./NewNoteForm";

const NewNote = () => {
  const users = useAppSelector(selectAllUsers);

  if (!users?.length) return <p>Not Currently Available</p>;

  const content = users ? <NewNoteForm users={users} /> : <p>Loading...</p>;

  return content;
};

export default NewNote;
