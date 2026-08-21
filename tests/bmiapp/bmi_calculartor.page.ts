import { type Locator, type Page } from "@playwright/test";

export class BmiCalculatorPage {
    readonly page: Page;
    readonly clearButton: Locator;
    readonly ageInput: Locator;
    readonly maleRadio: Locator;
    readonly femaleRadio: Locator;
    readonly heightInput: Locator;
    readonly weightInput: Locator;
    readonly calculateButton: Locator;
    readonly bmiResult: Locator;

    constructor(page: Page) {
        this.page = page;

        this.clearButton = page.getByRole('button', { name: 'Clear' });
        this.ageInput = page.locator('#cage');
        this.maleRadio = page.getByRole('radio', { name: 'Male', exact: true });
        this.femaleRadio = page.locator('label').filter({ hasText: 'Female' });
        this.heightInput = page.locator('#cheightmeter');
        this.weightInput = page.locator('#ckg');
        this.calculateButton = page.getByRole('button', { name: 'Calculate' });
        this.bmiResult = page.locator('.bigtext').first();
    }

    async goto() {
        await this.page.goto('https://www.calculator.net/bmi-calculator.html');
    }

    async clear() {
        await this.clearButton.click();
    }

    async enterAge(age: string) {
        await this.ageInput.fill(age);
    }

    async selectGender(gender: string) {
        if (gender === 'male') {
            await this.maleRadio.check();
        } else if (gender === 'female') {
            await this.femaleRadio.click();
        }
    }

    async enterHeight(height: string) {
        await this.heightInput.fill(height);
    }

    async enterWeight(weight: string) {
        await this.weightInput.fill(weight);
    }

    async calculate() {
        await this.calculateButton.click();
    }

    async getBmiResult() {
        const rawActual = await this.bmiResult.textContent();

        return rawActual
            ? rawActual.replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim()
            : '';
    }
}