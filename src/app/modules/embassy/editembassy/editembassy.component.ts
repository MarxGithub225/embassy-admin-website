import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import { ImageCroppedEvent } from 'ngx-image-cropper';
import { embassyState, User } from 'src/assets/config/interfaces';
import { EmbassyserviceService } from '../services/embassyservice.service';

import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatChipInputEvent} from '@angular/material/chips';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-editembassy',
  templateUrl: './editembassy.component.html',
  styleUrls: ['./editembassy.component.scss']
})
export class EditembassyComponent implements OnInit {
  @Input() datas: any;
  
  baseUrl : string = environment.url.replace('/routes', '');
  
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


  
  public logo : string =  null;
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


    this.country.reset(this.datas.country);
    this.name.reset(this.datas.name);
    this.email.reset(this.datas.email);
    this.phone1.reset(this.datas.phone1);
    this.phone2.reset(this.datas.phone2);
    this.map.reset(this.datas.map);
    this.website.reset(this.datas.website);
    this.openingtime.reset(this.datas.openingtime);
    this.devise.reset(this.datas.devise);
    this.presidentname.reset(this.datas.presidentname);
    this.Tags = this.datas.languages ? this.datas.languages.split(",") : [];
    this.money.reset(this.datas.money);
    this.poeplenumber.reset(this.datas.poeplenumber);
    this.capital.reset(this.datas.capital);
    this.mostbigcity.reset(this.datas.mostbigcity);
    this.code.reset(this.datas.code);
    this.arrivingdate.reset(this.datas.arrivingdate);
    this.averagetime.reset(this.datas.averagetime);

    this.logo = this.datas.logo;

    this.moduleService.stateObservable.subscribe(state => {
      this.moduleState = state;

      if(this.moduleState.embassies && this.moduleState.embassies.length > 0) {
        this.embassiesData = this.moduleState.embassies
      }
    })
  }


  edit () {
    
      const data = {
        ...this.datas,
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
        logo : this.image ? this.image : this.logo,
      }

      
      this.moduleService.editEmbassy(!this.image ? data: {...data, editLogo: true})
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

