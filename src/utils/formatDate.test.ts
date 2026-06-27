import { formatDate } from 'utils/formatDate';

describe('formatDate', () => {
  it('formats an ISO date as dd/mm/yyyy', () => {
    expect(formatDate('1996-08-06')).toBe('06/08/1996');
  });

  it('returns the original string when the date is invalid', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date');
  });
});
