import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByRole('searchbox', { name: 'Search videos' })).toBeVisible();
    await expect(page.getByRole('tablist', { name: 'Video categories' })).toBeVisible();
  });

  test('should have semantic HTML', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should have accessible buttons', async ({ page }) => {
    await page.goto('/');
    
    const favoriteButtons = page.getByRole('button', { name: /favorites/ });
    await expect(favoriteButtons.first()).toBeVisible();
  });
});
