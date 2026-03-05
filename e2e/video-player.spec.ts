import { test, expect } from '@playwright/test';

test.describe('Video Streaming Platform', () => {
  test('should load the video library', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Video Library' })).toBeVisible();
    await expect(page.getByRole('searchbox', { name: 'Search videos' })).toBeVisible();
  });

  test('should search for videos', async ({ page }) => {
    await page.goto('/');
    const searchBox = page.getByRole('searchbox', { name: 'Search videos' });
    await searchBox.fill('Buck');
    await expect(page.getByRole('heading', { name: /Big Buck Bunny/i })).toBeVisible();
  });

  test('should filter by category', async ({ page }) => {
    await page.goto('/');
    const animationTab = page.getByRole('tab', { name: 'Animation' });
    await animationTab.click();
    await expect(animationTab).toHaveAttribute('aria-selected', 'true');
  });

  test('should navigate to video detail page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Big Buck Bunny/ }).first().click();
    await expect(page).toHaveURL(/\/video\/\d+/);
    await expect(page.getByRole('heading', { name: 'Big Buck Bunny', level: 1 })).toBeVisible();
  });

  test('should toggle favorite', async ({ page }) => {
    await page.goto('/');
    const favoriteButton = page.getByRole('button', { name: 'Add to favorites' }).first();
    await favoriteButton.click();
    await expect(page.getByRole('button', { name: 'Remove from favorites' }).first()).toBeVisible();
  });
});
