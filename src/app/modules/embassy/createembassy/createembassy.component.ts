import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { embassyState, User } from 'src/assets/config/interfaces';
import { EmbassyserviceService } from '../services/embassyservice.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-createembassy',
  templateUrl: './createembassy.component.html',
  styleUrls: ['./createembassy.component.scss']
})
export class CreateembassyComponent implements OnInit {

  moduleState : embassyState;

  loading : boolean = false;
  
  embassiesData : any[] = [];

  country  = new FormControl('', [Validators.required]);
  name  = new FormControl('', [Validators.required]);
  email  = new FormControl('', [Validators.required, Validators.email]);
  phone1  = new FormControl('', [Validators.required]);
  phone2  = new FormControl('', [Validators.required]);
  map  = new FormControl('', [Validators.required]);
  website  = new FormControl('', [Validators.required]);
  openingtime  = new FormControl('', [Validators.required]);
  devise  = new FormControl('', [Validators.required]);
  presidentname  = new FormControl('', [Validators.required]);
  money  = new FormControl('', [Validators.required]);
  poeplenumber  = new FormControl('', [Validators.required]);
  capital  = new FormControl('', [Validators.required]);
  mostbigcity  = new FormControl('', [Validators.required]);
  code  = new FormControl('', [Validators.required]);
  arrivingdate  = new FormControl('', [Validators.required]);
  averagetime  = new FormControl('', [Validators.required]);


  
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
    private moduleService : EmbassyserviceService,
    public dialog: MatDialogRef<ModalComponent>,
    public snack : MatSnackBar
  ) { }


  /*Tags properties*/
  
  public visible : boolean = true; 
  public selectable : boolean = true; 
  public removable : boolean = true; 
      
  /*set the separator keys.*/
    
  readonly separatorKeysCodes: number[] = [ENTER, COMMA]; 
    
  /*create the tags list.*/
    
  public Tags: string[] = []; 
  public addTag(event: MatChipInputEvent): void { 
  
      /*we will store the input and value in local variables.*/
    
      const input = event.input; 
      const value = event.value; 
    
      if ((value || '').trim()) { 
        
        /*the input string will be pushed to the tag list.*/
    
        this.Tags.push(value); 
      } 
  
      if (input) { 
    
        /*after storing the input we will clear the input field.*/
    
        input.value = ''; 
      } 
  } 
    
  /*custom method to remove a tag.*/
    
  public removeTag(tag: string): void { 
    const index = this.Tags.indexOf(tag); 
  
    if (index >= 0)  
    { 
  
      /*the tag of a particular index is removed from the tag list.*/
  
      this.Tags.splice(index, 1); 
    } 
  } 

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

      if(this.moduleState.embassies && this.moduleState.embassies.length > 0) {
        this.embassiesData = this.moduleState.embassies
      }
    })
  }


  create () {
    if(
      this.country.invalid ||
      this.name.invalid ||
      this.email.invalid ||
      this.phone1.invalid
      ) {
        this.country.markAsTouched();
        this.name.markAsTouched();
        this.email.markAsTouched();
        this.phone1.markAsTouched();
        return;
      }


      if (!this.image) {
        this.errorMessage('Veuillez ajouter une image !');
        return;
      }

      const data = {
        country : this.country.value,
        name : this.name.value,
        email : this.email.value,
        phone1 : this.phone1.value,
        phone2 : this.phone2.value,
        map : this.map.value,
        website : this.website.value,
        openingtime : this.openingtime.value,
        devise : this.devise.value,
        presidentname : this.presidentname.value,
        languages : this.Tags.toString(),
        money : this.money.value,
        poeplenumber : this.poeplenumber.value,
        capital : this.capital.value,
        mostbigcity : this.mostbigcity.value,
        code : this.code.value,
        arrivingdate : this.arrivingdate.value,
        averagetime : this.averagetime.value,
        state : 1,
        logo : this.image,
        date: new Date().getTime()
      }

      const exist = this.embassiesData.filter(admin => 
        (admin.email.toLowerCase() === data.email.toLowerCase()) 
      || (admin.country.toLowerCase() === data.country.toLowerCase())
      || (admin.name.toLowerCase() === data.name.toLowerCase())
      ).length > 0 ? true : false
      
      if (!exist) {
        this.moduleService.saveEmbassy(data)
        .then(res => {
          if(res) {
            this.loading = false;
            this.dialog.close();
          }
        })
      }else {
        this.errorMessage ('Cette embassade existe dejà !');
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
