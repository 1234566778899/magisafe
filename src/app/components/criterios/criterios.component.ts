import { Component, inject, OnInit } from '@angular/core';
import { criteriosData } from '../formulario/utils/criterios';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormularioComponent } from '../formulario/formulario.component';
import moment from 'moment';
@Component({
  selector: 'app-criterios',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './criterios.component.html',
  styleUrl: './criterios.component.scss'
})
export class CriteriosComponent implements OnInit {
  criterios: any[] = [];
  public formulario = inject(FormularioComponent);
  ngOnInit() {
    this.criterios = criteriosData;
  }

  constructor(private http: HttpClient) { }
  getColorClass(color: string): string {
    switch (color) {
      case 'Verde':
        return 'verde';
      case 'Amarillo':
        return 'naranja';
      case 'Rojo':
        return 'rojo';
      default:
        return '';
    }
  }
  getBase64FromAsset(path: string): Promise<string> {
    return this.http.get(path, { responseType: 'blob' }).toPromise().then((blob: Blob | undefined) => {
      return new Promise<string>((resolve, reject) => {
        if (!blob) {
          reject("No se obtuvo el blob de la imagen");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => reject("Error al leer imagen.");
        reader.readAsDataURL(blob);
      });
    });
  }

  async exportarSeleccionados() {
    const seleccionados = this.criterios.filter(c => c.seleccionado);
    if (seleccionados.length === 0) {
      alert("No hay criterios seleccionados.");
      return;
    }

    const doc = new jsPDF({ orientation: 'landscape' });
    try {
      const base64Logo1 = await this.getBase64FromAsset('./assets/img1.png');
      const base64Logo2 = await this.getBase64FromAsset('./assets/img2.png');
      const base64Logo3 = await this.getBase64FromAsset('./assets/img3.png');
      const base64Logo4 = await this.getBase64FromAsset('./assets/img4.png');
      doc.addImage(base64Logo1, 'PNG', 12, 50, 60, 60);
      doc.addImage(base64Logo2, 'PNG', 80, 50, 60, 60);
      doc.addImage(base64Logo3, 'PNG', 150, 50, 60, 60);
      doc.addImage(base64Logo4, 'PNG', 223, 50, 60, 60);
    } catch (err) {
      console.error("No se pudo cargar la imagen local:", err);
    }
    const columnas = [
      "N°", "Activo", "Probabilidad", "Impacto Financiero",
      "Impacto Legal", "Impacto Reputacional", "Justificación", "Controles a implementar"
    ];

    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text('ACTIVOS PARA DEFINIR IMPACTO Y PROBALIDAD', pageWidth / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    // Evaluación realizada para:
    // Empresa: Big Panda Cholting
    // RUC: 20174859672
    // Evaluador: Marcos Chenssen Carlos Aviles – Evaluador de Seguridad de Información
    // Fecha: 28/05/2025
    doc.setFont('helvetica', 'bold');
    doc.text('Evaluación realizada para: ', 10, 23);
    doc.setFont('helvetica', 'normal');
    doc.text('Empresa: ' + this.formulario.nombreEmpresa, 10, 28);
    doc.text('RUC: ' + this.formulario.rucEmpresa, 10, 33);
    doc.text('Evaluador: ' + this.formulario.nombre + ' - ' + this.formulario.rol, 10, 38);
    doc.text('Fecha: ' + moment().format('DD/MM/YYYY hh:mm:ss'), 10, 43);
    // --------------------------------------------------
    const filas = seleccionados.map(item => [
      item["N°"],
      item["Activo"],
      item["Probabilidad"],
      item["Impacto Financiero"],
      item["Impacto Legal"],
      item["Impacto Reputacional"],
      item["Justificación"],
      item["Controles a Implementar"]
    ]);

    autoTable(doc, {
      startY: 125,
      head: [columnas],
      body: filas,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        textColor: [20, 20, 20],
        lineColor: [0, 0, 0],
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: [6, 74, 136],
        textColor: [245, 245, 245],
        lineColor: [0, 0, 0],
        lineWidth: 0.1
      },
      didParseCell: function (data) {
        if (data.section === 'body') {
          const colIndex = data.column.index;
          const value = data.cell.raw;

          // Índices según tus columnas:
          const probabilidadIndex = 2;
          const financieroIndex = 3;
          const legalIndex = 4;
          const reputacionalIndex = 5;

          if ([probabilidadIndex, financieroIndex, legalIndex, reputacionalIndex].includes(colIndex)) {
            if (value === 'Alto' || value === 'Rojo') {
              data.cell.styles.fillColor = [255, 0, 0]; // rojo
            } else if (value === 'Medio' || value === 'Amarillo') {
              data.cell.styles.fillColor = [255, 165, 0]; // naranja
            } else if (value === 'Bajo' || value === 'Verde') {
              data.cell.styles.fillColor = [0, 128, 0]; // verde
            }
          }
        }
      }
    });

    doc.save("criterios_seleccionados.pdf");
  }
  goBack() {
    this.formulario.pasoAnterior();
  }
}
