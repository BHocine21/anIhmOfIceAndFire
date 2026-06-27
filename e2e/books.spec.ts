import { expect, test } from '@playwright/test';

test.describe('Books browsing', () => {
  test('lists the books and navigates to a book details page', async ({ page }) => {
    await page.goto('/');

    const booksList = page.getByRole('list', { name: /books list/i });
    await expect(booksList).toBeVisible();

    const firstBookLink = booksList.getByRole('link').first();
    const bookTitle = await firstBookLink.locator('h6, p').first().textContent();
    await firstBookLink.click();

    await expect(page.getByRole('table', { name: /book details/i })).toBeVisible();
    if (bookTitle) {
      await expect(page.getByText(bookTitle.trim())).toBeVisible();
    }
  });

  test('shows an empty state when navigating to an unknown book id', async ({ page }) => {
    await page.goto('/book/999999');

    await expect(page.getByText('This book could not be found.')).toBeVisible();
  });

  test('the header logo links back to the home page', async ({ page }) => {
    await page.goto('/book/999999');

    await page.getByRole('link', { name: /back to home/i }).click();

    await expect(page.getByRole('list', { name: /books list/i })).toBeVisible();
  });
});
