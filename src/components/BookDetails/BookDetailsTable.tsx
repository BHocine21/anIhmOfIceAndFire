import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';

import { CharacterList } from 'components/BookDetails/CharacterList';
import type { BookDetailsViewModel } from 'types/types';

export interface BookDetailsTableProps {
  bookDetails: BookDetailsViewModel;
}

export const BookDetailsTable = ({ bookDetails }: BookDetailsTableProps) => (
  <TableContainer
    component={Paper}
    elevation={3}
    sx={{ maxWidth: 560, mx: 'auto', mt: 5, mb: 5, bgcolor: 'rgba(21,21,26,0.85)' }}
  >
    <Table aria-label="Book details">
      <TableBody>
        <TableRow>
          <TableCell component="th" scope="row">
            Title
          </TableCell>
          <TableCell>{bookDetails.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Author
          </TableCell>
          <TableCell>{bookDetails.authors}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Release date
          </TableCell>
          <TableCell>{bookDetails.released}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Number of pages
          </TableCell>
          <TableCell>{bookDetails.numberOfPages}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Country
          </TableCell>
          <TableCell>{bookDetails.country}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Publisher
          </TableCell>
          <TableCell>{bookDetails.publisher}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell component="th" scope="row">
            Characters
          </TableCell>
          <TableCell>
            <CharacterList characters={bookDetails.characters} />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </TableContainer>
);
