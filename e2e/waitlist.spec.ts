import { test, expect } from '@playwright/test';

test.describe('Waitlist Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/waitlist');
    await page.waitForLoadState('networkidle');
  });

  test('renders hero section with FINNISH branding', async ({ page }) => {
    await expect(page.locator('.waitlist-logo')).toContainText('FINNISH');
    const headline = page.locator('.waitlist-headline');
    await expect(headline).toBeVisible();
  });

  test('email input is present', async ({ page }) => {
    const emailInput = page.getByPlaceholder(/email/i);
    await expect(emailInput).toBeVisible();
  });

  test('submit button is present', async ({ page }) => {
    const submitBtn = page.locator('.waitlist-submit-btn');
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toContainText(/join/i);
  });

  test('email input validates required field', async ({ page }) => {
    const submitBtn = page.locator('.waitlist-submit-btn');
    await submitBtn.click();
    // HTML5 validation should prevent submission of empty email
    const emailInput = page.locator('.waitlist-email-input');
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.checkValidity());
    expect(isInvalid).toBeTruthy();
  });

  test('form submission shows success message (test mode)', async ({ page }) => {
    const emailInput = page.getByPlaceholder(/email/i);
    await emailInput.fill('test@example.com');
    const submitBtn = page.locator('.waitlist-submit-btn');
    await submitBtn.click();
    // In test mode, should show success result
    const result = page.locator('.waitlist-result--success');
    await expect(result).toBeVisible({ timeout: 5000 });
  });

  test('email field clears after successful submission', async ({ page }) => {
    const emailInput = page.getByPlaceholder(/email/i);
    await emailInput.fill('test@example.com');
    await page.locator('.waitlist-submit-btn').click();
    await page.waitForTimeout(500);
    await expect(emailInput).toHaveValue('');
  });
});
