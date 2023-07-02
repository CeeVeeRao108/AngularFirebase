import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css'],
})
export class TutorialsListComponent implements OnInit {
  winners: Tutorial[] = [];

  tutorials?: Tutorial[];
  filteredTutorials?: Tutorial[];
  currentTutorial: Tutorial = {};
  currentIndex = -1;
  title = '';
  filterValue = '';

  constructor(private tutorialService: TutorialService) {}

  ngOnInit(): void {
    this.retrieveTutorials();
    this.applyFilter();
  }

  retrieveTutorials(): void {
    this.tutorialService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.tutorials = data;
      });
  }

  setActiveTutorial(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  applyFilter(): void {
    const scoreFilterValue = this.filterValue;

    if (scoreFilterValue) {
      this.filteredTutorials =
        this.tutorials?.filter((tutorial: Tutorial) => {
          if (tutorial.score !== undefined && tutorial.age !== undefined) {
            return (
              Number(tutorial.score) === Number(scoreFilterValue) &&
              Number(tutorial.age) < 21
            );
          }
          return false;
        }) || [];
    } else {
      this.filteredTutorials = this.tutorials;
    }
  }
}
