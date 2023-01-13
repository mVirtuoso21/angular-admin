import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { EditUserComponent } from './edit-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UnsavedGuard implements CanDeactivate<EditUserComponent> {

  constructor(private dialog: MatDialog, private snackbar: MatSnackBar) { }

  canDeactivate(component: EditUserComponent) {
    if (!component.saved) {
      // mat dialog
      component.dialog = this.dialog;
      component.dialog.open(DialogExample, {
        height: '100px',
        width: '350px',
      });
      // mat snackbar
      component.snackbar = this.snackbar;
      component.snackbar.open("You have unsaved changes!", 'OK', { duration: '4000' });
    }
    return component.saved;
  }
}

@Component({
  selector: 'dialog-example',
  template: '<div style="text-align: center; padding-top: 15px;"><p>You have unsaved changes</p></div>',
})
export class DialogExample { }
