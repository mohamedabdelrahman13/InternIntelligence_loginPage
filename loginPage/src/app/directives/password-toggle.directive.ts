import { AfterViewInit, Directive, ElementRef, HostListener, ViewChild, input } from '@angular/core';

@Directive({
  selector: '[appPasswordToggle]',
  standalone: false
})
export class PasswordToggleDirective{
  private isVisible:boolean = false;
  constructor(private element:ElementRef) {
    
  }
    @HostListener('click')
    togglePAssword(){
      // select the password input element
      const passwordInput = this.element.nativeElement.closest('.password').querySelector('input');


      // change the input type based on the status of this.isVisible
      if(passwordInput.type && passwordInput){
        if(!this.isVisible){
          passwordInput.type = 'text';
          this.isVisible = true;
        }
        else{
         passwordInput.type = 'password';
         this.isVisible = false;
        }
      }


      this.element.nativeElement.textContent = this.isVisible ? 'visibility_off' : 'visibility';
    }
   

  }