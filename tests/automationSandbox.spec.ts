import { test, expect } from '@playwright/test';

let textToFill: string = 'Estoy aprendiendo playwright, ¡¡madafacars!!';


//Navegar una página y hacer click en botón
test.describe('Acciones en el automation sandbox', () => {
    test('Click en el botón ID Dinámico', async ({ page }) => {
        await test.step('Dado que navego al Sandbox de automation de Free Range Testers', async () => {
            await page.goto('');
        })

        await test.step('Puedo hacer click en el botón con ID dinámico', async () => {
            await page.getByRole('button', { name: 'Hacé click para generar un ID' }).click();
            await expect(page.getByText('OMG, aparezco después de 3')).toBeVisible();
        })

        //otra forma de hacerlo asignando el locator del botón a una constante "botonIDDinamico"
        await test.step('Puedo hacer click en el botón con ID dinámico', async () => {
            const botonIDDinamico = page.getByRole('button', { name: 'Hacé click para generar un ID dinámico y mostrar el elemento oculto' });
            await botonIDDinamico.click({ force: true });
            await expect(page.getByText('OMG, aparezco después de 3 segundos de haber hecho click en el botón 👻.')).toBeVisible();
        })

    })

    //Navegar la página y llenar un campo de texto
    test('Lleno un campo de texto en automation Sandbox', async ({ page }) => {
        await test.step('Dado que navego al Sandbox de automation de Free Range Testers', async () => {
            await page.goto('');
        })

        await test.step('', async () => {
            await page.getByRole('textbox', { name: 'Un aburrido texto' }).fill(textToFill);
            await expect(page.getByRole('textbox', { name: 'Un aburrido texto' }), 'El campo de texto no admite edición').toHaveValue(textToFill);
        })

        //elemento textbox ubicado por Placeholder
        await test.step('Puedo ingresar texto en el campo Un Aburrido Texto', async () => {
            await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edición').toBeEditable();
            await page.getByPlaceholder('Ingresá texto').fill(textToFill);
            await expect(page.getByPlaceholder('Ingresá texto'), 'El campo de texto no admite edición').toHaveValue(textToFill);
        })

    })

    //Navegar la página y marcar/desmarcar las casillas del checkbox
    test('Puedo seleccionar y des-seleccionar un elemento del sandbox', async ({ page }) => {
        await test.step('Dado que navego al Sandbox de automation de Free Range Testers', async () => {
            await page.goto('');
        })

        await test.step('Puedo hacer check para seleccionar una hamburguesa', async () => {
            await page.getByRole('checkbox', { name: 'Hamburguesa 🍔' }).check();
            await expect(page.getByRole('checkbox', { name: 'Hamburguesa 🍔' }), 'El checkbox queda seleccionado').toBeChecked();
        })

        await test.step('Puedo des-seleccionar la hamburguesa', async () => {
            await page.getByRole('checkbox', { name: 'Hamburguesa 🍔' }).uncheck();
            await expect(page.getByRole('checkbox', { name: 'Hamburguesa 🍔' }), 'El checkbox queda des-seleccionado').not.toBeChecked();
        })

    })

    //Navegar la página y seleccionar una opción del radio button
    test('Selecciono una opción del radio button', async ({ page }) => {
        await test.step('Dado que navego al Sandbox de automation de Free Range Testers', async () => {
            await page.goto('');
        })

        //Locator por Label del radio button
        await test.step('Selecciono el radio button SI', async () => {
            await page.getByLabel('Si').check();
            await expect(page.getByLabel('Si'), 'El radio button no se seleccionó').toBeChecked();
        })

        //Locator por Role del radio button
        await test.step('Selecciono el radio button NO', async () => {
            await page.getByRole('radio', { name: 'No' }).check();
            await expect(page.getByLabel('No'), 'El radio button no se seleccionó').toBeChecked();
        })

    })

    //Navegar la página y seleccionar una opción del dropdown
    test('Selecciono una opción del dropdown', async ({ page }) => {
        await test.step('Dado que navego al Sandbox de automation de Free Range Testers', async () => {
            await page.goto('');
        })

        await test.step('Selecciono la opción Tennis', async () => {
            await page.getByLabel('Dropdown').selectOption('Tennis');
        })

        await test.step('Ahora Selecciono la opción Fútbol', async () => {
            await page.getByLabel('Dropdown').selectOption('Fútbol');
        })

        //Validar la lista con un assertion
        await test.step('Valido que la lista del dropdown contiene los deportes esperados', async () => {
            const deportes = ['Fútbol', 'Tennis', 'Basketball'/*,'Beisbol'*/]

            for (let opcion of deportes) {
                const element = await page.$(`select#formBasicSelect > option:is(:text("${opcion}"))`);
                if (element) {
                    console.log(`La opción '${opcion}' está presente.`);
                } else {
                    throw new Error(`La opción '${opcion}' no está presente.`);
                }
            }


        })


    })

    //Navegar la página y seleccionar una opción escondida en un botón desplegable
    test('Selecciono una opción oculta del botón desplegable', async ({ page }) => {
        await test.step('Dado que navego al Sandbox de automation de Free Range Testers', async () => {
            await page.goto('');
        })

        await test.step('Selecciono un día de la semana (Jueves)', async () => {
            await page.getByRole('button', { name: 'Día de la semana' }).click();
            await page.getByRole('link', { name: 'Jueves' }).click();
        })

        await test.step('Ahora Selecciono otro día (Lunes)', async () => {
            await page.getByRole('button', { name: 'Día de la semana' }).click();
            await page.getByRole('link', { name: 'Lunes' }).click();
        })

    })

    //Navegar la página y subir archivos
    test.skip('Puedo subir archivos a una pagina de Automation', async ({ page }) => {
        await test.step('Dado que navego al Sandbox de automation de Free Range Testers', async () => {
            await page.goto('');
        })

        //ejemplo para subir un sólo archivo
        await test.step('Agrego un archivo para ser subido', async () => {
            await page.getByLabel('Upload File').setInputFiles('aquiVaElNombreDelArchivo.pdf');  //this is an example, is not yet implemented in the automation sandbox           
        })

        //ejemplo para subir varios archivos
        await test.step('Agrego más de un archivo para ser subidos', async () => {
            await page.getByLabel('Upload File').setInputFiles(['archivo1.pdf', 'archivo2.xlsx', 'archivo3.txt']);  //this is an example, is not yet implemented in the automation sandbox           
        })

        //ejemplo para remover todos los archivos subidos
        await test.step('Quito los archivos para ser subidos', async () => {
            await page.getByLabel('Upload File').setInputFiles([]);  //this is an example, is not yet implemented in the automation sandbox           
        })

    })


    //Navegar la página y arrastrar y soltar elementos usando drag & drop
    test.skip('Puedo hacer un drag & drop de elementos en una pagina de Automation', async ({ page }) => {
        await test.step('Dado que navego al Sandbox de automation de Free Range Testers', async () => {
            await page.goto('');
        })

        //ejemplo para arrastar y soltar un elemento
        //'DragFrom' = locator del elemento a arrastrar
        //'DragTo' = locator donde lo voy a soltar el elemento
        await test.step('Agrego un archivo para ser subido', async () => {
            await page.getByTestId('DragFrom').dragTo(page.getByTestId('DragTo'));  //this is an example, is not yet implemented in the automation sandbox           
        })

    })

    //Validar valores en una tabla estática
    test('Valido la columna "Nombres" de la tabla estática del automation @sandbox', async ({ page }) => {
        await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
            await page.goto('');
        })

        test.info().annotations.push({
            type: 'USER STORY',
            description: 'ID-1234',
        })

        await test.step('Puedo validar los elementos para la columna "Nombre" de la tabla estática', async () => {
            const valoresColumnaNombres = await page.$$eval('h2:has-text("Tabla estática") + table tbody tr td:nth-child(2)', elements => elements.map(element => element.textContent));
            const nombresEsperados = ['Messi', 'Ronaldo', 'Mbappe'];

            //Saca una screen y la adjunta aunque el caso pase.
            await test.info().attach('screenshot', {
                body: await page.screenshot(),
                contentType: 'image/png',
            })

            console.log(valoresColumnaNombres);
            console.log(nombresEsperados);
            expect(valoresColumnaNombres).toEqual(nombresEsperados);
        })


    })


    //Validar valores en una tabla dinámica
    test('Valido que todos los valores cambian en la tabla dinámica luego de un reload', async ({ page }) => {
        await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
            await page.goto('');
        })

        await test.step('Valido que los valores de la tabla dinámica cambiaron al hacer un reload de la web', async () => {

            //Creamos un arreglo con todos los valores de la tabla dinámica
            const valoresTablaDinamica = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
            console.log(valoresTablaDinamica);

            //Hacemos una recarga de la página para que cambien los valores de la tabla.
            await page.reload();

            //Creamos un segundo arreglo con los valores luego de la recarga
            const valoresPostReload = await page.$$eval('h2:has-text("Tabla dinámica") + table tbody tr td', elements => elements.map(element => element.textContent));
            console.log(valoresPostReload);

            //Validamos que todos los valores cambiaron para cada celda.
            expect(valoresTablaDinamica).not.toEqual(valoresPostReload);
        })


    })

    //Soft assertions
    test('Ejemplo de Soft Assertions', async ({ page }) => {
        await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
            await page.goto('');
        })
        await test.step('Valido que todos los elementos de los checkboxes son los correctos', async () => {
            await expect.soft(page.getByText('Pizza 🍕'), 'No se encontró el elemento Pizza 🍕').toBeVisible();
            await expect.soft(page.getByText('Hamburguesa 🍔'), 'No se encontró el elemento Hamburguesa 🍔').toBeVisible();
            await expect.soft(page.getByText('Pasta 🍝'), 'No se encontró el elemento Pasta 🍝').toBeVisible();
            await expect.soft(page.getByText('Helado 🍧'), 'No se encontró el elemento Helado 🍧').toBeVisible();
            await expect.soft(page.getByText('Torta 🍰'), 'No se encontró el elemento Torta 🍰').toBeVisible();
        })

    })

    //Validando un popup
    test('Validando dentro de un popup', async ({ page }) => {
        await test.step('Dado que navego al Sandbox de Automation de Free Range Testers', async () => {
            await page.goto('');
        })
        await test.step('Cuando hago click en el botón popup', async () => {
            await page.getByRole('button', { name: 'Mostrar popup' }).click();
        })

        await test.step('Puedo validar un elemento dentro del popup', async () => {
            await expect(page.getByText('¿Viste? ¡Apareció un Pop-up!')).toHaveText('¿Viste? ¡Apareció un Pop-up!');
            await page.getByRole('button', { name: 'Cerrar' }).click();
        })

    })

})




