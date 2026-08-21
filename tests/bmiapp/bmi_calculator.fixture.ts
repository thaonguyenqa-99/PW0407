import { test as base, expect } from "@playwright/test";
import { BmiCalculatorPage } from "./bmi_calculartor.page";

type bmi_calculartorFixture = {
    bmiPage: BmiCalculatorPage;
};

export const test = base.extend<bmi_calculartorFixture>({
    bmiPage: async ({ page }, use) => {
        const bmiPage = new BmiCalculatorPage(page);

        await use(bmiPage);
    },
});

export { expect } from '@playwright/test';