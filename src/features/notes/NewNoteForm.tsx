import type { User } from "../users/usersApiSlice";
import { useState, useEffect } from "react";
import { useAddNewNoteMutation } from "./notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";

const NewNoteForm = ({ users }: { users: User[] }) => {
  const [addNewNote, { isLoading, isSuccess, isError, error }] =
    useAddNewNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [userId, setUserId] = useState("");

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setText("");
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, navigate]);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onTextChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onUserIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
  };

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSave) {
      await addNewNote({ user: userId, title, text });
    }
  };

  const content = (
    <form className="form" onSubmit={onSaveNoteClicked}>
      <div className="form__title-row">
        <h2>New Note</h2>
        <div className="form__action-buttons">
          <button
            className="icon-button"
            title="Save"
            aria-label="Save"
            disabled={!canSave}
          >
            <FontAwesomeIcon icon={faSave} />
          </button>
        </div>
      </div>
      <label className="form__label" htmlFor="title">
        Title
      </label>
      <input
        className={`form__input ${title ? "" : "form__input--incomplete"}`}
        id="title"
        name="title"
        type="text"
        autoComplete="off"
        value={title}
        onChange={onTitleChanged}
      />
      <label className="form__label" htmlFor="text">
        Text
      </label>
      <textarea
        className={`form__input form__input--text ${
          text ? "" : "form__input--incomplete"
        }`}
        id="text"
        name="text"
        rows={5}
        value={text}
        onChange={onTextChanged}
      />
      <label className="form__label form__label--select" htmlFor="user">
        User
      </label>
      <select
        className={`form__input form__input--select ${
          userId ? "" : "form__input--incomplete"
        }`}
        id="user"
        name="user"
        value={userId}
        onChange={onUserIdChanged}
      >
        <option value=""></option>
        {options}
      </select>
    </form>
  );

  return content;
};

export default NewNoteForm;
