import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import Swal from 'sweetalert2'
import { SpinnerService } from 'src/components/spinner/services/spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly _spinnerService: SpinnerService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._spinnerService.show()
    return next.handle(request).pipe(
      finalize(() => this._spinnerService.hide()),
      catchError((error) => this.errorHandler(error))
    );
  }

  errorHandler(er: HttpErrorResponse):Observable<any> {
    this._spinnerService.hide()
    const {message, statusCode} = er.error
    Swal.fire({
      title: 'Error',
      text: `${statusCode}: ${message}`,
      icon: 'error'
    })
    return throwError(message)
  }
}
