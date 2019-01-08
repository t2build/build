import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-manage-deployment',
  templateUrl: './manage-deployment.component.html',
  styleUrls: ['./manage-deployment.component.css']
})
export class ManageDeploymentComponent {


   private itemsCollection: AngularFirestoreCollection<any>;
   deployment$;

  constructor(private afs: AngularFirestore ) {
    this.itemsCollection = this.afs.collection<any>('/deploy', ref => ref.orderBy('displayName'));
    this.deployment$ = this.itemsCollection.snapshotChanges()
        .pipe(map(actions => {
          return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
      }));
  }

  removeProjectFromDeployment(project) {
    this.itemsCollection.doc(project.$key).delete();
  }

  removeAllProjectsFromDeployment() {
  }

}
