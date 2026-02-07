import { test, expect } from '@playwright/test';

test.describe('Pricing Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing');
    await page.waitForLoadState('networkidle');
  });

  test('renders without crash', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
    expect(page.url()).toContain('/pricing');
  });

  test('displays Choose Your Plan heading', async ({ page }) => {
    const heading = page.getByText(/choose your plan/i);
    await expect(heading).toBeVisible();
  });

  test('has Back button', async ({ page }) => {
    const backBtn = page.getByText(/back/i).first();
    await expect(backBtn).toBeVisible();
  });

  test('displays Free plan', async ({ page }) => {
    const freePlan = page.getByText('Free', { exact: true }).first();
    await expect(freePlan).toBeVisible();
  });

  test('displays Pro plan', async ({ page }) => {
    const proPlan = page.getByText('Pro', { exact: true }).first();
    await expect(proPlan).toBeVisible();
  });

  test('displays Team plan', async ({ page }) => {
    const teamPlan = page.getByText(/team|lab/i).first();
    await expect(teamPlan).toBeVisible();
  });

  test('plan cards show pricing', async ({ page }) => {
    // Should show currency symbols
    const priceText = page.getByText(/₹|free|forever/i).first();
    await expect(priceText).toBeVisible();
  });

  test('plan cards list features', async ({ page }) => {
    // Should have feature lists with checkmarks
    const features = page.locator('li');
    const count = await features.count();
    expect(count).toBeGreaterThan(3);
  });
});
