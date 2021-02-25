import {AdvogadoModel} from '../model/advogado.model';
import * as fs from 'fs';
import {Parser} from 'json2csv';
import {environment} from '../environments';

export class SalvaCsvController {
    salvaCSV(filename: string, advogados: AdvogadoModel[]) {
        const fullPath = `${environment.paths.filesDir}/${filename}`;

        if (!fs.existsSync(environment.paths.filesDir)){
            fs.mkdirSync(environment.paths.filesDir);
        }

        const fieldsCSV: string[] = ['nome', 'numero', 'data', 'subsecao', 'situacao', 'foto SUS'];

        const parser = new Parser(fieldsCSV);
        const csv = parser.parse(advogados);

        fs.writeFile(fullPath, csv, function (err) {
            if (err) return console.log(err);
        });
    }
}
