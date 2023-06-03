import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Advisory } from 'src/app/models/advisory';
import { AdvisoryService } from 'src/app/services/advisory.service';
import { MatSnackBar,MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-list-advisory',
  templateUrl: './list-advisory.component.html',
  styleUrls: ['./list-advisory.component.css']
})
export class ListAdvisoryComponent implements OnInit {

  displayedColumns: string[] = [
    'idAdvisory',
    'student',
    'teacher',
    'serviceType',
    'date',
    'actions',
  ];
  dataSource = new MatTableDataSource<Advisory>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private advisoryService: AdvisoryService,private snackBar: MatSnackBar) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getAdvisorys();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAdvisorys(): void {
    this.advisoryService.getAdvisories().subscribe({
      next: (data: Advisory[]) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      },
    });
  }

  deleteAdvisory(id: number): void {
    this.advisoryService.deleteAdvisory(id).subscribe({
      next: () => {
        this.getAdvisorys();
      },
    });
  }
  openSnackBar(
    message: string,
    action: string
  ): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  convertDate(date: any) {
    return moment(date).format("DD-MM-YYYY HH:mm");
  }
  reporte(){
    this.advisoryService.exportAdvisory().subscribe(
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
