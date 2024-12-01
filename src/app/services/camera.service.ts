import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform } from '@ionic/angular';
import imageCompression from 'browser-image-compression';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  constructor(private platform: Platform) { }

  async takePicture(): Promise<string> {
    const cameraOptions = {
      quality: 50,
      width: 800,
      height: 600,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: this.platform.is('hybrid') ? CameraSource.Camera : CameraSource.Prompt
    };

    try {
      const photo = await Camera.getPhoto(cameraOptions);

      if (!photo.base64String) {
        throw new Error('No base64 string returned from camera');
      }

      // Comprimir la imagen
      const compressedImage = await this.compressImage(photo.base64String);
      return compressedImage;
    } catch (error) {
      console.error('Error taking picture:', error);
      throw error;
    }
  }

  private async compressImage(base64: string): Promise<string> {
    try {
      const imageFile = this.base64ToFile(base64, 'photo.jpeg');

      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
        initialQuality: 0.5
      };

      const compressedFile = await imageCompression(imageFile, options);
      return await this.fileToBase64(compressedFile);
    } catch (error) {
      console.error('Error comprimiendo imagen:', error);
      throw error;
    }
  }

  private base64ToFile(base64String: string, filename: string): File {
    try {
      // Handle both prefixed and unprefixed base64 strings
      let base64Data: string;
      let mimeType = 'image/jpeg';

      if (base64String.includes(',')) {
        const parts = base64String.split(',');
        const matches = parts[0].match(/:(.*?);/);
        if (matches) {
          mimeType = matches[1];
        }
        base64Data = parts[1];
      } else {
        base64Data = base64String;
      }

      const byteString = atob(base64Data);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      return new File([ab], filename, { type: mimeType });
    } catch (error) {
      console.error('Error converting base64 to file:', error);
      throw error;
    }
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  }
}