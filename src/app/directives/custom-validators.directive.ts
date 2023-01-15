import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

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

export function validateUniqueCountries(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let selectedCountries: any[] = [];
    control.value.map((group: any) => selectedCountries.push(group.countryControl));
    return !(selectedCountries.length === (new Set(selectedCountries).size)) ? { uniqueCountries: true } : null;
  }
}

// for edit-user-component, should be merged with the updated validator
// export function validateUniqueCountries(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     return !(control.value.length === (new Set(control.value).size)) ? { uniqueCountries: true } : null;
//   }
// }
