import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  userForm!: FormGroup;

  // Define mock options for dropdowns
  educationOptions = [
    { InstitutionName: 'Institution 1' },
    { InstitutionName: 'Institution 2' },
    { InstitutionName: 'Institution 3' }
  ];

  workExperienceOptions = [
    { WorkTitle: 'Software Engineer' },
    { WorkTitle: 'Data Analyst' },
    { WorkTitle: 'Project Manager' }
  ];

  skillsOptions = [
    { SkillName: 'JavaScript' },
    { SkillName: 'Angular' },
    { SkillName: 'Node.js' }
  ];

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    // Initialize the form group with form controls
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      description: ['', Validators.required],
      education: this.fb.array([this.createEducation()]),
      workExperience: this.fb.array([this.createWorkExperience()]),
      skills: this.fb.array([this.createSkill()])
    });
  }

  get education() {
    return (this.userForm.get('education') as FormArray);
  }

  get workExperience() {
    return (this.userForm.get('workExperience') as FormArray);
  }

  get skills() {
    return (this.userForm.get('skills') as FormArray);
  }
  createEducation() {
    return this.fb.group({
      InstitutionName: ['', Validators.required],
      CourseName: ['', Validators.required],
      StartYear: ['', Validators.required],
      EndYear: ['', Validators.required],
      Percentage: ['', Validators.required],
      Description: ['']
    });
  }

  createWorkExperience() {
    return this.fb.group({
      WorkTitle: ['', Validators.required],
      CompantName: ['', Validators.required],
      YearOfExperience: ['', Validators.required],
      PositionNumber: ['', Validators.required]
    });
  }

  createSkill() {
    return this.fb.group({
      SkillName: ['', Validators.required],
      Description: ['']
    });
  }
  // Add new education entry
  addEducation() {
    this.education.push(this.createEducation());
  }

  // Add new work experience entry
  addWorkExperience() {
    this.workExperience.push(this.createWorkExperience());
  }

  // Add new skill entry
  addSkill() {
    this.skills.push(this.createSkill());
  }
  // Handle form submission
  onSubmit() {
    if (this.userForm.valid) {
      console.log('User Data Submitted:', this.userForm.value);
      this.userService.addUser(this.userForm.value).pipe(
        catchError((error) => {
          console.error('Error occurred:', error);  // Log the error for debugging
  
          // Handle the error and show a user-friendly message
          alert('An error occurred while creating the user. Please try again later.');
  
          return of(null);  // Return a null observable to prevent breaking the flow
        })
      ).subscribe((result: any) => {
        if (result && result.status === 1) {
          alert('User Created Successfully');
        } else {
          alert(result?.message || 'Unknown error');
        }
      });
      // Call your API to create the user here
    } else {
      console.log('Form is not valid');
    }
  }
}
