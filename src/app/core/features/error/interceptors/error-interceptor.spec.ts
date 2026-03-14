import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { throwError } from 'rxjs';

import { errorInterceptor } from './error-interceptor';
import { ErrorModal } from '../presentation/error-modal/error-modal';
import { provideZonelessChangeDetection } from '@angular/core';

describe('errorInterceptor', () => {
  let interceptor: HttpInterceptorFn;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockRequest: HttpRequest<unknown>;
  let mockNext: jasmine.Spy<HttpHandlerFn>;

  beforeEach(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        provideZonelessChangeDetection()
      ]
    });

    interceptor = (req, next) => 
      TestBed.runInInjectionContext(() => errorInterceptor(req, next));

    mockRequest = new HttpRequest('GET', '/test');
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should open error modal when HTTP error occurs', (done) => {
    const errorResponse = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found',
      error: 'Resource not found'
    });

    mockNext = jasmine.createSpy().and.returnValue(throwError(() => errorResponse));

    interceptor(mockRequest, mockNext).subscribe({
      next: () => {
        fail('Expected error, but got success');
      },
      error: (error) => {
        expect(mockDialog.open).toHaveBeenCalledWith(ErrorModal, {
          data: {
            errorMessage: errorResponse.message,
            errorTitle: 'Error 404',
            errorIcon: 'error'
          }
        });
        
        expect(error).toBe(errorResponse);
        done();
      }
    });

    expect(mockNext).toHaveBeenCalledWith(mockRequest);
  });
  
});