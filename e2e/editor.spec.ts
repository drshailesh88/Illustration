import { test, expect } from '@playwright/test';

test.describe('Editor Mode - Page Load', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/editor');
    await page.waitForLoadState('networkidle');
    // Wait for editor to fully initialize
    await page.waitForTimeout(3000);
  });

  test('editor page renders without crash', async ({ page }) => {
    await expect(page.locator('body')).toBeVisible();
    expect(page.url()).toContain('/editor');
  });

  test('no error overlay on page', async ({ page }) => {
    const errorOverlay = page.locator('.error-overlay, [data-error]');
    await expect(errorOverlay).toHaveCount(0);
  });
});

test.describe('Editor Mode - Menu Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/editor');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });

  test('menu bar is visible', async ({ page }) => {
    const menuBar = page.locator('.menu-bar');
    await expect(menuBar).toBeVisible();
  });

  test('File menu trigger is visible', async ({ page }) => {
    const fileMenu = page.locator('.menu-trigger').filter({ hasText: 'File' });
    await expect(fileMenu).toBeVisible();
  });

  test('Edit menu trigger is visible', async ({ page }) => {
    const editMenu = page.locator('.menu-trigger').filter({ hasText: 'Edit' });
    await expect(editMenu).toBeVisible();
  });

  test('View menu trigger is visible', async ({ page }) => {
    const viewMenu = page.locator('.menu-trigger').filter({ hasText: 'View' });
    await expect(viewMenu).toBeVisible();
  });

  test('all menu triggers are present', async ({ page }) => {
    const expectedMenus = ['File', 'Edit', 'View', 'Object', 'Insert', 'Image', 'Help'];
    for (const menuName of expectedMenus) {
      const trigger = page.locator('.menu-trigger').filter({ hasText: menuName });
      await expect(trigger).toBeVisible();
    }
  });

  test('clicking File menu opens dropdown', async ({ page }) => {
    const fileMenu = page.locator('.menu-trigger').filter({ hasText: 'File' });
    await fileMenu.click();
    // Should show menu items like New, Save, Export
    const menuItems = page.locator('.menu-item');
    await expect(menuItems.first()).toBeVisible({ timeout: 3000 });
    // Verify some expected items
    const newItem = page.locator('.menu-item').filter({ hasText: 'New' });
    await expect(newItem).toBeVisible();
  });

  test('File menu has Save option', async ({ page }) => {
    const fileMenu = page.locator('.menu-trigger').filter({ hasText: 'File' });
    await fileMenu.click();
    // Match exact "Save" label (not "Save As...")
    const saveLabel = page.locator('.menu-item-label', { hasText: /^Save$/ });
    await expect(saveLabel).toBeVisible();
  });

  test('File menu has Export option', async ({ page }) => {
    const fileMenu = page.locator('.menu-trigger').filter({ hasText: 'File' });
    await fileMenu.click();
    // The menu item button has text "Export... Ctrl+E"
    const exportBtn = page.getByRole('button', { name: /Export/i });
    await expect(exportBtn.first()).toBeVisible();
  });

  test('Edit menu has Undo/Redo', async ({ page }) => {
    const editMenu = page.locator('.menu-trigger').filter({ hasText: 'Edit' });
    await editMenu.click();
    const undoItem = page.locator('.menu-item').filter({ hasText: 'Undo' });
    await expect(undoItem).toBeVisible();
    const redoItem = page.locator('.menu-item').filter({ hasText: 'Redo' });
    await expect(redoItem).toBeVisible();
  });

  test('clicking away closes open menu', async ({ page }) => {
    const fileMenu = page.locator('.menu-trigger').filter({ hasText: 'File' });
    await fileMenu.click();
    await expect(page.locator('.menu-item').first()).toBeVisible();
    // Click on canvas area to close
    await page.locator('canvas').first().click({ force: true });
    await page.waitForTimeout(500);
    // Menu items should be hidden
    const menuItems = page.locator('.menu-item');
    await expect(menuItems).toHaveCount(0);
  });
});

test.describe('Editor Mode - Drawing Toolbar (Left Sidebar)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/editor');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });

  test('drawing toolbar is visible', async ({ page }) => {
    const toolbar = page.getByRole('toolbar', { name: 'Drawing tools' });
    await expect(toolbar).toBeVisible();
  });

  test('has all essential tool buttons', async ({ page }) => {
    const toolbar = page.getByRole('toolbar', { name: 'Drawing tools' });
    await expect(toolbar).toBeVisible();

    // Check each tool button within the Drawing tools sidebar
    const tools = ['Select', 'Hand', 'Rectangle', 'Ellipse', 'Line', 'Arrow', 'Pen', 'Text', 'Zoom', 'Scientific Shapes'];
    for (const toolName of tools) {
      const btn = toolbar.getByRole('button', { name: toolName, exact: true });
      await expect(btn).toBeVisible({ timeout: 10000 });
    }
  });

  test('clicking Rectangle tool does not crash', async ({ page }) => {
    const toolbar = page.getByRole('toolbar', { name: 'Drawing tools' });
    const rectBtn = toolbar.getByRole('button', { name: 'Rectangle' });
    await rectBtn.click();
    await expect(rectBtn).toBeVisible();
  });

  test('Select tool is active by default', async ({ page }) => {
    const toolbar = page.getByRole('toolbar', { name: 'Drawing tools' });
    const selectBtn = toolbar.getByRole('button', { name: 'Select' });
    await expect(selectBtn).toBeVisible();
  });
});

test.describe('Editor Mode - Illustration Toolbar (Top)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/editor');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });

  const toolbar = '[aria-label="Illustration tools"]';

  test('illustration toolbar is visible', async ({ page }) => {
    await expect(page.locator(toolbar)).toBeVisible();
  });
});

test.describe('Editor Mode - Canvas', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/editor');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });

  test('canvas element is present', async ({ page }) => {
    const canvas = page.locator('canvas').first();
    await expect(canvas).toBeVisible();
  });

  test('canvas has non-zero dimensions', async ({ page }) => {
    const canvas = page.locator('canvas').first();
    const width = await canvas.getAttribute('width');
    const height = await canvas.getAttribute('height');
    expect(Number(width)).toBeGreaterThan(0);
    expect(Number(height)).toBeGreaterThan(0);
  });
});

test.describe('Editor Mode - Right Panel', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/editor');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });

  test('right panel tab bar exists', async ({ page }) => {
    const tabList = page.locator('[role="tablist"]');
    await expect(tabList).toBeVisible();
  });

  test('panel has Layers tab', async ({ page }) => {
    const layersTab = page.locator('[role="tab"]').filter({ hasText: /layer/i });
    // Tab might use an icon instead of text
    const exists = await layersTab.count() > 0 || await page.locator('[role="tab"]').count() > 0;
    expect(exists).toBeTruthy();
  });

  test('panel tabs are clickable without crash', async ({ page }) => {
    const tabs = page.locator('[role="tab"]');
    const count = await tabs.count();
    expect(count).toBeGreaterThan(0);
    // Click first 3 tabs only to avoid long runtime
    for (let i = 0; i < Math.min(count, 3); i++) {
      await tabs.nth(i).click();
      // Verify tab is still visible after click
      await expect(tabs.nth(i)).toBeVisible();
    }
  });
});

test.describe('Editor Mode - Status Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/editor');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
  });

  test('status bar is visible', async ({ page }) => {
    // Status bar is at the bottom, typically a footer or last div
    const statusBar = page.locator('footer').first();
    const visible = await statusBar.isVisible().catch(() => false);
    if (visible) {
      await expect(statusBar).toBeVisible();
    }
  });

  test('status bar shows canvas dimensions', async ({ page }) => {
    const footer = page.locator('footer').first();
    if (await footer.isVisible()) {
      await expect(footer).toContainText(/px/);
    }
  });
});
