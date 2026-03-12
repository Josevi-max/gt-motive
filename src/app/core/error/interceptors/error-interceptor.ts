import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { ErrorModal } from '../presentation/error-modal/error-modal';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const dialog = inject(MatDialog);
  return next(req).pipe(
   catchError((error: HttpErrorResponse) => {
    dialog.open(ErrorModal, {
      data: {
        errorMessage: error.message,
        errorTitle: `Error ${error.status}`,
        errorIcon: 'error'
      }
    });
    return throwError(() => error);
   }) 
  );
};
