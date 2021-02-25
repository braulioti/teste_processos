import {Winston} from './common/winston';
import {environment} from './environments';
import {CrawlerController} from './controller/crawler.controller';
import {AdvogadoModel} from './model/advogado.model';

const winston = new Winston(environment.diretorios.logDir);
const crawler = new CrawlerController(environment.crawler.oabInicial);

winston.saveExecution('Início da Execução');

crawler.capturaAdvogados().then((advogados: AdvogadoModel[]) => {
    winston.saveExecution('Fim da Execução');
}).catch(e => {
    winston.saveExecution(`Erro de execução: ${e.message}`);
})
