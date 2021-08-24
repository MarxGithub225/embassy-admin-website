import { Component, OnInit } from '@angular/core';
import { embassyState, User } from 'src/assets/config/interfaces';
import { EmbassyserviceService } from './services/embassyservice.service';

import { AuthService } from 'src/app/services/auth/auth.service';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { BottomsheetComponent } from 'src/app/shared/bottomsheet/bottomsheet.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-embassy',
  templateUrl: './embassy.component.html',
  styleUrls: ['./embassy.component.scss']
})
export class EmbassyComponent implements OnInit {

  baseUrl : string = environment.url.replace('/routes', '');
  
  searchText;
  moduleState : embassyState
  userState : User

  constructor(
    private moduleService : EmbassyserviceService,
    public matDialog: MatDialog, 
    private _bottomSheet: MatBottomSheet,
    private authService: AuthService
  ) { }

  public openModal = (modalWith, modalWithExt, modalRoot, modalTitle, modalDatas) => {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.disableClose = false;
    dialogConfig.width = modalWith + modalWithExt;
    dialogConfig.panelClass = "custom-dialog-container";
    dialogConfig.data = {root: modalRoot, title: modalTitle, data: modalDatas}
    this.matDialog.open(ModalComponent, dialogConfig);
  }
  
  public openBottomSheet(sheetRoot, sheetTitle, sheetDatas): void {
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

    this.authService.userObservable.subscribe(state => {
      this.userState = state
    })
  }



  edit(embassy, state) {
    const embassyData = {
      ...embassy,
      state : Number(state)
    }
    this.moduleService.editEmbassy(embassyData)
  }
  

}
