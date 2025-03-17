import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userDetails: any;
  userList: any;
  constructor(private userService: UserService, private router: Router){

  }
  ngOnInit(){
    this.getUserList();
  }
  getUserList(){
    var data = {
      page: 1,
      limit: 10
    }
    this.userService.getUserList(data).subscribe((result: any) =>{
      if(result.status==1){
        this.userList = result.data;
        console.log("userList", this.userList);
        
      }
    })
  }
  addUser(){
    this.router.navigateByUrl('pages/add-user');
  }
    // Method to generate the CV
    generateCV(userId: number) {
      // Fetching user details from the API
      this.userService.getUserDetails(userId).subscribe((result: any) => {
        if (result.status === 1) {
          const user = result.data;  // Storing the user data from the API response
    
          // Create new PDF document
          const doc = new jsPDF();
          
          // Set document properties
          doc.setProperties({
            title: `${user.Name} - CV`,
            subject: 'Curriculum Vitae',
            author: user.Name,
            creator: 'CV Generator App'
          });
    
          // Fonts and colors
          const primaryColor = [41, 128, 185]; // Professional blue
          const secondaryColor = [52, 73, 94]; // Dark slate
          const textColor = [44, 62, 80]; // Dark slate for text
    
          // Header with user name
          doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.rect(0, 0, 210, 40, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(24);
          doc.setFont('helvetica', 'bold');
          doc.text(user.Name, 105, 20, { align: 'center' });
          doc.setFontSize(12);
          doc.text(user.WorkTitle || 'Professional', 105, 30, { align: 'center' });
    
          // Contact information section
          doc.setTextColor(textColor[0], textColor[1], textColor[2]);
          doc.setFillColor(245, 245, 245);
          doc.rect(0, 40, 210, 25, 'F');
          
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          
          // Contact details in a horizontal layout
          const contactY = 50;
          doc.text(`Email: ${user.Email}`, 20, contactY);
          doc.text(`Phone: ${user.Phone}`, 105, contactY);
          doc.text(`Created: ${new Date(user.CreatedOn).toLocaleDateString()}`, 20, contactY + 10);
          
          // Professional summary
          const summaryY = 75;
          doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
          doc.rect(0, summaryY - 10, 210, 8, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text('PROFESSIONAL SUMMARY', 105, summaryY - 5, { align: 'center' });
          
          doc.setTextColor(textColor[0], textColor[1], textColor[2]);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          
          // Handle multi-line description with proper wrapping
          const splitDescription = doc.splitTextToSize(user.Description || 'No description available', 170);
          doc.text(splitDescription, 20, summaryY + 5);
          
          // Education section
          const educationY = summaryY + 20 + (splitDescription.length * 5);
          doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
          doc.rect(0, educationY - 10, 210, 8, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text('EDUCATION', 105, educationY - 5, { align: 'center' });
          
          doc.setTextColor(textColor[0], textColor[1], textColor[2]);
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');

          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          user.education.forEach((education: any, index: any) => {
            doc.text(education.InstitutionName || 'Institution Name', 20, educationY + 5);
            doc.text(`${education.CourseName || 'Course Name'} | ${education.StartYear || 'Start'} - ${education.EndYear || 'End'} | ${education.Percentage || '0'}%`, 20, educationY + 12);
          })

          // Work Experience section
          const workY = educationY + 25;
          doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
          doc.rect(0, workY - 10, 210, 8, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text('WORK EXPERIENCE', 105, workY - 5, { align: 'center' });
          
          doc.setTextColor(textColor[0], textColor[1], textColor[2]);
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');

          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          user.workExperience.forEach((work: any, index: any) => {
            doc.text(`${work.WorkTitle || 'Job Title'} at ${work.CompantName || 'Company Name'}`, 20, workY + 5);
            doc.text(`Position: ${work.PositionNumber || 'N/A'} | Experience: ${work.YearOfExperience || '0'} years`, 20, workY + 12);
          })
          
          
          // Skills section
          const skillsY = workY + 25;
          doc.setFillColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
          doc.rect(0, skillsY - 10, 210, 8, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text('SKILLS', 105, skillsY - 5, { align: 'center' });
          user.skills.forEach((skill: any, index: any) => {
            doc.text(skill.SkillName || 'Skill Name', 20, skillsY + 5);
            const skillDescription = skill.Description || 'No description available';
            const splitSkillDescription = doc.splitTextToSize(skillDescription, 170);
            doc.text(splitSkillDescription, 20, skillsY + 12);
          })
          
          
          doc.setTextColor(textColor[0], textColor[1], textColor[2]);
          doc.setFontSize(11);
          doc.setFont('helvetica', 'bold');
          
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          
          
          // Footer
          doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.rect(0, 280, 210, 17, 'F');
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(8);
          doc.setFont('helvetica', 'italic');
          doc.text('Generated on ' + new Date().toLocaleDateString(), 105, 285, { align: 'center' });
          doc.text('Page 1 of 1', 105, 290, { align: 'center' });
          
          // Save the generated PDF with user's name
          doc.save(`${user.Name}_CV.pdf`);
        } else {
          console.error('Failed to fetch user details');
        }
      });
    }
}
