import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CoreProvider } from 'src/app/services/core';
import { PlotCreateDto, PlotDto, UserCueProfileUpdateDto, UserMeDto } from 'src/app/services/api/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  private fb = inject(FormBuilder);
  public core = inject(CoreProvider);

  public isLoading = signal<boolean>(true);
  public isSaving = signal<boolean>(false);
  public userInfo = signal<UserMeDto | null>(null);

  public profileForm = this.fb.group({
    reafaNumber: [''],
    holderName: [''],
    holderNif: [''],
    applicatorName: [''],
    applicatorNif: [''],
    ropoNumber: [''],
    equipmentRoma: [''],
    lastIteafDate: ['']
  });

  public activeSegment = signal<'cue' | 'plots'>('cue');

  // Plots manage
  public plots = signal<PlotDto[]>([]);
  public plotFormMode = signal<'hidden' | 'insert' | 'edit'>('hidden');
  public editingPlotId = signal<number | null>(null);
  public isSavingPlot = signal<boolean>(false);

  public plotForm = this.fb.group({
    provinceCode: ['14', [Validators.required]],
    municipalityCode: ['', [Validators.required]],
    polygon: [null as number | null, [Validators.required]],
    parcel: [null as number | null, [Validators.required]],
    enclosure: [1, [Validators.required]],
    sigpacAreaHa: [null as number | null, [Validators.required, Validators.min(0.01)]],
    cultivatedAreaHa: [null as number | null, [Validators.required, Validators.min(0.01)]],
    sigpacUse: ['OV', [Validators.required]],
    species: ['Olivo', [Validators.required]],
    variety: ['Picual'],
    isIrrigated: [false]
  });

  ngOnInit() {
    this.loadUserProfile();
    this.loadPlots();
  }

  loadUserProfile() {
    this.isLoading.set(true);
    this.core.auth.getMe(
      (user: UserMeDto) => {
        this.userInfo.set(user);
        this.profileForm.patchValue({
          applicatorName: user.applicatorName || '',
          applicatorNif: user.applicatorNif || '',
          ropoNumber: user.ropoNumber || '',
          equipmentRoma: user.equipmentRoma || '',
          lastIteafDate: user.lastIteafDate ? user.lastIteafDate.split('T')[0] : ''
        });
        this.isLoading.set(false);
      },
      (err: any) => {
        console.error('Error loading profile:', err);
        this.isLoading.set(false);
      }
    );
  }

  saveProfile() {
    this.isSaving.set(true);
    const raw = this.profileForm.getRawValue();

    const dto: UserCueProfileUpdateDto = {
      applicatorName: raw.applicatorName || null,
      applicatorNif: raw.applicatorNif || null,
      ropoNumber: raw.ropoNumber || null,
      equipmentRoma: raw.equipmentRoma || null,
      lastIteafDate: raw.lastIteafDate ? new Date(raw.lastIteafDate).toISOString() : null
    };

    this.core.auth.updateCueProfile(
      dto,
      async (updatedUser) => {
        this.userInfo.set(updatedUser);
        this.isSaving.set(false);
        const toast = await this.core.toastCtrl.create({
          message: 'Datos de explotación guardados',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
      },
      async (err) => {
        console.error('Error saving profile:', err);
        this.isSaving.set(false);
        const toast = await this.core.toastCtrl.create({
          message: 'Error al guardar los datos',
          duration: 2500,
          color: 'danger'
        });
        await toast.present();
      }
    );
  }

  onSegmentChange(event: any) {
    this.activeSegment.set(event.detail.value);
  }

  loadPlots() {
    this.core.cue.getPlots(
      (res: PlotDto[]) => this.plots.set(res),
      (err: any) => console.error('Error cargando parcelas:', err)
    );
  }

  openInsertPlot() {
    this.editingPlotId.set(null);
    this.plotForm.reset({
      provinceCode: '14',
      municipalityCode: '',
      polygon: null,
      parcel: null,
      enclosure: 1,
      sigpacAreaHa: null,
      cultivatedAreaHa: null,
      sigpacUse: 'OV',
      species: 'Olivo',
      variety: 'Picual',
      isIrrigated: false
    });
    this.plotFormMode.set('insert');
  }

  setEditPlot(plot: PlotDto) {
    this.editingPlotId.set(plot.id ?? null);
    this.plotForm.patchValue({
      provinceCode: plot.provinceCode.toString() ?? '14',
      municipalityCode: plot.municipalityCode.toString() ?? '',
      polygon: plot.polygon ?? null,
      parcel: plot.parcel ?? null,
      enclosure: plot.enclosure ?? 1,
      sigpacAreaHa: plot.sigpacAreaHa ?? null,
      cultivatedAreaHa: plot.cultivatedAreaHa ?? null,
      sigpacUse: plot.sigpacUse ?? 'OV',
      species: plot.species ?? 'Olivo',
      variety: plot.variety ?? '',
      isIrrigated: plot.isIrrigated ?? false
    });
    this.plotFormMode.set('edit');
  }

  managePlotForm() {
    if (this.plotForm.invalid) return;
    this.isSavingPlot.set(true);

    const raw = this.plotForm.getRawValue();
    const dto: PlotCreateDto = {
      provinceCode: Number(raw.provinceCode!),
      municipalityCode: Number(raw.municipalityCode!),
      polygon: Number(raw.polygon),
      parcel: Number(raw.parcel),
      enclosure: Number(raw.enclosure),
      sigpacAreaHa: Number(raw.sigpacAreaHa),
      cultivatedAreaHa: Number(raw.cultivatedAreaHa),
      sigpacUse: raw.sigpacUse!,
      species: raw.species!,
      variety: raw.variety || '',
      isIrrigated: Boolean(raw.isIrrigated)
    };

    const onSuccess = async (msg: string) => {
      this.isSavingPlot.set(false);
      this.plotFormMode.set('hidden');
      this.loadPlots();
      this.core.cue.loadDashboardStats(); // Refresh dashboard stats

      const toast = await this.core.toastCtrl.create({
        message: msg,
        duration: 2000,
        color: 'success'
      });
      await toast.present();
    };

    const onError = async (err: any) => {
      this.isSavingPlot.set(false);
      const toast = await this.core.toastCtrl.create({
        message: err?.error || 'Error al guardar la parcela',
        duration: 2500,
        color: 'danger'
      });
      await toast.present();
    };

    if (this.plotFormMode() === 'insert') {
      this.core.cue.createPlot(dto, () => onSuccess('Parcela añadida'), onError);
    } else if (this.editingPlotId()) {
      this.core.cue.updatePlot(this.editingPlotId()!, dto, () => onSuccess('Parcela actualizada'), onError);
    }
  }

  async deletePlot(id: number) {
    const alert = await this.core.alertCtrl.create({
      header: 'Eliminar parcela',
      message: '¿Seguro que quieres eliminar este recinto SIGPAC?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.core.cue.deletePlot(
              id,
              async () => {
                this.loadPlots();
                const toast = await this.core.toastCtrl.create({
                  message: 'Parcela eliminada',
                  duration: 2000,
                  color: 'success'
                });
                await toast.present();
              },
              async (err) => {
                // Plot hasn't got any asociated treatment
                const msg = typeof err?.error === 'string'
                  ? err.error
                  : 'No se pudo eliminar la parcela';
                const toast = await this.core.toastCtrl.create({
                  message: msg,
                  duration: 3500,
                  color: 'danger'
                });
                await toast.present();
              }
            );
          }
        }
      ]
    });
    await alert.present();
  }
}