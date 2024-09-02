import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// ValidationErrors is an object containing the validation error arbitrary name and boolean to specify whether the error exists (In our case, true).
export const confirmPasswordValidator:ValidatorFn=(
    control: AbstractControl
):ValidationErrors | null=>{
     
    return control.get('ps')?.value=== control.get('conformPs')?.value ?null:{PasswordNoMatch:true};
}
export class ConfirmPassword {
}
