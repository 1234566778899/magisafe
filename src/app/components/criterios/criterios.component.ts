import { Component, OnInit } from '@angular/core';
import { criteriosData } from '../formulario/utils/criterios';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-criterios',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './criterios.component.html',
  styleUrl: './criterios.component.scss'
})
export class CriteriosComponent implements OnInit {
  criterios: any[] = [];

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
      doc.addImage(base64Logo1, 'PNG', 12, 23, 60, 60);
      doc.addImage(base64Logo2, 'PNG', 80, 23, 60, 60);
      doc.addImage(base64Logo3, 'PNG', 150, 23, 60, 60);
      doc.addImage(base64Logo4, 'PNG', 223, 23, 60, 60);
    } catch (err) {
      console.error("No se pudo cargar la imagen local:", err);
    }
    const columnas = [
      "N°", "Activo", "Probabilidad", "Impacto Financiero",
      "Impacto Legal", "Impacto Reputacional", "Justificación", "Controles a implementar"
    ];

    // 2) TÍTULO, FECHA, EVALUADOR
    const pageWidth = doc.internal.pageSize.getWidth();
    const titulo = 'Criterios para definir impacto y probabilidad';
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(titulo, pageWidth / 2, 15, { align: 'center' });
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
      startY: 100,
      head: [columnas],
      body: filas,
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: { fillColor: [6, 74, 136] }
    });

    doc.save("criterios_seleccionados.pdf");
  }
}
