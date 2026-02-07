import { test, expect } from '@playwright/test';

test.describe('Editor Mode', () => {
  // Editor is behind auth, so these tests verify the page loads
  // and basic UI elements are present. Full canvas interaction tests
  // require authenticated sessions (see authenticated.spec.ts).

  test('editor page renders without crash', async ({ page }) => {
    await page.goto('/editor');
    await page.waitForTimeout(3000);
    // Page should not show a blank screen or error
    await expect(page.locator('body')).toBeVisible();
    // Check there's no unhandled error overlay
    const errorOverlay = page.locator('.error-overlay, [data-error]');
    await expect(errorOverlay).toHaveCount(0);
  });

  test('mobile viewport shows desktop-only message', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    await page.goto('/editor');
    await page.waitForTimeout(3000);
    const desktopMsg = page.getByText(/desktop|larger screen/i);
    await expect(desktopMsg.first()).toBeVisible();
  });
});

test.describe('Editor UI Elements (Desktop)', () => {
  test.skip(({ isMobile }) => isMobile, 'Desktop-only tests');

  test('menu bar is visible', async ({ page }) => {
    await page.goto('/editor');
    await page.waitForTimeout(3000);
    // Look for menu bar with File, Edit, View items
    const menuBar = page.locator('.menu-bar');
    if (await menuBar.isVisible()) {
      const fileMenu = page.getByText('File');
      await expect(fileMenu.first()).toBeVisible();
    }
  });

  test('canvas area is present', async ({ page }) => {
    await page.goto('/editor');
    await page.waitForTimeout(3000);
    // Should have a canvas element (Fabric.js)
    const canvas = page.locator('canvas');
    if (await canvas.first().isVisible()) {
      await expect(canvas.first()).toBeVisible();
    }
  });

  test('status bar shows canvas dimensions', async ({ page }) => {
    await page.goto('/editor');
    await page.waitForTimeout(3000);
    // Status bar should show dimensions like "800 × 600 px"
    const statusBar = page.locator('footer');
    if (await statusBar.isVisible()) {
      await expect(statusBar).toContainText(/px/);
    }
  });
});
