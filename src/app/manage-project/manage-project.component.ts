import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css']
})
export class ManageProjectComponent {
  private itemsCollection: AngularFirestoreCollection<any>;
  deployment$;

  form = new FormGroup({
    displayName: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
    deployName: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(5)])
  });

 constructor(private afs: AngularFirestore ) {
   this.itemsCollection = this.afs.collection<any>('/projects', ref => ref.orderBy('displayName'));
   this.deployment$ = this.itemsCollection.snapshotChanges()
       .pipe(map(actions => {
         return actions.map(action => ({ $key: action.payload.doc.id, ...action.payload.doc.data() }));
     }));
 }

 addNewProject() {
  if (this.form.valid) {
    this.itemsCollection.add({ 'displayName': this.form.value.displayName, 'deployName': this.form.value.deployName});

  } else {
    this.form.get('displayName').setErrors({
      buttonClick: true
    });
    this.form.get('deployName').setErrors({
      buttonClick: true
    });
  }


  this.form.controls['displayName'].setValue(null);
  this.form.controls['deployName'].setValue(null);

 }


 removeProjectFromDeployment(project) {
   this.itemsCollection.doc(project.$key).delete();
 }
}
