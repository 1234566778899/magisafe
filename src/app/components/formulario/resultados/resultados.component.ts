import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormularioComponent } from '../formulario.component';
import { preguntasPorDimension as preguntasSituacionActual } from '../utils/preguntas-situacion-actual';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
  BarController,
  Title,
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  DoughnutController,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title
);

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.scss',
  providers: [DatePipe]
})
export class ResultadosComponent implements AfterViewInit {
  public formulario = inject(FormularioComponent);
  constructor(private datePipe: DatePipe) { }
  getFechaHoy(): string {
    const today = new Date();
    return this.datePipe.transform(today, 'dd/MM/yyyy')!;
  }
  respuestasSituacionActual = this.formulario.respuestasSituacionActual();

  nivelesSA = this.formulario.nivelesSituacionActual;

  ngAfterViewInit(): void {
    this.renderDoughnut(
      'chartGeneral',
      this.promedioFinalSituacionActual,
      '#1C2541',
      '#D72638',
      this.nivelesSA
    );
    this.renderDoughnut2(
      'chartGeneral2',
      this.promedioFinalSituacionActual,
      '#1C2541',
      '#D72638',
      this.nivelesSA
    );
    this.renderDoughnut(
      'chartISO',
      this.promedioPorCategoriaSituacionActual['iso27001'],
      '#1C2541',
      '#F78C37',
      this.nivelesSA
    );
    this.renderDoughnut2(
      'chartISO2',
      this.promedioPorCategoriaSituacionActual['iso27001'],
      '#1C2541',
      '#F78C37',
      this.nivelesSA
    );
    this.renderDoughnut(
      'chartNIST',
      this.promedioPorCategoriaSituacionActual['nist'],
      '#1C2541',
      '#0074D9',
      this.nivelesSA
    );
    this.renderDoughnut2(
      'chartNIST2',
      this.promedioPorCategoriaSituacionActual['nist'],
      '#1C2541',
      '#0074D9',
      this.nivelesSA
    );

    const isoData = this.filtrarPromediosPorCategoria('iso27001');
    this.renderBarChart(
      'chartBarISO',
      isoData.map((d) => d.label),
      isoData.map((d) => d.value),
      '#F78C37'
    );
    this.renderBarChart2(
      'chartBarISO2',
      isoData.map((d) => d.label),
      isoData.map((d) => d.value),
      '#F78C37'
    );

    const nistData = this.filtrarPromediosPorCategoria('nist');
    this.renderBarChart(
      'chartBarNIST',
      nistData.map((d) => d.label),
      nistData.map((d) => d.value),
      '#0074D9'
    );
    this.renderBarChart2(
      'chartBarNIST2',
      nistData.map((d) => d.label),
      nistData.map((d) => d.value),
      '#0074D9'
    );
  }

  calcularDetalle(
    respuestas: Record<number, number>,
    preguntas: {
      dimension: string;
      categoria: string;
      preguntas: { id: number; texto: string }[];
    }[],
    niveles: string[]
  ) {
    return preguntas.map((cat) => {
      const detalle = cat.preguntas.map((p) => {
        const valor = respuestas[p.id];
        return {
          categoria: cat.categoria,
          dimension: cat.dimension,
          texto: p.texto,
          respuesta: niveles[valor],
          puntaje: valor + 1,
        };
      });
      const suma = detalle.reduce((acc, item) => acc + item.puntaje, 0);
      const promedio = detalle.length ? +(suma / detalle.length).toFixed(2) : 0;
      return {
        categoria: cat.categoria,
        dimension: cat.dimension,
        detalle,
        promedio,
      };
    });
  }

  renderDoughnut(
    canvasId: string,
    valor: number,
    baseColor: string,
    fillColor: string,
    niveles: string[]
  ) {
    const maxValor = niveles.length;
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;
    const centerTextPlugin = {
      id: 'centerText',
      beforeDraw(chart: any) {
        const { width, height, ctx } = chart;
        ctx.save();
        const fontSize = (height / 5).toFixed(2);
        ctx.font = `${fontSize}px sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#fff';
        const text = `${valor.toFixed(2)}/${maxValor}`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.restore();
      },
    };

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completado', 'Faltante'],
        datasets: [
          {
            data: [valor, maxValor - valor],
            backgroundColor: [fillColor, baseColor],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: '70%',
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false },
        },
      },
      plugins: [centerTextPlugin],
    });
  }
  renderDoughnut2(
    canvasId: string,
    valor: number,
    baseColor: string,
    fillColor: string,
    niveles: string[]
  ) {
    const maxValor = niveles.length;
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;

    const centerTextPlugin = {
      id: 'centerText',
      beforeDraw(chart: any) {
        const { width, height, ctx } = chart;
        ctx.save();
        const fontSize = (height / 5).toFixed(2);
        ctx.font = `${fontSize}px sans-serif`;
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#000';
        const text = `${valor.toFixed(2)}/${maxValor}`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.restore();
      },
    };

    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Completado', 'Faltante'],
        datasets: [
          {
            data: [valor, maxValor - valor],
            backgroundColor: [fillColor, baseColor],
            borderWidth: 0,
          },
        ],
      },
      options: {
        cutout: '70%',
        plugins: {
          tooltip: { enabled: false },
          legend: { display: false },
        },
      },
      plugins: [centerTextPlugin],
    });
  }

  renderBarChart(
    canvasId: string,
    labels: string[],
    data: number[],
    color: string
  ) {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;

    const valorSobreBarraPlugin = {
      id: 'valorSobreBarraPlugin',
      afterDatasetsDraw(chart: any) {
        const { ctx } = chart;
        chart.data.datasets.forEach((dataset: any, i: number) => {
          const meta = chart.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: number) => {
            const valor = dataset.data[index];
            ctx.save();
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(valor.toFixed(2), bar.x, bar.y - 8);
            ctx.restore();
          });
        });
      },
    };

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Promedio',
            data,
            backgroundColor: color,
            borderRadius: 4,
            borderSkipped: false,
            barPercentage: 0.6,
            categoryPercentage: 0.9,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context: any) => ` ${context.parsed.y.toFixed(2)}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              display: false,
            },
            grid: { display: false },
          },
          x: {
            ticks: { color: '#fff' },
            grid: { display: false },
          },
        },
      },
      plugins: [valorSobreBarraPlugin],
    });
  }
  renderBarChart2(
    canvasId: string,
    labels: string[],
    data: number[],
    color: string
  ) {
    const ctx = document.getElementById(canvasId) as HTMLCanvasElement;

    const valorSobreBarraPlugin = {
      id: 'valorSobreBarraPlugin',
      afterDatasetsDraw(chart: any) {
        const { ctx } = chart;
        chart.data.datasets.forEach((dataset: any, i: number) => {
          const meta = chart.getDatasetMeta(i);
          meta.data.forEach((bar: any, index: number) => {
            const valor = dataset.data[index];
            ctx.save();
            ctx.fillStyle = '#000';
            ctx.font = 'bold 14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(valor.toFixed(2), bar.x, bar.y - 8);
            ctx.restore();
          });
        });
      },
    };

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Promedio',
            data,
            backgroundColor: color,
            borderRadius: 4,
            borderSkipped: false,
            barPercentage: 0.6,
            categoryPercentage: 0.9,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (context: any) => ` ${context.parsed.y.toFixed(2)}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 5,
            ticks: {
              display: false,
            },
            grid: { display: false },
          },
          x: {
            ticks: { color: '#000' },
            grid: { display: false },
          },
        },
      },
      plugins: [valorSobreBarraPlugin],
    });
  }

  filtrarPromediosPorCategoria(categoria: string) {
    return this.detalleSituacionActual
      .filter((d) => d.categoria === categoria)
      .map((d) => ({
        label: d.dimension,
        value: d.promedio,
      }));
  }

  detalleSituacionActual = this.calcularDetalle(
    this.respuestasSituacionActual,
    preguntasSituacionActual,
    this.nivelesSA
  );

  promedioPorCategoriaSituacionActual = this.calcularPromedioPorCategoria(
    this.detalleSituacionActual
  );

  categoriasSituacionActual = Object.keys(
    this.promedioPorCategoriaSituacionActual
  );

  promedioFinalSituacionActual = this.calcularPromedioFinal(
    this.promedioPorCategoriaSituacionActual
  );

  promedioISO = this.promedioPorCategoriaSituacionActual['iso27001'] ?? 0;
  promedioNIST = this.promedioPorCategoriaSituacionActual['nist'] ?? 0;

  calcularPromedioPorCategoria(
    detalle: { promedio: number; categoria: string }[]
  ) {
    const agrupado: Record<string, number[]> = {};
    detalle.forEach((item) => {
      if (!agrupado[item.categoria]) {
        agrupado[item.categoria] = [];
      }
      agrupado[item.categoria].push(item.promedio);
    });

    const promediosPorCategoria: Record<string, number> = {};
    Object.entries(agrupado).forEach(([categoria, valores]) => {
      const suma = valores.reduce((acc, val) => acc + val, 0);
      const promedio = suma / valores.length;
      promediosPorCategoria[categoria] = +promedio.toFixed(2);
    });

    return promediosPorCategoria;
  }

  calcularPromedioFinal(promediosPorCategoria: Record<string, number>): number {
    const valores = Object.values(promediosPorCategoria);
    const promedioFinal =
      valores.reduce((acc, val) => acc + val, 0) / valores.length;
    return +promedioFinal.toFixed(2);
  }

  async descargarResultados() {
    const element = document.querySelector('.pdf-export') as HTMLElement;
    const estabaOculto = element.classList.contains('oculto');
    const originalStyle = element.style.cssText;
    element.classList.remove('oculto');
    element.classList.add('modo-escritorio');

    await new Promise((resolve) => setTimeout(resolve, 500));
    window.scrollTo(0, 0);

    html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      backgroundColor: '#030F25',
      scrollY: -window.scrollY,
    }).then((canvas) => {
      element.classList.remove('modo-escritorio');
      element.style.cssText = originalStyle;

      if (estabaOculto) element.classList.add('oculto');
      const imgData = canvas.toDataURL('image/jpeg', 0.7);
      const pdf = new jsPDF('p', 'mm', 'a2');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
      pdf.save('resultados-evaluacion.pdf');
    });
  }
  irAFormularioEvaluacionActivos() {
    this.formulario.siguientePaso();
  }
}
