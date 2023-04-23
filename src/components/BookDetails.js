import { useBooksContext } from "../hooks/useBooksContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Image from "../images/image1.jpg";
// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const BookDetails = ({ book }) => {
  const { dispatch } = useBooksContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch("/book/" + book._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_BOOK", payload: json });
    }
  };

  return (
    <div className="col-4">
      <div className="card">
        <img src={Image} className="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">{book.title}</h5>

          <p className="card-text">{book.author}</p>
          <p className="card-text">{book.description}</p>

          {/* <p>
                {formatDistanceToNow(new Date(book.createdAt), {
                  addSuffix: true,
                })}
              </p> */}
          <button>Edit</button>
          <button className="material-symbols-outlined" onClick={handleClick}>
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
