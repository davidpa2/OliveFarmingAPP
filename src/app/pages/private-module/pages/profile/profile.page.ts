import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CoreProvider } from 'src/app/services/core';
import { UserCueProfileUpdateDto, UserMeDto } from 'src/app/services/api/models';

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
    applicatorName: [''],
    applicatorNif: [''],
    ropoNumber: [''],
    equipmentRoma: [''],
    lastIteafDate: [''] // Formato YYYY-MM-DD para <input type="date"> o ion-input
  });

  ngOnInit() {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.isLoading.set(true);
    this.core.auth.getMe( // Usa el método que ya tengas para llamar a /api/users/me
      (user: UserMeDto) => {
        this.userInfo.set(user);
        this.profileForm.patchValue({
          applicatorName: user.applicatorName || '',
          applicatorNif: user.applicatorNif || '',
          ropoNumber: user.ropoNumber || '',
          equipmentRoma: user.equipmentRoma || '',
          // Cortamos la parte de la hora (T00:00:00) para que el input date lo lea bien
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
}