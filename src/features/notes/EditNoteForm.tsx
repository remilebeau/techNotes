import type { Note } from "../notes/notesApiSlice";
import type { User } from "../users/usersApiSlice";
import { useState, useEffect } from "react";
import {
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from "../notes/notesApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const EditNoteForm = ({ note, users }: { note: Note; users: User[] }) => {
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  const [deleteNote, { isSuccess: isDelSuccess, isError: delerror }] =
    useDeleteNoteMutation();

  const navigate = useNavigate();

  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [completed, setCompleted] = useState(note.completed);
  const [userId, setUserId] = useState(note.user);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setTitle("");
      setText("");
      setCompleted(false);
      setUserId("");
      navigate("/dash/notes");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onTextChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onCompletedChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.checked);
  };

  const onUserIdChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(e.target.value);
  };

  const canSave = [title, text, userId].every(Boolean) && !isLoading;

  const onSaveNoteClicked = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canSave) {
      await updateNote({ id: note.id, user: userId, title, text, completed });
    }
  };

  const onDeleteNoteClicked = async () => {
    await deleteNote({ id: note.id });
  };

  const created = new Date(note.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(note.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = users.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  const errClass = isError || delerror ? "errmsg" : "offscreen";
  const validTitleClass = !title ? "form__input--incomplete" : "";
  const validTextClass = !text ? "form__input--incomplete" : "";

  const errContent = (
    <p className={errClass}>
      <FontAwesomeIcon icon={faTrashCan} />
      {(error as any)?.data?.message || (delerror as any)?.data?.message}
    </p>
  );

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={onSaveNoteClicked}>
        <div className="form__title-row">
          <h2>Edit Note</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              aria-label="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              aria-label="Delete"
              onClick={onDeleteNoteClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="title">
          Title
        </label>
        <input
          className={`form__input ${validTitleClass}`}
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
          className={`form__input form__input--text ${validTextClass}`}
          id="text"
          name="text"
          rows={5}
          value={text}
          onChange={onTextChanged}
        />
        <label
          className="form__label form__label--checkbox"
          htmlFor="completed"
        >
          <input
            className="form__checkbox"
            id="completed"
            name="completed"
            type="checkbox"
            checked={completed}
            onChange={onCompletedChanged}
          />
          Completed
        </label>
        <label className="form__label form__label--select" htmlFor="user">
          User
        </label>
        <select
          className={`form__input form__input--select ${validTextClass}`}
          id="user"
          name="user"
          value={userId}
          onChange={onUserIdChanged}
        >
          <option value=""></option>
          {options}
        </select>
      </form>
    </>
  );

  return content;
};

export default EditNoteForm;
