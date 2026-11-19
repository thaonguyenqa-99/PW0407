import { test as base } from '@playwright/test';

import { LoginPage } from '../Pages/login.page';
import { InventoryPage } from '../Pages/inventory.page';
import { CartPage } from '../Pages/cart.page';
import { CheckoutPage } from '../Pages/checkout.page'


type SwagLabsPage = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
}

export const test = base.extend<SwagLabsPage>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page))
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page))
    },
})

export { expect } from '@playwright/test';
