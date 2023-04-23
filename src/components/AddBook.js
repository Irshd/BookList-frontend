import { useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link, Navigate } from "react-router-dom";
const AddBook = () => {
  const { dispatch } = useBooksContext();
  const { user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [publisher, setPublisher] = useState("");

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const book = { title, isbn, author, description, publisher };

    const response = await fetch("/book", {
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setIsbn("");
      setAuthor("");
      setDescription("");
      setPublisher("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_BOOK", payload: json });
    }
    <Navigate to="/" />;
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h1>Add Book</h1>
      <h3>create new book</h3>
      <div className="row mb-3">
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title of the book"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-10">
          <input
            className="form-control"
            type="number"
            onChange={(e) => setIsbn(e.target.value)}
            value={isbn}
            placeholder="ISBN"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-10">
          <input
            className="form-control"
            type="text"
            onChange={(e) => setAuthor(e.target.value)}
            value={author}
            placeholder="Author"
          />
        </div>
      </div>{" "}
      <div className="row mb-3">
        <div className="col-sm-10">
          <input
            className="form-control"
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Describe this book"
          />
        </div>
      </div>{" "}
      <div className="row mb-3">
        <div className="col-sm-10">
          <input
            className="form-control"
            type="text"
            onChange={(e) => setPublisher(e.target.value)}
            value={publisher}
            placeholder="Publisher of this book"
          />
        </div>
      </div>{" "}
      <button>Add Book</button>
      <Link className="booklistbtn" to="/">
        {" "}
        Book list
      </Link>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default AddBook;
