import { Component, OnInit, Input } from '@angular/core';
import { AppState } from '~/app/config';
import { Page } from 'tns-core-modules/ui/page';
import * as utils from "tns-core-modules/utils/utils";
import { RouterExtensions } from 'nativescript-angular/router';
import * as SocialShare from "nativescript-social-share";
import { ActionOptions, action } from 'tns-core-modules/ui/dialogs';
import {setCurrentOrientation , orientationCleanup} from 'nativescript-screen-orientation';

@Component({
  selector: 'ns-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
  moduleId: module.id,
})
export class ResultComponent implements OnInit {
    url = AppState.url;
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
    public shareText() {
        SocialShare.shareUrl(this.url.myValue,"URL");
    }
    visit() {
        utils.openUrl(this.url.myValue);
    }
    scanagain() {
        this.route.navigate(['']);
    }
    copy(){
        var clipboard = require("nativescript-clipboard");
        clipboard.setText(this.url.myValue).then(function() {
            console.log("OK, copied to the clipboard");
        })
        const actionOptions: ActionOptions = {
            title: "",
            message: "Copied To Clipboard",
            cancelButtonText: "Done",
            //actions: ["Option1", "Option2"],
            cancelable: true // Android only
        };

        action(actionOptions).then((result) => {
            console.log("Dialog result: ", result);
        });
    }
}
