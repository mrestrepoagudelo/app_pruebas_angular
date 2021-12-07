import { ElementRef } from "@angular/core";

export function FocusElement(el:ElementRef){
    const invalidControl = el.nativeElement.querySelectorAll('input.ng-invalid');
    for (let index = 0; index < invalidControl.length; index++) {
        const element = invalidControl[index];
        element.focus();
    }
} 
