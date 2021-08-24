import { Component, OnInit } from '@angular/core';
import { visaState } from 'src/assets/config/interfaces';
import { VisaserviceService } from './services/visaservice.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { BottomsheetComponent } from 'src/app/shared/bottomsheet/bottomsheet.component';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-visa',
  templateUrl: './visa.component.html',
  styleUrls: ['./visa.component.scss']
})
export class VisaComponent implements OnInit {

  baseUrl : string = environment.url.replace('/routes', '');

  moduleState : visaState

  searchText;
  selected: any;
  isSelected: boolean = false;

  constructor(
    private moduleService : VisaserviceService,
    public matDialog: MatDialog, 
    private _bottomSheet: MatBottomSheet,
    private router: Router,
  ) { }


  public openModal = (modalWith, modalWithExt, modalRoot, modalTitle, modalDatas) => {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.width = modalWith + modalWithExt;
    dialogConfig.panelClass = "custom-dialog-container";
    dialogConfig.data = {root: modalRoot, title: modalTitle, data: modalDatas}
    this.matDialog.open(ModalComponent, dialogConfig);
  }
  
  openBottomSheet(sheetRoot, sheetTitle, sheetDatas): void {
    const sheetConfig = new MatBottomSheetConfig();
    sheetConfig.panelClass = "custom-sheet-container";
    sheetConfig.data = {root: sheetRoot, title: sheetTitle, data: sheetDatas}
    this._bottomSheet.open(BottomsheetComponent, sheetConfig);
  }

  ngOnInit(): void {
    this.moduleService.init()

    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;

    })
  }


  select (order) {
    this.isSelected = true;
    this.selected = order;
  }

}

