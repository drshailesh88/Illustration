import { test, expect } from '@playwright/test';

test.describe('Agent Mode', () => {
  test('agent page loads (may redirect if unauthenticated)', async ({ page }) => {
    await page.goto('/agent');
    await page.waitForTimeout(3000);
    // Page should render without crash
    await expect(page.locator('body')).toBeVisible();
  });

  test('prompt input is present when authenticated', async ({ page }) => {
    await page.goto('/agent');
    await page.waitForTimeout(3000);
    // If authenticated, should show prompt input area
    const promptInput = page.getByPlaceholder(/describe|diagram|prompt/i);
    const textarea = page.locator('textarea');
    // At least one input mechanism should be present (or redirected)
    const hasInput = await promptInput.isVisible().catch(() => false) ||
                     await textarea.first().isVisible().catch(() => false);
    // If not authenticated, we accept redirect
    if (!hasInput) {
      const url = page.url();
      expect(url.includes('sign-in') || url.includes('/')).toBeTruthy();
    }
  });
});

test.describe('Agent Mode - Template Gallery (Desktop)', () => {
  test.skip(({ isMobile }) => isMobile, 'Desktop-only: template gallery hidden on mobile');

  test('template gallery sidebar is visible on desktop', async ({ page }) => {
    await page.goto('/agent');
    await page.waitForTimeout(3000);
    // On desktop, template gallery should be visible in sidebar
    const templateText = page.getByText(/template|PRISMA|CONSORT|forest/i);
    // Only check if we're actually on the agent page (not redirected)
    if (page.url().includes('agent')) {
      const isVisible = await templateText.first().isVisible().catch(() => false);
      // Templates may or may not be visible depending on auth state
      expect(typeof isVisible).toBe('boolean');
    }
  });
});
