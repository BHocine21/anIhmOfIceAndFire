import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import getCharacter from 'services/getCharacter';

import { State, Book } from 'types/types';

const BookDetails = ({ books }) => {
  const [bookDetails, setBookDetails] = useState({});
  // Get book id from route.
  const bookId = parseInt(useParams().bookId, 10);

  /**
   * Get book data by it's id.
   *
   * @param books List of all books.
   * @param bookId book's id.
   * 
   * @return void
   *   If book data exists, update the state with this one.
   */
  const getBookDetails = async (books: Book[], bookId: number) => {
    // Check if id present in the route match with a book.
    const bookDetails = books.find((book: Book) => book.id == bookId);
    if (bookDetails) {
      // Get characters's full names.
      Promise.all(bookDetails.characters.map(async (charactreLink: string) => {
        let fullName = '';
        await getCharacter(charactreLink).then(function (res) {
          fullName = res.name;
        });

        return fullName;
      })).then((res) => {
        const newBookDetails = {...bookDetails};
        // Replace characters links by their full names.
        newBookDetails.characters = res.sort();
        setBookDetails(newBookDetails);
      })
    }
  }

  useEffect(()=> {
    getBookDetails(books, bookId);
  }, [books])

  return (
    <div className='d-flex justify-content-center'>
      <table className='col-6 mt-5 mb-5 table table-hover table-sm table-dark'>
        <tbody>
          <tr>
            <td>Titre</td>
            <td>{bookDetails.name}</td>
          </tr>
          <tr>
            <td>Auteur</td>
            <td>{bookDetails.authors}</td>
          </tr>
          <tr>
            <td>Date de publication</td>
            <td>{bookDetails.released}</td>
          </tr>
          <tr>
            <td>Nombre de pages</td>
            <td>{bookDetails.numberOfPages}</td>
          </tr>
          <tr>
            <td>Pays d'origine</td>
            <td>{bookDetails.country}</td>
          </tr>
          <tr>
            <td>Editeur</td>
            <td>{bookDetails.publisher}</td>
          </tr>
          <tr>
            <td>Personnages</td>
            <td>
              <ul className='characters-list'>
                {bookDetails.characters?.map((character: string, index: number) => (
                  <li key={index}>{character}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
     </table>
    </div>
  )
}

const BookDetailsConnected = connect(
  (state: State) => state,
  {}
)(BookDetails);

export default BookDetailsConnected
