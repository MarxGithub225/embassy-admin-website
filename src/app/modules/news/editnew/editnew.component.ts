import { Component, Input, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { newsState, User } from 'src/assets/config/interfaces';
import { NewserviceService } from '../services/newservice.service';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editnew',
  templateUrl: './editnew.component.html',
  styleUrls: ['./editnew.component.scss']
})
export class EditnewComponent implements OnInit {

  @Input() datas: any;
  
  baseUrl : string = environment.url.replace('/routes', '');
  
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


  
  public imageData : string =  null;
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

    this.title.reset(this.datas.title);
    this.description.reset(this.datas.description);
    this.link.reset(Number(this.datas.type) === 0 ? this.datas.link : null);

    this.imageData = this.datas.image;

    this.isOnDiscovery = Number(this.datas.isOnDiscovery) === 1 ? true : false;
    this.isVideo = Number(this.datas.type) === 0 ? true : false;

    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;

      if(this.moduleState.news && this.moduleState.news.length > 0) {
        this.newsData = this.moduleState.news
      }
    })
  }


  create () {


      if (this.isVideo) {
        if(
          this.link.invalid
          ) {
            this.link.markAsTouched();
            return;
          }
      }

      const data = {
        ...this.datas,
        title : this.title.value,
        description : this.description.value,
        type: this.isVideo ? 0 : 1,
        link : (!this.isVideo && !this.image) ? this.imageData : (!this.isVideo && this.image) ? this.image : this.link.value,
        image : this.image ? this.image : this.imageData,
        isOnDiscovery: this.isOnDiscovery ? 1 : 0
      }

      
      this.moduleService.editNew(
        (!this.isVideo && this.image) ?  {...data, editBoth: true} 
        : (this.isVideo && !this.image) ?  {...data, isVideo: true} 
        : (this.isVideo && this.image) ? {...data, editImage: true} : data)
        .then(res => {
          if(res) {
            this.loading = false;
            this.dialog.close();
          }
        })
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

