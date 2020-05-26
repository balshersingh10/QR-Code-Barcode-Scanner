import { Component, OnInit, Input } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';
import { RouterExtensions } from 'nativescript-angular/router';
import {setCurrentOrientation , orientationCleanup} from 'nativescript-screen-orientation';

@Component({
  selector: 'ns-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  moduleId: module.id,
})
export class AboutComponent implements OnInit {
    constructor(private route: RouterExtensions,private page:Page){
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

    }
    home(){
        this.route.navigate(['/']);
    }
}
