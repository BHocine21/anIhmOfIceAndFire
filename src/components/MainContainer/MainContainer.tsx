import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { State, Book } from 'types/types';

export const MainContainer = ({ books }) => (
  <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
    <div className='d-flex justify-content-center align-items-center h-100'>
      <div className='text-white col-6'>
        <div className='list-group mt-5 mb-5 opacity-50'>
          {books.map((book: Book) => (
            <Link
                className='list-group-item list-group-item-action flex-column align-items-start'
                to={`/book/${book.id}`}
                key={book.id}
            >
              <h5>{book.name}</h5>
              <small>{book.authors}</small>
              <br></br>
              <small>{book.released}</small>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MainContainerConnected = connect(
  (state: State) => state,
  {}
)(MainContainer);

export default MainContainerConnected
