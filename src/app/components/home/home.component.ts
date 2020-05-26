import { Component , OnInit, Output, EventEmitter} from '@angular/core';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { RouterExtensions } from 'nativescript-angular/router';
//import * as utils from "tns-core-modules/utils/utils";
import { Page } from 'tns-core-modules/ui/page';
import { AppState } from '~/app/config';
import {setCurrentOrientation , orientationCleanup} from 'nativescript-screen-orientation';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  moduleId: module.id
})

export class HomeComponent implements OnInit{
    url = AppState.url;
    constructor(private barcodeScanner: BarcodeScanner,private route: RouterExtensions,private page:Page){
        page.on("navigatedTo",function(){
            setCurrentOrientation("portrait",function(){
            console.log("portrait orientation");
            });
         });
         page.on("navigatingFrom",function(){
       orientationCleanup();
            });
         }
    ngOnInit() {
        this.page.actionBarHidden=true;

        //this.page.backgroundImage = "~/qr.jpg";
    }
    //@Output() add = new EventEmitter<string>();
    public onScan() {
        this.barcodeScanner.scan({
            formats: "QR_CODE, EAN_13",
            showFlipCameraButton: true,
            preferFrontCamera: false,
            showTorchButton: true,
            beepOnScan: true,
            torchOn: false,
            resultDisplayDuration: 500,
            orientation: 'portrait',
            openSettingsIfPermissionWasPreviouslyDenied: true //ios only
        }).then((result) => {
            this.url.myValue=result.text;
            //utils.openUrl(result.text);
            this.route.navigate(['/result']);
            }, (errorMessage) => {
                console.log("Error when scanning " + errorMessage);
            }
        );
        //this.add.emit(this.url.myValue);
    }
    about(){
        this.route.navigate(['/about']);
    }

 }
