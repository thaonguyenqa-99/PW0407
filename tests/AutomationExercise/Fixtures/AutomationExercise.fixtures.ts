import { test as base } from '@playwright/test'
import { LoginPage } from '../Pages/login.page'
import { HomePage } from '../Pages/home.page'
import { LogoutPage } from '../Pages/logout.page'
import { RegisterPage } from '../Pages/register.page'
import { ProductsPage } from '../Pages/products.page'
import { ProductDetailPage } from '../Pages/productDetail.page'
import { CartPage } from '../Pages/cart.page'

type AutoExercisePage = {
    loginPage: LoginPage,
    homePage: HomePage,
    logoutPage: LogoutPage,
    registerPage: RegisterPage,
    productsPage: ProductsPage,
    productDetailPage: ProductDetailPage,
    cartPage: CartPage,

};

export const test = base.extend<AutoExercisePage>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page))
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page))
    },
    logoutPage: async ({ page }, use) => {
        await use(new LogoutPage(page))
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page))
    },
    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page))
    },
    productDetailPage: async ({ page }, use) => {
        await use(new ProductDetailPage(page))
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page))
    }
})

export { expect } from '@playwright/test'

