import { test, expect } from '../../Fixtures/AutomationExercise.fixtures'

test('Verify user can navigate to the test cases page successfully', async ({ page, homePage }) => {
    await homePage.goto()
    await homePage.gotoTestCase()
    await expect(page.getByRole('heading', { name: 'Test Cases', exact: true })).toBeVisible()
})