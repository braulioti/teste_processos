import {AdvogadoModel} from '../model/advogado.model';
import * as fs from 'fs';
import {environment} from '../environments';

export class SalvaJsonController {
    salvaJson(filename: string, advogados: AdvogadoModel[]) {
        const json = JSON.stringify(advogados);
        const fullPath = `${environment.paths.filesDir}/${filename}`;

        if (!fs.existsSync(environment.paths.filesDir)){
            fs.mkdirSync(environment.paths.filesDir);
        }

        fs.writeFile(fullPath, json, function (err) {
            if (err) return console.log(err);
        });
    }
}
