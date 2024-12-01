import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonReorder,
  IonReorderGroup,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  addOutline,
  createOutline,
  trashBinOutline,
  trashOutline,
} from 'ionicons/icons';

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
    
  ) {
    addIcons({
      trashOutline,
      createOutline,
      trashBinOutline,
      addOutline,
    });
  }

  
}
