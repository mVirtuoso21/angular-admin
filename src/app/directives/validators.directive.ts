import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors, FormArray } from "@angular/forms";

@Directive({
  selector: '[appCustomValidators]'
})
export class CustomValidatorsDirective {

  constructor() { }

}

export function validateArabicName(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value: string = control.value;
    if (!value) {
      return null;
    }
    let isArabic = true;
    let regexp = /[\u0600-\u06ff\s]/;
    for (let char of value) {
      isArabic &&= regexp.test(char);
    }
    return !isArabic ? { arabic: true } : null;
  }
}

export function validateUniqueStates(country: FormArray): ValidatorFn {
  return (): ValidationErrors | null => {
    let selectedStates: any[] = [];
    country.getRawValue().map((group: any) => selectedStates.push(group.stateControl));
    return !(selectedStates.length === (new Set(selectedStates).size)) ? { uniqueStates: true } : null;
  }
}
