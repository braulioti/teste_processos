import {AdvogadoModel} from '../model/advogado.model';
import * as puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import {Browser, Page} from 'puppeteer';
import {environment} from '../environments';

// 454586

export class CrawlerController {
    private oabInicial: number;

    private url = 'https://www2.oabsp.org.br/asp/consultaInscritos/consulta01.asp';
    private browser: Browser;
    private page: Page;

    constructor(oabInicial: number) {
        this.oabInicial = oabInicial;
    }

    async timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getAdvogado(numInscricao: number): Promise<any> {
        return new Promise<any>(async resolve => {
            try {
                await this.page.goto(this.url);
                await this.page.type('#nr_inscricao', numInscricao.toString());
                await this.page.click('#cbxadv');
                await this.page.click('#bt_Consultar');

                await this.page.waitForSelector('#dvConsultaInscritos > div > ul > li');
                let content = await this.page.evaluate(() => document.body.innerHTML);

                let $ = cheerio.load(content);

                const advogado = new AdvogadoModel();
                // Não há resultados que satisfaçam sua busca
                if ($('#dvConsultaInscritos > div > ul > li').text().indexOf('resultados que') > 0) {
                    advogado.numero = '-1';
                } else {
                    advogado.nome = $('#dvConsultaInscritos > div:nth-child(2) > ul > li:nth-child(2)').text();
                    advogado.numero = $('#dvConsultaInscritos > div:nth-child(2) > ul > li:nth-child(3)').text().split(": ")[1];
                    advogado.data = $('#dvConsultaInscritos > div:nth-child(2) > ul > li:nth-child(4)').text().split(": ")[1];
                    advogado.subsecao = $('#dvConsultaInscritos > div:nth-child(2) > ul > li:nth-child(5)').text().split(": ")[1];
                    advogado.situacao = $('#dvConsultaInscritos > div:nth-child(2) > ul > li:nth-child(6)').text().split(": ")[1];
                }

                resolve(advogado);
            } catch (e) {
                resolve(null);
            }
        });

    }

    capturaAdvogados(): Promise<AdvogadoModel[]> {
        return new Promise<AdvogadoModel[]>(async (resolve, reject) => {
            let posicao = environment.crawler.oabInicial;

            this.browser = await puppeteer.launch();
            this.page = await this.browser.newPage();

            let finished = false;

            while (!finished) {
                const retorno: AdvogadoModel = await this.getAdvogado(posicao);
                if (retorno)  {
                    if (retorno.numero === '-1') {
                        finished = true;
                    } else {
                        console.log(retorno);
                        posicao = posicao + 1;
                    }
                } else {
                    await setTimeout(() => {}, 2000);
                }
            }

            this.browser.close();
            resolve(null);
        });
    }
}
