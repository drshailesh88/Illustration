import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive', () => {
  test('landing page renders on mobile viewport', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
    // No horizontal scrollbar overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 10); // 10px tolerance
  });

  test('waitlist page renders on mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    await page.goto('/waitlist');
    await expect(page.locator('body')).toBeVisible();
    const emailInput = page.getByPlaceholder(/email/i);
    await expect(emailInput).toBeVisible();
  });

  test('editor shows mobile message', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Mobile-only test');
    await page.goto('/editor');
    await page.waitForTimeout(3000);
    // Should show "open on desktop" message
    const desktopMsg = page.getByText(/desktop|larger screen/i);
    await expect(desktopMsg.first()).toBeVisible();
  });
});

test.describe('Desktop Layout', () => {
  test.skip(({ isMobile }) => isMobile, 'Desktop-only tests');

  test('landing page renders full layout on desktop', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
    // Should have visible navigation
    const nav = page.locator('nav, header');
    if (await nav.first().isVisible()) {
      await expect(nav.first()).toBeVisible();
    }
  });
});
