import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import { MaterialModule } from '../material/material.module';

@Component({
  selector: 'app-global-table',
  templateUrl: './global-table.component.html',
  styleUrls: ['./global-table.component.scss'],
  standalone: true,
  imports: [CommonModule, InputFieldComponent, MaterialModule],
})
export class GlobalTableComponent implements OnChanges {
  @Input() titles: string[] = [];
  @Input() body: any[] = [];
  @Input() subtitle = '';
  @Input() minWidth = '100%'
  @Input() showSearch = true;
  public titlesLowerCase: string[] = [];

  ngOnChanges(): void {
    this.titlesLowerCase = this.stringFormat(this.titles);
  }

  isFunctionObject(functionToCheck: any): boolean {
    return (
      (functionToCheck &&
        {}.toString.call(functionToCheck) === '[object Function]') ||
      (functionToCheck &&
        {}.toString.call(functionToCheck) === '[object Object]')
    );
  }

  isObjectHTML(functionToCheck: any): boolean {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object HTMLElement]';
  }

  stringFormat(cadenas: string[]): string[] {
    function eliminarAcentos(texto: string): string {
      return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    const cadenasProcesadas: string[] = [];
    cadenas.forEach((cadena) => {
      cadena = cadena.toLowerCase();
      cadena = cadena.replace(/ /g, '_');
      cadena = cadena.replace(/-/g, '_');
      cadena = cadena.replaceAll("'", '');
      cadena = cadena.replaceAll('/', '_');
      cadena = eliminarAcentos(cadena);
      cadenasProcesadas.push(cadena);
    });

    return cadenasProcesadas;
  }

  trackByIndex(index: number): number {
    return index;
  }
}
