import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import { AngularFireDatabase } from 'angularfire2/database';
import {  FirebaseListObservable } from 'angularfire2';
import { FireSave } from '../models/fireSave';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class MembersComponent implements OnInit { 
  calcStore: FirebaseListObservable<any[]>;
  name: any;
  state: string = '';
  num1: number;
  num2: number;
  result: any;
  selectedAlgo: any;
  model : any;
  memberBool: boolean;
  historyResult: any;

  constructor(public af: AngularFire,private router: Router,public db: AngularFireDatabase) {
    this.memberBool = false;
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });
    this.calcStore = af.database.list('/fireCalc');
   console.log(this.calcStore);
  }


//Using Normal to calculate GCD
  lcm_time(formData) {
    let x =formData.value.num1;
    let y = formData.value.num2;
    console.log(typeof y);
   this.result=(!x || !y) ? 0 : Math.abs((x * y) / this.gcd_two_numbers(x, y));
   this.pushToDb(x,y,"Time",this.result);
   console.log(this.result);
 }
 
  gcd_two_numbers(x, y) {
   x = Math.abs(x);
   y = Math.abs(y);
   while(y) {
     var t = y;
     y = x % y;
     x = t;
   }
   return x;
 }

  
 //Using Euclid's method to calculate GCD 
 lcm_optimal(formData2) {
  let num1 =formData2.value.num1;
  let num2 = formData2.value.num2;
  var gcdGet = this.euclidGCD(num1, num2);
  this.result =((num1 * num2)/gcdGet);
  this.pushToDb(num1,num2,"Optimal",this.result);
}

  euclidGCD (a, b) {
  if (b == 0) return a;
  return this.euclidGCD(b, a%b);
}

//Using looping
lcm_space(formData3) {
  let n1 =formData3.value.num1;
  let n2 = formData3.value.num2;
  let max = (n1 > n2) ? n1 : n2;

  // Always true
  while(true)
  {
      if( max % n1 == 0 && max % n2 == 0 )
      {
          this.result=max;
          break;
      }
      ++max;
  }
  this.pushToDb(n1,n2,"SPACE",this.result);
}

changeDropdown() {
  this.result=0;
}

pushToDb(num1,num2, algorithm,result) {
  this.model = new FireSave();
  this.model.num1 = num1;
  this.model.num2 = num2;
  this.model.algorithm = algorithm;
  this.model.result = result;
  this.calcStore.push(this.model);
  console.log(this.calcStore);
}

  logout() {
     this.af.auth.logout();
     this.router.navigateByUrl('/login');
     this.result=0;
  }

  history() {
    this.memberBool = true;
    this.result=0;
    this.calcStore.subscribe(res=>this.historyResult =res);
  }

  goBack() {
    this.memberBool = false;
    this.result=0;
  }


  ngOnInit() {
    this.selectedAlgo="Time";
  }
}
