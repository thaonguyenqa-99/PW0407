import { test, expect } from './Fixtures/heroku.fixtures';

test('verify able to slide horizontally', async ({ horizontalSliderPage }) => {


    await horizontalSliderPage.goto();

    const range = 3.5;

    await horizontalSliderPage.setSlider(range);

    expect(await horizontalSliderPage.getSliderValue()).toBe(range);

});