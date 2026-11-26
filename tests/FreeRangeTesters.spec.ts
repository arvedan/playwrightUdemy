//Usando el mismo test para validar cada sección y sus títulos: Recurso

//Muy lindo el test para el título...pero yo quiero validar TODAS las secciones del Header de la web. Podría copiar y pegar el test con las distintas secciones pero debe haber una mejor manera, no? 



import { test, Browser, Page, expect } from '@playwright/test';
 
(async () => {
  let browser: Browser;
  let page: Page;
 
  test.describe('Navegación en www.freerangetesters.com', () => {
 
    const secciones = [
      { nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos' },
      { nombre: 'Udemy', url: '/udemy', tituloEsperado: 'Udemy' },
      { nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos' },
      { nombre: 'Blog', url: '/login', tituloEsperado: 'Acceder a Free Range Testers' }
      // Agrega más secciones si es necesario
    ];
    for (const seccion of secciones) {
      test(`Validar redirección a la sección "${seccion.nombre}"`, async ({ page }) => {
        await test.step(`Estando yo en la web principal www.freerangetesters.com`, async () => {
          page.goto('https://freerangetesters.podia.com/');
          await expect(page).toHaveTitle('Free Range Testers');
        });
 
        await test.step(`Cuando hago click en "${seccion.nombre}"`, async () => {
          page.locator('#page_header').getByRole('link', { name: seccion.nombre, exact: true }).click();
          await page.waitForURL(`**${seccion.url}`);
        });
 
        await test.step(`Soy redirigido a la sección de título "${seccion.tituloEsperado}"`, async () => {
          await expect(page).toHaveTitle(seccion.tituloEsperado);
 
          page.getByText('banana').click();
 
          page
            .getByRole('listitem')
            .filter({ hasText: 'banana' }).click();
 
          page.getByRole('listitem').last();
 
        });
      });
    }
 
  })

 
})();