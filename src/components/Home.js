import React, { useEffect } from "react";
import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import BookDetails from "./BookDetails";
import { Link } from "react-router-dom";
const Home = () => {
  const { books, dispatch } = useBooksContext();
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/book", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_BOOKS", payload: json });
      }
    };

    if (user) {
      fetchBooks();
    }
  }, [dispatch, user]);
  return (
    <div>
      <div>
        <ul className="nav justify-content-center">
          <h1>Book List</h1>
        </ul>
      </div>
      <div>
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link className="btn btn-warning" to="/addbook">
              + Add New Book
            </Link>
          </li>

          <li className="nav-item">
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
        <ul className="nav justify-content-end"></ul>
      </div>

      <div className="home">
        <div className="books row">
          {books &&
            books.map((book) => <BookDetails key={book._id} book={book} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
