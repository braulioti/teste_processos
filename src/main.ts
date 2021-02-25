import {Winston} from './common/winston';
import {environment} from './environments';

const winston = new Winston(environment.logDir);

winston.saveExecution('Início da Execução');
winston.saveExecution('Fim da Execução');