import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'mindful-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent {
  isLoading = false;

  feedbackFormGroup: FormGroup = new FormGroup({
    job: new FormControl('', Validators.required),
    age: new FormControl(0, Validators.required),
    gender: new FormControl(''),
    note: new FormControl('', [Validators.required, Validators.minLength(20)]),
  });

  constructor(private location: Location, private router: Router) {}

  back() {
    this.location.back();
  }

  submit() {
    this.isLoading = true;
    setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 1000);
  }
}
