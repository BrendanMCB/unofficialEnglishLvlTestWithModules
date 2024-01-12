import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent implements OnInit {

  public name : string ="";
  public questionList : any = [];
  public currentQuestion: number = 0;
  public points: number = 0;
  correctAnswer:number = 0;
  incorrectAnswer: number = 0;
  interval$: any;
  progress:string="0";
  isTestCompleted: boolean = false;
  finalGradeResult: string ="";
  letters: string[] = ["A","B","C","D"];

constructor(private questionService : QuestionService) {}

ngOnInit(): void {
  this.name = localStorage.getItem("name")!;
  this.getAllQuestions();
}
getAllQuestions(){
  this.questionService.getQuestionJson()
  .subscribe(res=>{
    this.questionList = res.questions;
  })
}
nextQuestion(){
this.currentQuestion++;
}
previousQuestion(){
this.currentQuestion--;
}
answer(currentQno: number, option:any){
  if (currentQno === this.questionList.length){
    this.isTestCompleted = true;
    
  }
  if(option.correct){
    this.points+=10;
    this.correctAnswer++;
    setTimeout(() =>{
      this.currentQuestion++;
      this.getProgressPercent();
    }, 1000)
    
  } else{
    setTimeout(() => {
      this.currentQuestion++;
      this.incorrectAnswer++;
      this.getProgressPercent();
    }, 1000)
    
    this.points-=10;
  }
  this.finalGrade()
}
getProgressPercent(){
  this.progress = ((this.currentQuestion/this.questionList.length)*100).toString();
  return this.progress;
}
finalGrade(){
if (this.points <= 50){
  this.finalGradeResult="A1"
}
else if (this.points >= 51 && this.points < 100){
  this.finalGradeResult="A2"
}
else if (this.points >= 100 && this.points < 150){
  this.finalGradeResult="B1"
}
else if (this.points >= 150 && this.points < 200 ){
  this.finalGradeResult="B2"
}
else if (this.points >= 200 && this.points < 250 ){
  this.finalGradeResult="C1"
}
else if (this.points >= 250){
  this.finalGradeResult="C2"
}
}





}
