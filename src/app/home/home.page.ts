import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonItem,
  IonLabel,
  IonList,
  IonReorderGroup,
  IonItemSliding,
  IonReorder,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonMenu,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { ToDoService } from '../to-do.service';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonItem,
    IonLabel,
    IonList,
    IonReorderGroup,
    IonItemSliding,
    IonReorder,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonMenu,
    IonInput,
    FormsModule,
    IonButton,
  ],
})
export class HomePage {
  public item: string = '';
  public desc: string = ''; // Add description

  constructor(
    public shoppingList: ToDoService,
    private alertController: AlertController
  ) {}

  // Function to add item with description
  addItem() {
    if (!this.shoppingList.existsItem(this.item)) {
      this.shoppingList.addItem(this.item, this.desc); // Add both name and description
      this.item = ''; // Clear input after adding
      this.desc = ''; // Clear description
      this.alertSuccess();
    } else {
      this.alertError();
    }
  }

  // Remove item function with confirmation
  async removeItem(item: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: `¿Desea eliminar ${item}?`,
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            this.shoppingList.removeItem(item);
          },
        },
        {
          text: 'No',
          handler: () => {
            alert.dismiss();
          },
        },
      ],
    });
    await alert.present();
  }

  // Rearrange items function
  onRenderItems($event) {
    const item = this.shoppingList.items.splice($event.detail.from, 1)[0];
    this.shoppingList.items.splice($event.detail.to, 0, item);
    $event.detail.complete();
  }

  // Alert on success (item added)
  async alertSuccess() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Item agregado',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Alert on error (item already exists)
  async alertError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'El item ya existe',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
