import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorModalData } from '../../models/error.model';
import { ErrorModal } from './error-modal';

describe('ErrorModal con zoneless', () => {
  let fixture: ComponentFixture<ErrorModal>;
  let component: ErrorModal;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ErrorModal>>;

  const mockErrorData: ErrorModalData = {
    errorMessage: 'Error de prueba',
    errorIcon: 'warning',
    errorTitle: 'Título de prueba'
  };

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    await TestBed.configureTestingModule({
      imports: [ErrorModal],
      providers: [
        provideZonelessChangeDetection(),
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: mockErrorData }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Creation', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have injected data', () => {
      expect(component.data).toEqual(mockErrorData);
    });
  });

  describe('Getters', () => {
    it('should return error message from data', () => {
      expect(component.errorMessage).toBe('Error de prueba');
    });

    it('should return error icon from data', () => {
      expect(component.errorIcon).toBe('warning');
    });

    it('should return error title from data', () => {
      expect(component.errorTitle).toBe('Título de prueba');
    });
  });

  describe('close() method', () => {
    it('should call dialog.close() when close method is called', () => {
      component.close();
      expect(dialogRefSpy.close).toHaveBeenCalled();
    });

    it('should close dialog without arguments', () => {
      component.close();
      expect(dialogRefSpy.close).toHaveBeenCalledWith();
    });
  });

  describe('render template', () => {
    it('should render error title in the template', () => {
      fixture.detectChanges();
      const titleElement = fixture.nativeElement.querySelector('h2, .title, [mat-dialog-title]');
      expect(titleElement?.textContent).toContain('Título de prueba');
    });

    it('should render error icon when provided', () => {
      fixture.detectChanges();
      const iconElement = fixture.nativeElement.querySelector('mat-icon');
      expect(iconElement).toBeTruthy();
      expect(iconElement?.textContent).toContain('warning');
    });

    it('should have a close button', () => {
      fixture.detectChanges();
      const closeButton = fixture.nativeElement.querySelector('button');
      expect(closeButton).toBeTruthy();
    });

    it('should call close() when close button is clicked', () => {
      spyOn(component, 'close');
      fixture.detectChanges();
      
      const closeButton = fixture.nativeElement.querySelector('button');
      closeButton.click();
      
      expect(component.close).toHaveBeenCalled();
    });
  });
});