const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
	beforeEach(async ({ page, request }) => {
		await request.post('/api/testing/reset')
        const newUser = {
		    name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen',
		}
        await request.post('/api/users', { data: newUser })
        await page.goto('/')
	})
	
	test('blogs are shown', async ({page}) => {
        const locator = page.getByText('blogs')
		await expect(locator).toBeVisible()
	})

	test('Login form is shown', async ({ page }) => {
        const loginButtonLocator = page.getByRole('button', { name: 'login' })
		await expect(loginButtonLocator).toBeVisible()
	})

	describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByRole('textbox', { name: 'username' }).fill('mluukkai')
            await page.getByRole('textbox', { name: 'password' }).fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()
 
			await expect(page.getByText('Logged in as Matti Luukkainen')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByRole('textbox', { name: 'username' }).fill('mluukkai')
            await page.getByRole('textbox', { name: 'password' }).fill('wrong')
            await page.getByRole('button', { name: 'login' }).click()

			const errorDiv = page.locator('.error')
            await expect(errorDiv).toContainText('wrong username or password')
 
			await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
        })
    })

	describe('Blogs manipulations with the logged-in user', () => {
		beforeEach(async ({ page }) => {
            // log in
			await page.getByRole('textbox', { name: 'username' }).fill('mluukkai')
            await page.getByRole('textbox', { name: 'password' }).fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()

            await page.getByRole('button', { name: 'create new blog' }).click()
            await expect(page.getByRole('heading', { name: 'create new' })).toBeVisible()
			
			// create a new blog
            await page.getByRole('textbox', { name: 'title'}).fill('1')
            await page.getByRole('textbox', { name: 'author'}).fill('Mike Scott')
            await page.getByRole('textbox', { name: 'url'}).fill('https://office.com')
			
            await page.getByRole('button', { name: 'create' }).click()
		})

		test('a new blog created', async ({ page }) => {
			const infoDiv = page.locator('.info')
            await expect(infoDiv).toContainText('a new blog 1 added')
		})

		test('a blog can be liked', async ({ page }) => {
            await page.getByRole('button', { name: 'view' }).click()
            await page.getByRole('button', { name: 'like' }).click()
			await expect(page.getByText('likes 1')).toBeVisible()
		})
	})
})
