import {Pipe, PipeTransform} from "@angular/core";
import {Chamado} from "../../api/model/chamado";
import {DatePipe} from "@angular/common";

@Pipe({
    name: 'codigoChamado'
})
export class CodigoChamadoPipe implements PipeTransform {
    private datePipe = new DatePipe('pt-br');

    transform(chamado: Chamado): any {
        return Number(chamado.id).toString(36).toUpperCase() + '/' +
            this.datePipe.transform(chamado.dataSolicitacao, 'MMyy');
    }

}