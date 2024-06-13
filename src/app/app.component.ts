import { CommonModule, JsonPipe } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined; //preferred method
  employeeObj: Employee = new Employee(); //object of class
  employeeList: Employee[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('crud');
    if (localData != null) {      
      this.employeeList = JSON.parse(localData);
    }
  }

  //doc.get method ho yo
  openModel() {
    const model = document.getElementById('myModal'); //doc.get method is equivalent to this model
    if (model != null) {
      model.style.display = 'block';
    }
  }

  //viewchild method bata ho yo
  closeModel() {
    this.employeeObj = new Employee();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  saveEmployee() {
    const isLocalPresent = localStorage.getItem('crud');
    if (isLocalPresent != null) {
      const oldArr = JSON.parse(isLocalPresent); //property or obj form ma lana use gareko parse
      this.employeeObj.id = oldArr.length + 1;
      oldArr.push(this.employeeObj);
      this.employeeList = oldArr;
      localStorage.setItem('crud', JSON.stringify(oldArr));
    } 
    else {
      const newArr = [];
      newArr.push(this.employeeObj);
      this.employeeObj.id = 1;
      this.employeeList = newArr;
      localStorage.setItem('crud', JSON.stringify(newArr)); //string form ma lana use gareko stringify
    }
    this.closeModel();
  }

  updateEmployee() {
    const currentRecord = this.employeeList.find(
      (m) => m.id === this.employeeObj.id
    );
    if (currentRecord != undefined) {
      currentRecord.name = this.employeeObj.name;
      currentRecord.mobileNumber = this.employeeObj.mobileNumber;
      currentRecord.email = this.employeeObj.email;
      currentRecord.address = this.employeeObj.address;
    }
    localStorage.setItem('crud', JSON.stringify(this.employeeList));
    this.closeModel();
  }

  onEdit(item: Employee) {
    this.employeeObj = item;
    this.openModel();
  }

  onDelete(item: Employee) {
    const isDelete = confirm('Really??');
    if (isDelete) {
      const currentRecord = this.employeeList.findIndex(
        (m) => m.id === this.employeeObj.id
      );
      this.employeeList.splice(currentRecord, 1);
      localStorage.setItem('crud', JSON.stringify(this.employeeList));
    }
  }
}

export class Employee {
  //class ko garda jaile contructor create garne
  id: number;
  name: string;
  mobileNumber: string;
  address: string;
  email: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.mobileNumber = '';
    this.address = '';
    this.email = '';
  }
}
