import { Component, OnInit } from '@angular/core';
import { SplashscreenService } from '../../services/splashscreen.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css']
})
export class SplashComponent implements OnInit {

  // The screen starts with the maximum opacity
public opacityChange = 1;

public splashTransition:any;

// First access the splash is visible
public showSplash = true;

readonly ANIMATION_DURATION = 1;

  constructor(
    private splashService:SplashscreenService
  ) { }

  ngOnInit(): void {

    // Somewhere the stop method has been invoked
    this.splashService.subscribe((res:any) => {
      this.hideSplashAnimation();
  });
  }

  hideSplashAnimation() {
    // Setting the transition
    this.splashTransition = `opacity ${this.ANIMATION_DURATION}s`;
    this.opacityChange = 0;
 
    setTimeout(() => {
       // After the transition is ended the showSplash will be hided
       this.showSplash = !this.showSplash;
    }, 1000);
 }

}
