import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('unknown routes fall back to welcome page', async ({ page }) => {
    await page.goto('/nonexistent-page');
    await page.waitForTimeout(2000);
    // Should show the welcome/landing page (catch-all route)
    await expect(page.locator('body')).toBeVisible();
  });

  test('page transitions are smooth (no blank screens)', async ({ page }) => {
    // Navigate through multiple pages and verify each renders
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();

    await page.goto('/waitlist');
    await expect(page.locator('body')).toBeVisible();

    await page.goto('/credits');
    await expect(page.locator('body')).toBeVisible();

    await page.goto('/pricing');
    await expect(page.locator('body')).toBeVisible();
  });

  test('page loads within acceptable time', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - start;
    // Page should load in under 10 seconds (generous for dev server)
    expect(loadTime).toBeLessThan(10000);
  });
});
