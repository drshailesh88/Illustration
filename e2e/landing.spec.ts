import { test, expect } from '@playwright/test';

test.describe('Landing / Welcome Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('renders without crash or JS errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toBeVisible();
    const bodyText = await page.locator('body').textContent();
    expect(bodyText && bodyText.trim().length > 50).toBeTruthy();
    expect(errors).toHaveLength(0);
  });

  test('displays FINNISH logo', async ({ page }) => {
    await expect(page.getByText('FINNISH').first()).toBeVisible();
  });

  test('displays hero heading', async ({ page }) => {
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
    await expect(h1).toContainText(/illustration|seconds/i);
  });

  test('has Get Started CTA button', async ({ page }) => {
    const cta = page.getByRole('link', { name: /get started/i }).first();
    await expect(cta).toBeVisible();
  });

  test('has Sign In link', async ({ page }) => {
    const signIn = page.getByText(/sign in/i).first();
    await expect(signIn).toBeVisible();
  });

  test('has See Pricing link', async ({ page }) => {
    const pricing = page.getByText(/see pricing|pricing/i).first();
    await expect(pricing).toBeVisible();
  });

  test('displays How It Works section with 3 steps', async ({ page }) => {
    const howItWorks = page.getByText(/three steps/i);
    await expect(howItWorks).toBeVisible();
  });

  test('displays diagram types section', async ({ page }) => {
    const diagramTypes = page.getByText(/every diagram type/i);
    await expect(diagramTypes).toBeVisible();
    // PRISMA should be mentioned
    await expect(page.getByText('PRISMA').first()).toBeVisible();
  });

  test('footer has navigation links', async ({ page }) => {
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
    await expect(footer.getByText(/pricing/i).first()).toBeVisible();
    await expect(footer.getByText(/credits/i).first()).toBeVisible();
  });

  test('footer Pricing link navigates correctly', async ({ page }) => {
    const pricingLink = page.locator('footer a[href="/pricing"]').first();
    if (await pricingLink.isVisible()) {
      await pricingLink.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('/pricing');
    }
  });
});
