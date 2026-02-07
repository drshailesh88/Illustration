import { test, expect } from '@playwright/test';

test.describe('Credits Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/credits');
    await page.waitForLoadState('networkidle');
  });

  test('renders without crash', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
    expect(page.url()).toContain('/credits');
  });

  test('displays Credits & Attribution heading', async ({ page }) => {
    const heading = page.getByText(/credits|attribution/i).first();
    await expect(heading).toBeVisible();
  });

  test('has Back to Home link', async ({ page }) => {
    const backLink = page.getByText(/back to home/i);
    await expect(backLink).toBeVisible();
  });

  test('displays FINNISH logo', async ({ page }) => {
    await expect(page.getByText('FINNISH').first()).toBeVisible();
  });

  test('lists icon library attributions', async ({ page }) => {
    // Should mention Tabler Icons
    const tabler = page.getByText(/tabler/i).first();
    await expect(tabler).toBeVisible();
  });

  test('shows license badges', async ({ page }) => {
    // Should show license types like MIT, CC-BY, CC0
    const licenseText = page.getByText(/MIT|CC-BY|CC0|Apache/i).first();
    await expect(licenseText).toBeVisible();
  });

  test('has external links for libraries', async ({ page }) => {
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});
