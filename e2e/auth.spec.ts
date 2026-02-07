import { test, expect } from '@playwright/test';

test.describe('Authentication Bypass (Test Mode)', () => {
  test('protected route /agent does not redirect to sign-in', async ({ page }) => {
    await page.goto('/agent');
    await page.waitForLoadState('networkidle');
    // In test mode, agent page loads directly (Pro tier granted)
    expect(page.url()).toContain('/agent');
    expect(page.url()).not.toContain('sign-in');
  });

  test('protected route /editor does not redirect to sign-in', async ({ page }) => {
    await page.goto('/editor');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/editor');
    expect(page.url()).not.toContain('sign-in');
  });

  test('protected route /projects does not redirect to sign-in', async ({ page }) => {
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/projects');
    expect(page.url()).not.toContain('sign-in');
  });

  test('ProGate grants access to Agent Mode (Pro tier)', async ({ page }) => {
    await page.goto('/agent');
    await page.waitForLoadState('networkidle');
    // Should NOT show UpgradeCTA
    const upgradeCTA = page.getByText(/upgrade|subscription required/i);
    await expect(upgradeCTA).toHaveCount(0);
    // Should show the actual Agent Mode UI (textarea or template gallery)
    const agentUI = page.locator('textarea').first();
    await expect(agentUI).toBeVisible({ timeout: 10000 });
  });
});
