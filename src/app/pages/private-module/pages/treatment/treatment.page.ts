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

  // Reactiv Form
  treatmentForm = this.fb.group({
    plotId: [null as number | null, Validators.required],
    startDate: [new Date().toISOString(), Validators.required],
    treatedAreaHa: [null as number | null, [Validators.required, Validators.min(0.01)]],
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
    async (res) => {
      this.treatments.update(t => [...t, res]);
          this.formMode.set('hidden');
          
          const toast = await this.core.toastCtrl.create({
            message: 'Tratamiento registrado en el CUE',
            duration: 2500,
            color: 'success'
          });
          await toast.present();
          this.treatmentForm.reset({ 
            startDate: new Date().toISOString(), 
            doseUnit: 'l/ha', 
            efficacy: 'Buena',
            phytosanitaryProblem: 'Repilo'
          });
    },
    (err) => {
      console.error('Error al guardar:', err);      
    })
  }
}