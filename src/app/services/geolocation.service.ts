import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  constructor(private platform: Platform) { }

  async getCurrentPosition() {
    if (this.platform.is('hybrid')) {
      // Estamos en un dispositivo móvil (iOS o Android)
      const permission = await Geolocation.requestPermissions();
      if (permission.location !== 'granted') {
        throw new Error('Permiso de geolocalización no concedido');
      }
      const coordinates = await Geolocation.getCurrentPosition();
      return {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
      };
    } else {
      // Estamos en el navegador
      return new Promise<{ latitude: number; longitude: number }>(
        (resolve, reject) => {
          if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                resolve({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                });
              },
              (error) => {
                reject(error);
              }
            );
          } else {
            reject(new Error('La geolocalización no está disponible en este navegador.'));
          }
        }
      );
    }
  }
  //   // Solicitar permiso si es necesario
  //   const hasPermission = await this.checkPermissions();
  //   if (!hasPermission) {
  //     const permissionGranted = await this.requestPermissions();
  //     if (!permissionGranted) {
  //       throw new Error('Permiso de geolocalización no concedido');
  //     }
  //   }

  //   // Obtener la posición actual
  //   const coordinates = await Geolocation.getCurrentPosition();
  //   return {
  //     latitude: coordinates.coords.latitude,
  //     longitude: coordinates.coords.longitude
  //   };
  // }

  // private async checkPermissions(): Promise<boolean> {
  //   const permResult = await Geolocation.checkPermissions();
  //   return permResult.location === 'granted';
  // }

  // private async requestPermissions(): Promise<boolean> {
  //   const permResult = await Geolocation.requestPermissions();
  //   return permResult.location === 'granted';
  // }
}
