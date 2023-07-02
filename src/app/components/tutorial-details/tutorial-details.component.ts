import {
  Component,
  OnInit,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css'],
  inputs: ['viewMode'],
})
export class TutorialDetailsComponent implements OnInit, OnChanges {
  @Input() tutorial?: Tutorial;
  @Input() viewMode: boolean = false;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Tutorial = {
    name: '',
    score: 0,
    age: 0,
    winner: false,
  };
  message = '';

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentTutorial = { ...this.tutorial };
  }

  updatePublished(status: boolean): void {
    const data = {
      name: this.currentTutorial.name,
      age: this.currentTutorial.age,
      score: this.currentTutorial.score,
    };
    if (this.currentTutorial) {
      this.tutorialService.create2(this.currentTutorial).then(() => {
        console.log('Created new item successfully!');
      });
    }
    if (this.currentTutorial.id) {
      this.tutorialService
        .update(this.currentTutorial.id, { winner: status })
        .then()
        .then(() => {
          this.currentTutorial.winner = status;
          this.message = 'The status was updated successfully!';
        })
        .catch((err) => console.log(err));
    }
  }

  updateTutorial(): void {
    const data = {
      name: this.currentTutorial.name,
      age: this.currentTutorial.age,
      score: this.currentTutorial.score,
    };

    if (this.currentTutorial.id) {
      this.tutorialService
        .update(this.currentTutorial.id, data)
        .then(() => (this.message = 'The tutorial was updated successfully!'))
        .catch((err) => console.log(err));
    }
  }
}
