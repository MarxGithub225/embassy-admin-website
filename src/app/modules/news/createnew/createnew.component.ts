import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { newsState, User } from 'src/assets/config/interfaces';
import { NewserviceService } from '../services/newservice.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageCroppedEvent } from 'ngx-image-cropper';
@Component({
  selector: 'app-createnew',
  templateUrl: './createnew.component.html',
  styleUrls: ['./createnew.component.scss']
})
export class CreatenewComponent implements OnInit {

  isOnDiscovery = false;
  isVideo = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    minHeight: '150px',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    defaultFontSize: '3',
    uploadWithCredentials: true,
    sanitize: true,
    toolbarHiddenButtons:   [
      [],
      [
        'removeFormat',
        'toggleEditorMode',
        'insertImage',
        'insertVideo'
      ]
    ]
  };

  moduleState : newsState;

  loading : boolean = false;
  
  newsData : any[] = [];

  title  = new FormControl('', [Validators.required]);
  description  = new FormControl('', [Validators.required]);
  link  = new FormControl('', [Validators.required]);


  
  public image : string =  null;

  imageChangedEvent: any;
  croppedImage: any;

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;

    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
    
        this.image = reader.result as string;
      
      };
    
    }
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  imageLoaded () {

  }
  cropperReady () {

  }
  loadImageFailed () {

  }

  setBanner = () =>{
    this.image = this.croppedImage;
    this.imageChangedEvent = null;
  }

  uploadFile = () =>{
    let element: HTMLElement = document.getElementById('imageInput') as HTMLElement;
    element.click();
  }

  constructor(
    private moduleService : NewserviceService,
    public dialog: MatDialogRef<ModalComponent>,
    public snack : MatSnackBar
  ) { }


  

  public generateChar = () =>{
    let length = 6,
    charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"+ new Date().getTime(),
    retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n)).toUpperCase();
    }
    
    return retVal;
  }

  ngOnInit(): void {

    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;

      if(this.moduleState.news && this.moduleState.news.length > 0) {
        this.newsData = this.moduleState.news
      }
    })
  }


  create () {
    if(
      this.title.invalid ||
      this.description.invalid 
      ) {
        this.title.markAsTouched();
        this.description.markAsTouched();
        return;
      }


      if (!this.image) {
        this.errorMessage('Veuillez ajouter une image !');
        return;
      }


      if (this.isVideo) {
        if(
          this.link.invalid
          ) {
            this.link.markAsTouched();
            return;
          }
      }

      const data = {
        title : this.title.value,
        description : this.description.value,
        type: this.isVideo ? 0 : 1,
        state : 1,
        link : !this.isVideo ? this.image: this.link.value,
        image : this.image,
        isOnDiscovery: this.isOnDiscovery ? 1 : 0,
        date: new Date().getTime()
      }

      const exist = this.newsData.filter(admin => 
        (admin.title.toLowerCase() === data.title.toLowerCase())
      ).length > 0 ? true : false
      
      if (!exist) {
        this.moduleService.saveNew(!this.isVideo ? data : {...data, isVideo: true})
        .then(res => {
          if(res) {
            this.loading = false;
            this.dialog.close();
          }
        })
      }else {
        this.errorMessage ('Cette actualité existe dejà !');
      }
  }

  errorMessage(a): void {
    this.snack.open(a, '',
  
    {
      duration: 5000,
      verticalPosition: 'bottom',
      panelClass: 'danger-alert'
    }
  
    ) ;
  }

}
