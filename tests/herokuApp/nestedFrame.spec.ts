import { test, expect } from './Fixtures/heroku.fixtures';

test('verify nested frames content', async ({ nestedFramePage }) => {
    await nestedFramePage.goto();

    await nestedFramePage.getLeftText().then((text) => {
        expect(text).toContain('LEFT');
    });

    await nestedFramePage.getMiddleText().then((text) => {
        expect(text).toContain('MIDDLE');
    });

    await nestedFramePage.getRightText().then((text) => {
        expect(text).toContain('RIGHT');
    });

    await nestedFramePage.getBottomText().then((text) => {
        expect(text).toContain('BOTTOM');
    });

});

