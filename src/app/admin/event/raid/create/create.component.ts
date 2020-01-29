import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateRaidEventComponent implements OnInit {

  raid: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.raid = this.formBuilder.group({
      'key': '',
      'name': '',
      'start_date_time': '',
      'finish_date_time': '',
      'instances': this.formBuilder.array([])
    });
  }

  createInstanceFormGroup(): FormGroup {
    return this.formBuilder.group({
      'key': '',
      'name': '',
      'start_date_time': '',
      'finish_date_time': '',
      'bosses': this.formBuilder.array([])
    });
  }

  createBossFormGroup(): FormGroup {
    return this.formBuilder.group({
      'key': '',
      'name': '',
      'start_date_time': '',
      'finish_date_time': ''
    });
  }

  addInstanceFormGroup() {
    (this.raid.get('instances') as FormArray).push(this.createInstanceFormGroup());
  }

  addBossFormGroup(instance: number) {
    ((this.raid.get('instances') as FormArray).controls[instance].get('bosses') as FormArray).push(this.createBossFormGroup());
  }

  onSubmit() {
    console.log(this.raid.value);
  }

}
