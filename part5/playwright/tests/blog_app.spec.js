const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
	beforeEach(async ({ page }) => {
		await page.goto('http://localhost:5173')
		
        const locator = page.getByText('blogs')
		await expect(locator).toBeVisible()
	})

	test('Login form is shown', async ({ page }) => {
        const loginButtonLocator = page.getByRole('button', { name: 'login' })
		await expect(loginButtonLocator).toBeVisible()
	})
})
