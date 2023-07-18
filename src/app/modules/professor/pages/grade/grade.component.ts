import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SelectItemGroup } from 'primeng/api';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component';
import { UploadDialogComponent } from '../../components/upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss'],
})
export class GradeComponent {
  students = [
    {
      name: 'Mark Denver Perez',
      section: 'BSIT21A',
      grade: '1.00',
      remarks: 'Passed',
    },
    {
      name: 'Simon James Villarin',
      section: 'BSIT21A',
      grade: '1.25',
      remarks: 'Passed',
    },
    {
      name: 'Andrei Ember San Miguel',
      section: 'BSIT21A',
      grade: '3.00',
      remarks: 'Conditional',
    },
  ];
  groupedSections: SelectItemGroup[];
  subjects = [
    { name: 'Intro to Programming' },
    { name: 'Ethics I' },
    { name: 'Data Structures' },
  ];
  selectedSection: string | undefined;
  selectedSubject: string | undefined;

  isShowDropdown = false;
  isShowMobileNav = false;
  isShowNotifications = false;

  constructor(private editDialog: MatDialog, private uploadDialog: MatDialog) {
    // Populate this with Programs where the professor teach
    this.groupedSections = [
      {
        label: 'BSIT',
        value: 'BSIT',
        // Populate this with Sections where the professor teach
        items: [
          { label: 'BSIT11A', value: 'BSIT11A' },
          { label: 'BSIT12A', value: 'BSIT12A' },
          { label: 'BSIT13A', value: 'BSIT13A' },
        ],
      },
      {
        label: 'BSHM',
        value: 'BSHM',
        items: [
          { label: 'BSHM11A', value: 'BSHM11A' },
          { label: 'BSHM12A', value: 'BSHM12A' },
          { label: 'BSHM13A', value: 'BSHM13A' },
        ],
      },
      {
        label: 'BSTM',
        value: 'BSTM',
        items: [
          { label: 'BSTM11A', value: 'BSTM11A' },
          { label: 'BSTM12A', value: 'BSTM12A' },
          { label: 'BSTM13A', value: 'BSTM13A' },
        ],
      },
    ];
  }

  toggleShowDropdown = () => {
    this.isShowDropdown = !this.isShowDropdown;
    this.isShowMobileNav = false;
    this.isShowNotifications = false;
  };

  toggleShowNotifications = () => {
    this.isShowNotifications = !this.isShowNotifications;
    this.isShowMobileNav = false;
    this.isShowDropdown = false;
  };

  openMobileNav = () => {
    this.isShowMobileNav = true;
  };

  closeMobileNav = () => {
    this.isShowMobileNav = false;
  };

  onProgChange = (): void => {
    console.log(this.selectedSection);
    console.log(this.selectedSubject);
  };

  onClickEdit = () => {
    this.editDialog.open(EditDialogComponent, {
      width: '500px',
      height: '550px',
    });
  };

  onClickUpload = () => {
    this.uploadDialog.open(UploadDialogComponent, {
      width: '450px',
      height: '300px',
    });
  };
}