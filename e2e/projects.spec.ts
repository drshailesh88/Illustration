import { test, expect } from '@playwright/test';

test.describe('Projects Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
    await page.waitForLoadState('networkidle');
  });

  test('renders without crash', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
    expect(page.url()).toContain('/projects');
  });

  test('displays My Projects heading', async ({ page }) => {
    const heading = page.getByText('My Projects');
    await expect(heading).toBeVisible();
  });

  test('has Home navigation button', async ({ page }) => {
    const homeBtn = page.getByText('Home').first();
    await expect(homeBtn).toBeVisible();
  });

  test('has New Diagram button', async ({ page }) => {
    const newBtn = page.getByText(/new diagram/i).first();
    await expect(newBtn).toBeVisible();
  });

  test('shows empty state message (no projects in test mode)', async ({ page }) => {
    const emptyState = page.getByText(/no projects yet/i);
    await expect(emptyState).toBeVisible();
  });

  test('empty state has create button', async ({ page }) => {
    const createBtn = page.getByText(/create diagram/i).first();
    await expect(createBtn).toBeVisible();
  });

  test('Home button navigates to /', async ({ page }) => {
    const homeBtn = page.locator('.projects-back-btn').first();
    await homeBtn.click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).not.toContain('/projects');
  });

  test('New Diagram button navigates to /editor', async ({ page }) => {
    const newBtn = page.locator('.projects-new-btn').first();
    await newBtn.click();
    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/editor');
  });
});
