import {Winston} from './common/winston';
import {environment} from './environments';
import {CrawlerController} from './controller/crawler.controller';
import {AdvogadoModel} from './model/advogado.model';
import {SalvaJsonController} from './controller/salva-json.controller';

const winston = new Winston(environment.paths.logDir);
const crawler = new CrawlerController(environment.crawler.oabInicial);
const salvaJSON = new SalvaJsonController();

winston.saveExecution('Início da Execução');

crawler.capturaAdvogados().then((advogados: AdvogadoModel[]) => {
    salvaJSON.salvaJson('advogados.json', advogados);
    winston.saveExecution('Fim da Execução');
}).catch(e => {
    winston.saveExecution(`Erro de execução: ${e.message}`);
})
