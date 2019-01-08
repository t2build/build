import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  projects$;
  subscription: Subscription;
  selectedItems = [];
  dropdownSettings = {};
  private itemsCollection: AngularFirestoreCollection<any>;
  private itemsCollectionDeploy: AngularFirestoreCollection<any>;
  private feedbackCollection: AngularFirestoreCollection<any>;


  constructor(private afs: AngularFirestore) {
    this.itemsCollection = this.afs.collection<any>('/projects', ref => ref.orderBy('displayName'));
    this.itemsCollectionDeploy = this.afs.collection<any>('/deploy', ref => ref.orderBy('displayName'));
    this.feedbackCollection = this.afs.collection<any>('/feedback');
    this.projects$ = this.itemsCollection.snapshotChanges()
        .pipe(map(actions => {
          return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
      }));
  }

  ngOnInit () {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'deployName',
      textField: 'displayName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      searchPlaceholderText: 'Search Project'
    };
  }

  addProjectsToDeploy() {
    if (this.selectedItems.length === 0) {
      window.alert('Please selact atleast one project to deploy.');
    } else {

      this.selectedItems.forEach( (project) => {
        this.itemsCollectionDeploy.add(project);
      });
      this.selectedItems = [];
    }
  }

  upVote() {

    let currentUpvote = 0;

    this.feedbackCollection.doc(`chat`).ref.get().then((doc) => {
      currentUpvote = doc.data().upVote;
    });
    this.feedbackCollection.doc(`chat`).update({downVote:5});
  }

  downVote()  {

  }
}
