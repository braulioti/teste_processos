import {Winston} from './common/winston';
import {environment} from './environments';
import {CrawlerController} from './controller/crawler.controller';
import {AdvogadoModel} from './model/advogado.model';
import {SalvaJsonController} from './controller/salva-json.controller';
import {SalvaCsvController} from './controller/salva-csv.controller';

const winston = new Winston(environment.paths.logDir, 'execucao.log');
const crawler = new CrawlerController(environment.crawler.oabInicial);
const salvaJSON = new SalvaJsonController();
const salvaCSV = new SalvaCsvController();

winston.saveExecution('Início da Execução');

crawler.capturaAdvogados().then((advogados: AdvogadoModel[]) => {
    salvaJSON.salvaJson('advogados.json', advogados);
    salvaCSV.salvaCSV('advogados.csv', advogados);

    advogados.forEach(item => {
        item.foto = null;
    });

    salvaJSON.salvaJson('advogados_sem_foto.json', advogados);
    salvaCSV.salvaCSV('advogados_sem_foto.csv', advogados);

    winston.saveExecution('Fim da Execução');
}).catch(e => {
    winston.saveExecution(`Erro de execução: ${e.message}`);
})
