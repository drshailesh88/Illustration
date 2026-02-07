import { test, expect } from '@playwright/test';

test.describe('Desktop Layout', () => {
  test('landing page renders full layout', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
    // Should have hero heading
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('editor has toolbar on desktop', async ({ page }) => {
    await page.goto('/editor');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    const toolbar = page.locator('[aria-label="Drawing tools"]');
    await expect(toolbar).toBeVisible();
  });

  test('agent mode has template sidebar on desktop', async ({ page }) => {
    await page.goto('/agent');
    await page.waitForLoadState('networkidle');
    const templates = page.getByText('Templates').first();
    await expect(templates).toBeVisible({ timeout: 10000 });
  });

  test('no horizontal overflow on any page', async ({ page }) => {
    const routes = ['/', '/waitlist', '/pricing', '/credits'];
    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
    }
  });
});
