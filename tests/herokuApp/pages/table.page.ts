import { expect, type Locator, type Page } from '@playwright/test';

export type RowData = {
    fullName: string;
    due: number;
};

export class TablePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;

    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/tables');
    }

    async getTableData(index: number): Promise<RowData[]> {
        await this.page.goto('https://the-internet.herokuapp.com/tables');
        return await this.page.locator(`//table[@id='table${index}']/tbody/tr`).evaluateAll((rows) => {
            return rows.map((row) => {
                const cells = row.querySelectorAll('td');
                return {
                    fullName: `${cells[0].textContent} ${cells[1].textContent}`,
                    due: parseFloat(cells[3].textContent.replace('$', '')),
                };
            })
        });
    }

    async getMaxduePerson(tableData: RowData[]): Promise<string[]> {
        const maxDuePerson = tableData
            .reduce((max, person) => (person.due > max.due ? person : max), tableData[0]);
        const maxDue = maxDuePerson.due;
        const maxDuePersonList = tableData
            .filter((person) => person.due === maxDue).map((person) => person.fullName);

        return maxDuePersonList;
    }

}