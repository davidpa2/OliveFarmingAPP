import { Component, signal, OnInit, computed } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoreProvider } from 'src/app/services/core';
import { PlotDto, TreatmentDto, TreatmentCreateDto } from 'src/app/services/api/models';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.page.html',
  styleUrls: ['./treatment.page.scss'],
  standalone: false
})
export class TreatmentPage implements OnInit {

  isLoading = signal<boolean>(true);
  formMode = signal<'hidden' | 'insert' | 'edit'>('hidden');
  plots = signal<PlotDto[]>([]);
  treatments = signal<TreatmentDto[]>([]);

  editingId = signal<number | null>(null); // Editing id

  // Reactive Form
  treatmentForm = this.fb.group({
    plotIds: [[] as number[], Validators.required], // Number array
    startDate: [new Date().toISOString(), Validators.required],
    phytosanitaryProblem: ['Repilo', Validators.required],
    productName: ['', Validators.required],
    registrationNumber: ['', Validators.required],
    dose: [null as number | null, Validators.required],
    doseUnit: ['l/ha', Validators.required],
    efficacy: ['Buena', Validators.required]
  });

  constructor(public core: CoreProvider, public fb: FormBuilder) {}
  
  // Group data by month and year
  groupedTreatments = computed(() => {
    const list = this.treatments();
    if (!list || list.length === 0) return [];

    const groups = new Map<string, { label: string, year: number, month: number, items: TreatmentDto[] }>();

    // Date formatter
    const formatter = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' });

    list.forEach(t => {
      const date = new Date(t.startDate);
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // 1-12
      const key = `${year}-${month.toString().padStart(2, '0')}`; // ex: "2026-10"

      if (!groups.has(key)) {
        // Capitalize the first letter of the month ("Octubre 2026")
        let label = formatter.format(date);
        label = label.charAt(0).toUpperCase() + label.slice(1);

        groups.set(key, { label, year, month, items: [] });
      }
      groups.get(key)!.items.push(t);
    });

    // Convert to array and order by month desc
    return Array.from(groups.values()).sort((a, b) => {
      if (a.year !== b.year) return b.year - a.year;
      return b.month - a.month;
    });
  });

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.core.cue.getPlots(
      (data) => {
        this.plots.set(data);

        this.core.cue.getTreatments(
          (treatmentsData) => {
            this.treatments.set(treatmentsData);
            this.isLoading.set(false);
          },
          (err) => {
            console.error("Error al cargar tratamientos: ", err);
            this.isLoading.set(false);
          }
        );
      },
      (err) => {
        console.log("Error: " + err);        
      }
    )
  }

  manageTreatmentForm() {
    if (this.treatmentForm.invalid) return;

    this.isLoading.set(true);
    const formValue = this.treatmentForm.getRawValue();

    if (this.formMode() === 'insert') {
      const dto = formValue as TreatmentCreateDto;
      this.core.cue.createTreatment({ body: dto },
        async (res: TreatmentDto[]) => {
          this.treatments.update(t => [...t, ...res]);
          await this.finishForm('Tratamientos registrados en el CUE');
        },
        (err: any) => { console.error('Error al guardar:', err); this.isLoading.set(false); });

    } else if (this.formMode() === 'edit') {
      const dtoUpdate = {
        plotId: formValue.plotIds![0], // The only ID on the array
        startDate: formValue.startDate!,
        phytosanitaryProblem: formValue.phytosanitaryProblem!,
        productName: formValue.productName!,
        registrationNumber: formValue.registrationNumber!,
        dose: formValue.dose!,
        doseUnit: formValue.doseUnit!,
        efficacy: formValue.efficacy!
      };

      this.core.cue.updateTreatment({ id: this.editingId()!, body: dtoUpdate },
        async (updatedTreatment) => {
          // Changing the old element by the updated in the Signal
          this.treatments.update(t => t.map(item => item.id === updatedTreatment.id ? updatedTreatment : item));
          await this.finishForm('Registro actualizado correctamente');
        },
        (err: any) => { console.error('Error al actualizar:', err); this.isLoading.set(false); });
    }
  }

  /**
   * Method to fill edit form
   * @param treatment 
   */
  setEditForm(treatment: TreatmentDto) {
    this.editingId.set(treatment.id);
    this.formMode.set('edit');
    
    this.treatmentForm.patchValue({
      plotIds: [treatment.plotId],
      startDate: treatment.startDate,
      phytosanitaryProblem: treatment.phytosanitaryProblem,
      productName: treatment.productName,
      registrationNumber: treatment.registrationNumber,
      dose: treatment.dose,
      doseUnit: treatment.doseUnit,
      efficacy: treatment.efficacy
    });
    
    // Disabling plot selector
    this.treatmentForm.get('plotIds')?.disable();

    document.querySelector('ion-content')?.scrollToTop(500);
  }

  async finishForm(msg: string) {
    this.formMode.set('hidden');
    this.editingId.set(null);
    this.isLoading.set(false);
        
    const toast = await this.core.toastCtrl.create({
      message: msg,
      duration: 2500,
      color: 'success'
    });
    await toast.present();
    
    this.treatmentForm.reset({ 
      plotIds: [], 
      startDate: new Date().toISOString(), 
      doseUnit: 'l/ha', 
      efficacy: 'Buena',
      phytosanitaryProblem: 'Repilo'
    });
  }

  async deleteTreatment(id: number) {
    const alert = await this.core.alertCtrl.create({
      header: 'Confirmar borrado',
      message: '¿Estás seguro de que deseas eliminar este registro del CUE?',
      buttons: [
        { 
          text: 'Cancelar', 
          role: 'cancel' 
        },
        { 
          text: 'Eliminar', 
          role: 'destructive',
          handler: () => {
            this.isLoading.set(true);
            
            this.core.cue.deleteTreatment(id, 
              async () => {
                // Filter local array
                this.treatments.update(t => t.filter(item => item.id !== id));
                this.isLoading.set(false);
                
                const toast = await this.core.toastCtrl.create({
                  message: 'Registro eliminado del Cuaderno',
                  duration: 2000,
                  color: 'success'
                });
                await toast.present();
              },
              (err: any) => {
                console.error('Error al borrar:', err);
                this.isLoading.set(false);
              }
            );
          }
        }
      ]
    });
    
    await alert.present();
  }

  getPlotInfo(plotId: number): string {
    const plot = this.plots().find(p => p.id === plotId);
    return plot ? `Pol ${plot.polygon} - Parc ${plot.parcel}` : '';
  }

  exportMonth(year: number, month: number) {
    this.core.toastCtrl.create({
      message: `Generando cuaderno de ${month}/${year}...`,
      duration: 1500
    }).then(t => t.present());

    this.core.http.get(`${this.core.apiConfig.rootUrl}/api/cue/export/${year}/${month}`, {
      responseType: 'blob'
    }).subscribe({
      next: (blob) => {
        // Create local URL for the binary file
        const url = window.URL.createObjectURL(blob);
        
        // Create an <a> element to force the download
        const a = document.createElement('a');
        a.href = url;
        a.download = `Cuaderno_Campo_${year}_${month.toString().padStart(2, '0')}.xlsx`;
        
        // Add it to DOM and click it
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al exportar:', err);
        this.core.errorToast(null, 'Error al generar el documento Excel');
      }
    });
  }
}