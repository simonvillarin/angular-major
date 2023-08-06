import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { GradeService } from 'src/app/shared/services/grade/grade.service';
import { ProfessorService } from 'src/app/shared/services/professor/professor.service';
import { ProfessorloadService } from 'src/app/shared/services/professorload/professorload.service';
import { StudentService } from 'src/app/shared/services/student/student.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  date: Date | undefined;
  load: any = {};
  professor: any;
  username: string = '';
  userPic: string = '';

  professorBar: any;

  constructor(
    private professorLoadService: ProfessorloadService,
    private authService: AuthService,
    private professorService: ProfessorService,
    private gradeService: GradeService
  ) {}

  ngOnInit(): void {
    this.getProfessorLoadByProfessorId();
    this.getProfessor();
  }

  getProfessorLoadByProfessorId = () => {
    this.professorLoadService
      .getProfessorLoadByProfessorId(this.authService.getUserId())
      .subscribe((data: any) => {
        const subjects: string[] = [];
        const numStudents: number[] = [];

        this.load = data;
        const schedulePromises = data.schedules.map((load: any) => {
          return this.gradeService
            .getGradesBySection(load.section.sectionId, load.subject.subjectId)
            .toPromise(); // Convert the Observable to a Promise
        });

        Promise.all(schedulePromises)
          .then((studentsPerSubject: any[]) => {
            studentsPerSubject.forEach((student: any, index: number) => {
              subjects.push(data.schedules[index].subject.subjectTitle);
              numStudents.push(student.length);
            });

            this.professorBar = {
              labels: subjects,
              datasets: [
                {
                  label: 'Average',
                  data: numStudents,
                  backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                  ],
                },
              ],
            };
          })
          .catch((error: any) => {
            console.error('Error fetching data:', error);
          });
      });
  };

  getProfessor = () => {
    const profId = this.authService.getUserId();
    this.professorService.getProfessorById(profId).subscribe((data) => {
      this.professor = data;
      this.username = this.professor.firstname + ' ' + this.professor.lastname;
      this.userPic = this.professor.image;
    });
  };
}
