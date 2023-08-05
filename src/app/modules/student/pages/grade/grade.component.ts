import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { GradeService } from 'src/app/shared/services/grade/grade.service';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss'],
  providers: [DatePipe],
})
export class GradeComponent implements OnInit {
  grades: any = [];
  schoolYears: any = [];
  schoolYear: string = '';
  student: any = {};

  constructor(
    private gradeService: GradeService,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.getGradesByStudentId();
  }

  getGradesByStudentId = () => {
    this.gradeService
      .getGradeByStudentId(this.authService.getUserId())
      .subscribe((data: any) => {
        this.grades = data.sort((a: any, b: any) => b.gradeId - a.gradeId);
        this.grades.forEach((grade: any) => {
          let exists = false;
          this.schoolYears.forEach((g: any) => {
            if (g == `${grade.yearLevel} - ${grade.sem}`) {
              exists = true;
            }
          });
          if (!exists) {
            this.schoolYears.push(`${grade.yearLevel} - ${grade.sem}`);
          }
        });

        this.schoolYears = this.schoolYears.filter(
          (year: any) =>
            year == `${data[0].student.yearLevel} - ${data[0].student.sem}`
        );
      });
  };

  getAverage = (prelim: any, midterm: any, final: any) => {
    let sum = 0;
    let period = 1;
    if (prelim != null) {
      sum += parseFloat(prelim);
    }
    if (midterm != null) {
      period = 2;
      sum += parseFloat(midterm);
    }
    if (final != null) {
      period = 3;
      sum += parseFloat(final);
    }
    const avg = sum / period;
    let grade = parseFloat(avg.toFixed(2));

    if (grade > 97.5) {
      return '1.00';
    } else if (grade > 94.5) {
      return '1.25';
    } else if (grade > 91.5) {
      return '1.50';
    } else if (grade > 88.5) {
      return '1.75';
    } else if (grade > 85.5) {
      return '2.00';
    } else if (grade > 82.5) {
      return '2.25';
    } else if (grade > 79.5) {
      return '2.50';
    } else if (grade > 76.5) {
      return '2.75';
    } else if (grade > 74.5) {
      return '3.00';
    } else if (grade > 0) {
      return '5.00';
    } else {
      return '';
    }
  };

  convertGrade = (grade: number) => {
    if (grade > 97.5) {
      return '1.00';
    } else if (grade > 94.5) {
      return '1.25';
    } else if (grade > 91.5) {
      return '1.50';
    } else if (grade > 88.5) {
      return '1.75';
    } else if (grade > 85.5) {
      return '2.00';
    } else if (grade > 82.5) {
      return '2.25';
    } else if (grade > 79.5) {
      return '2.50';
    } else if (grade > 76.5) {
      return '2.75';
    } else if (grade > 74.5) {
      return '3.00';
    } else if (grade > 0) {
      return '5.00';
    } else {
      return '';
    }
  };

  convertDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (date.getFullYear() > 2022) {
      return this.datePipe.transform(date, 'MMMM d, y');
    }
    return '';
  };

  onChangeSchoolYear = (schoolYear: string) => {
    const split = schoolYear.split('-');
    if (schoolYear != '') {
      this.grades.filter(
        (grade: any) => grade.yearLevel == split[0] && grade.sem == split[1]
      );
    } else {
      this.getGradesByStudentId();
    }
  };

  onReset = () => {
    this.getGradesByStudentId();
  };
}
