import { test, expect } from "./bmi_calculator.fixture";

[
    { age: "25", gender: "male", height: "180", weight: "40", expected: "BMI = 12.3 kg/m2 (Severe thinness)" },
    { age: "25", gender: "male", height: "180", weight: "55", expected: "BMI = 17 kg/m2 (Moderate thinness)" },
    { age: "25", gender: "male", height: "180", weight: "60", expected: "BMI = 18.5 kg/m2 (Mild thinness)" },
    { age: "25", gender: "male", height: "180", weight: "65", expected: "BMI = 20.1 kg/m2 (Normal)" },
    { age: "25", gender: "male", height: "180", weight: "90", expected: "BMI = 27.8 kg/m2 (Overweight)" },
    { age: "25", gender: "male", height: "180", weight: "100", expected: "BMI = 30.9 kg/m2 (Obese Class I)" },
    { age: "25", gender: "male", height: "180", weight: "120", expected: "BMI = 37 kg/m2 (Obese Class II)" },
    { age: "25", gender: "male", height: "180", weight: "150", expected: "BMI = 46.3 kg/m2 (Obese Class III)" },
    { age: "25", gender: "female", height: "180", weight: "40", expected: "BMI = 12.3 kg/m2 (Severe thinness)" },
    { age: "25", gender: "female", height: "180", weight: "55", expected: "BMI = 17 kg/m2 (Moderate thinness)" },
    { age: "25", gender: "female", height: "180", weight: "60", expected: "BMI = 18.5 kg/m2 (Mild thinness)" },
    { age: "25", gender: "female", height: "180", weight: "65", expected: "BMI = 20.1 kg/m2 (Normal)" },
    { age: "25", gender: "female", height: "180", weight: "90", expected: "BMI = 27.8 kg/m2 (Overweight)" },
    { age: "25", gender: "female", height: "180", weight: "100", expected: "BMI = 30.9 kg/m2 (Obese Class I)" },
    { age: "25", gender: "female", height: "180", weight: "120", expected: "BMI = 37 kg/m2 (Obese Class II)" },
    { age: "25", gender: "female", height: "180", weight: "150", expected: "BMI = 46.3 kg/m2 (Obese Class III)" },
].forEach(({ age, gender, height, weight, expected }) => {

    test(
        `verify ${expected} with age: ${age} gender: ${gender} height: ${height} weight: ${weight}`,
        async ({ bmiPage }) => {

            await bmiPage.goto();

            await bmiPage.clear();

            await bmiPage.enterAge(age);

            await bmiPage.selectGender(gender);

            await bmiPage.enterHeight(height);

            await bmiPage.enterWeight(weight);

            await bmiPage.calculate();

            const actual = await bmiPage.getBmiResult();

            expect(actual).toStrictEqual(expected);
        }
    );
});
