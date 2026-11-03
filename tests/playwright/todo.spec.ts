
import { test, expect } from '@playwright/test';

test('Todo application should load correctly', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Todo – Automation Lab');

    await expect(
        page.getByRole('heading', { name: 'Todo lista' })
    ).toBeVisible();

    await expect(
        page.getByText('Még nincs feladatod.')
    ).toBeVisible();
});

test('User should be able to add a new todo', async ({ page }) => {
    await page.goto('/');

    // Megkeressük a beviteli mezőt, és beírjuk a feladatot.
    await page.getByPlaceholder('Új feladat...').fill('Teszt feladat');

    // Rákattintunk a Hozzáadás gombra.
    await page.getByRole('button', { name: 'Hozzáadás' }).click();

    // Ellenőrizzük, hogy a feladat megjelent a listában.
    await expect(
        page.getByText('Teszt feladat')
    ).toBeVisible();

    // Az üres lista üzenetének el kell tűnnie.
    await expect(
        page.getByText('Még nincs feladatod.')
    ).toBeHidden();
});


test('User should not be able to add an empty todo', async ({ page }) => {
    await page.goto('/');

    // Kattintás a Hozzáadás gombra üres beviteli mezővel.
    await page.getByRole('button', { name: 'Hozzáadás' }).click();

    // Ellenőrizzük a hibaüzenetet.
    await expect(
        page.getByRole('alert')
    ).toHaveText('A feladat megadása kötelező!');

    // A lista továbbra is üres.
    await expect(
        page.getByText('Még nincs feladatod.')
    ).toBeVisible();
});


test('User should be able to complete and restore a todo', async ({ page }) => {
    await page.goto('/');

    // Felveszünk egy feladatot.
    await page.getByPlaceholder('Új feladat...').fill('Tesztelendő feladat');
    await page.getByRole('button', { name: 'Hozzáadás' }).click();

    // Megkeressük azt a listaelemet, amelyik ezt a feladatot tartalmazza.
    const todoItem = page.getByRole('listitem').filter({
        hasText: 'Tesztelendő feladat'
    });

    // Ellenőrizzük, hogy a Kész gomb látható.
    await expect(
        todoItem.getByRole('button', { name: 'Kész' })
    ).toBeVisible();

    // Készre állítjuk a feladatot.
    await todoItem.getByRole('button', { name: 'Kész' }).click();

    // A gomb felirata Visszaállítás lesz.
    await expect(
        todoItem.getByRole('button', { name: 'Visszaállítás' })
    ).toBeVisible();

    // Visszaállítjuk a feladatot.
    await todoItem.getByRole('button', { name: 'Visszaállítás' }).click();

    // Újra Kész feliratú gombot várunk.
    await expect(
        todoItem.getByRole('button', { name: 'Kész' })
    ).toBeVisible();
});


test('User should be able to delete a todo', async ({ page }) => {
    await page.goto('/');

    // Felveszünk egy feladatot.
    await page.getByPlaceholder('Új feladat...').fill('Törlendő feladat');
    await page.getByRole('button', { name: 'Hozzáadás' }).click();

    // Megkeressük a megfelelő listaelemet.
    const todoItem = page.getByRole('listitem').filter({
        hasText: 'Törlendő feladat'
    });

    // Ellenőrizzük, hogy megjelent.
    await expect(todoItem).toBeVisible();

    // Megnyomjuk a Törlés gombot.
    await todoItem.getByRole('button', { name: 'Törlés' }).click();

    // Ellenőrizzük, hogy eltűnt a listaelemből.
    await expect(todoItem).toHaveCount(0);

    // Az üres lista üzenetének újra meg kell jelennie.
    await expect(
        page.getByText('Törölted az összes feladatod.')
    ).toBeVisible();
});



