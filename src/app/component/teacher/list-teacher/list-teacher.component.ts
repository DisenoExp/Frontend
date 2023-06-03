import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar,MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Teacher } from 'src/app/models/teacher';
import { TeacherService } from 'src/app/services/teacher.service';
@Component({
  selector: 'app-list-teacher',
  templateUrl: './list-teacher.component.html',
  styleUrls: ['./list-teacher.component.css'],
})
export class ListTeacherComponent implements OnInit {
  displayedColumns: string[] = [
    'idTeacher',
    'firstName',
    'lastName',
    'dni',
    'email',
    'cellphone',
    'actions',
  ];
  dataSource = new MatTableDataSource<Teacher>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private teacherService: TeacherService,private snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getTeachers();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  getTeachers(): void {
    this.teacherService.getTeachers().subscribe({
      next: (data: Teacher[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  deleteTeacher(id: number): void {
    this.teacherService.deleteTeacher(id).subscribe({
      next: () => {
        this.getTeachers();
      },
    });
  }
  reporte(){
    this.teacherService.exportTeacher().subscribe(
      (data: any) => {
        let file = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        let fileUrl = URL.createObjectURL(file);
        var anchor = document.createElement('a');
        anchor.download = 'products.xlsx';
        anchor.href = fileUrl;
        anchor.click();

        this.openSnackBar('Archivo exportado correctamente', 'Exitosa');
      },
      (error: any) => {
        this.openSnackBar('No se pudo exportar el archivo', 'Error');
      }
    );
  }
}