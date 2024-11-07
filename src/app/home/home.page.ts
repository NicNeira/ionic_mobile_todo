import { Component } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import {
  trashOutline,
  createOutline,
  trashBinOutline,
  addOutline,
} from 'ionicons/icons';
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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    FormsModule,
  ],
})
export class HomePage {
  public item: string = '';
  public desc: string = '';
  private editMode: boolean = false;
  private originalName: string = '';

  constructor(
    public shoppingList: ToDoService,
    private alertController: AlertController
  ) {
    addIcons({
      trashOutline,
      createOutline,
      trashBinOutline,
      addOutline,
    });
  }

  // Función para agregar una tarea
  addItem() {
    if (this.item && this.desc) {
      if (this.editMode) {
        // Si estamos en modo edición, actualizar el item
        this.shoppingList.editItem(this.originalName, this.item, this.desc);
        this.editMode = false;
        this.originalName = '';
      } else if (this.shoppingList.existsItem(this.item)) {
        // Si no estamos en modo edición y el item existe, mostrar error
        this.alertError();
        return;
      } else {
        // Si no existe, agregar nuevo item
        this.shoppingList.addItem(this.item, this.desc);
      }
      this.alertSuccess();
      this.item = '';
      this.desc = '';
    }
  }

  // Eliminar una tarea con confirmación
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

  //
  removeAllItems() {
    this.shoppingList.removeAllItems();
    this.alertSuccess();
  }

  // Función para manejar el reordenamiento de tareas
  onRenderItems($event) {
    const item = this.shoppingList.items.splice($event.detail.from, 1)[0];
    this.shoppingList.items.splice($event.detail.to, 0, item);
    $event.detail.complete();
  }

  async alertSuccess() {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: 'Operación exitosa',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Mostrar alerta de error (ej. tarea ya existe)
  async alertError() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'La tarea ya existe',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Función para editar una tarea
  async editItem(item: { name: string; description: string }) {
    const alert = await this.alertController.create({
      header: 'Editar Tarea',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre de la tarea',
          value: item.name,
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Descripción',
          value: item.description,
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.name && data.description) {
              this.shoppingList.editItem(
                item.name,
                data.name,
                data.description
              );
              this.alertSuccess();
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
