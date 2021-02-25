import {AdvogadoModel} from '../model/advogado.model';
import * as puppeteer from 'puppeteer';

export class CrawlerController {
    private oabInicial: number;

    private url = 'https://www2.oabsp.org.br/asp/consultaInscritos/consulta01.asp';

    constructor(oabInicial: number) {
        this.oabInicial = oabInicial;
    }

    capturaAdvogados(): Promise<AdvogadoModel[]> {
        return new Promise<AdvogadoModel[]>(async (resolve, reject) => {

            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.goto(this.url);

            await page.type('#nr_inscricao', '400001')
            const consultar = await page.$('#bt_Consultar');
            const numeroOAB = await page.$('#nr_inscricao');
            const checkboxAdvogado = await page.$('#cbxadv');
            checkboxAdvogado.click();
            consultar.click();
            await page.waitForSelector('.perfil');

            const content = await page.evaluate(() => {

                return document.body.innerHTML;
            });

            console.log(content);



            browser.close();
            resolve(null);
        });
    }
}
