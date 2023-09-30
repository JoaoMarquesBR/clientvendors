import { AbstractControl } from "@angular/forms";

//validate phones
export function PostalCodeValidator(control: AbstractControl):{invalidCode: boolean}| null {
  const CODE_REGEXP =  /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  return !CODE_REGEXP.test(control.value)?{invalidCode:true}: null;
}
