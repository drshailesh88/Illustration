import { test, expect } from '@playwright/test';

test.describe('Route Navigation', () => {
  test('all public routes render content', async ({ page }) => {
    const routes = [
      { path: '/', mustContain: /finnish|illustration/i },
      { path: '/waitlist', mustContain: /waitlist|email/i },
      { path: '/credits', mustContain: /credit|attribution/i },
      { path: '/pricing', mustContain: /plan|pro|free/i },
    ];

    for (const route of routes) {
      await page.goto(route.path);
      await page.waitForLoadState('networkidle');
      await expect(page.locator('body')).toBeVisible();
      await expect(page.locator('body')).toContainText(route.mustContain);
    }
  });

  test('protected route /agent accessible in test mode', async ({ page }) => {
    await page.goto('/agent');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/agent');
    expect(page.url()).not.toContain('sign-in');
  });

  test('protected route /editor accessible in test mode', async ({ page }) => {
    await page.goto('/editor', { timeout: 60000 });
    await page.waitForLoadState('domcontentloaded');
    expect(page.url()).toContain('/editor');
  });

  test('protected route /projects accessible in test mode', async ({ page }) => {
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/projects');
  });

  test('unknown routes fall back to welcome page', async ({ page }) => {
    await page.goto('/nonexistent-page-xyz');
    await page.waitForLoadState('networkidle');
    // Should render the welcome page content
    await expect(page.getByText('FINNISH').first()).toBeVisible();
  });

  test('sign-in route redirects to /agent in test mode', async ({ page }) => {
    await page.goto('/sign-in');
    await page.waitForURL('**/agent', { timeout: 15000 });
    expect(page.url()).toContain('/agent');
  });

  test('sign-up route redirects to /agent in test mode', async ({ page }) => {
    await page.goto('/sign-up');
    await page.waitForURL('**/agent', { timeout: 15000 });
    expect(page.url()).toContain('/agent');
  });

  test('page loads within acceptable time', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(15000);
  });

  test('transitions between pages have no blank screen', async ({ page }) => {
    const routes = ['/', '/waitlist', '/pricing', '/credits', '/agent', '/editor', '/projects'];
    for (const route of routes) {
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      const bodyText = await page.locator('body').textContent();
      expect(bodyText && bodyText.trim().length > 5).toBeTruthy();
    }
  });
});
