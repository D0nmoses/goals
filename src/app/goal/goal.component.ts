import { Component, OnInit } from '@angular/core';
import { GoalService } from '../goal-service/goal.service';
import { Goal } from '../goal';
import { AlertService } from '../alert-service/alert.service';
import { HttpClient } from '@angular/common/http'
import { Quote } from '../quote-class/quote'
import { QuoteRequestService } from '../quote-http/quote-request.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  goals:Goal[];
  alertService:AlertService;
  quote:Quote;
  
  

  constructor(alertService:AlertService,private goalService:GoalService,private quoteService:QuoteRequestService) {
    this.alertService = alertService;
  }
  getGoals(): void {
    this.goals = this.goalService.getGoals();
  }

  toggleDetails(index){
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }

  completeGoal(isComplete, index){
    if (isComplete) {
      this.goals.splice(index,1);
    }
  }
  deleteGoal(isComplete, index){
    if (isComplete) {
      let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)

      if (toDelete){
        this.goals.splice(index,1);
        this.alertService.alertMe("The goal has been deleted");
      }
    }
  }
  
  addNewGoal(goal){
    let goalLength = this.goals.length;
    goal.id = goalLength+1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }

  ngOnInit() {
    this.getGoals();

    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote
  }

}
