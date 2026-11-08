import { Component, signal, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.core.cue.getPlots(
      (data) => {
        this.plots.set(data);
        this.isLoading.set(false);
      },
      (err) => {
        console.log("Error: " + err);        
      }
    )
  }

  manageTreatmentForm() {
    if (this.treatmentForm.invalid) return;

    this.isLoading.set(true);
    const dto = this.treatmentForm.value as TreatmentCreateDto;

    this.core.cue.createTreatment({ body: dto }, 
    async (res: TreatmentDto[]) => {
      // Adding all the new treatments
      this.treatments.update(t => [...t, ...res]); 
      this.formMode.set('hidden');
          
      const toast = await this.core.toastCtrl.create({
        message: 'Tratamientos registrados en el CUE',
        duration: 2500,
        color: 'success'
      });

      await toast.present();
      
      this.treatmentForm.reset({ 
        plotIds: [], // Reset array
        startDate: new Date().toISOString(), 
        doseUnit: 'l/ha', 
        efficacy: 'Buena',
        phytosanitaryProblem: 'Repilo'
      });
    },
    (err: any) => {
      console.error('Error al guardar:', err);      
    });
  }
}