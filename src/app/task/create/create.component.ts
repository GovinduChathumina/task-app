import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

    form: any;

    constructor(
        public taskService: TaskService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.form = new FormGroup({
            title:  new FormControl('', [ Validators.required ]),
            description:  new FormControl('', [ Validators.required ]),
            start_date:  new FormControl('', [ Validators.required ]),
            end_date:  new FormControl('')
        });
    }

    get f() {
        return this.form.controls;
    }

    submit() {
        console.log(this.form.value);
        this.taskService.create(this.form.value).subscribe(res => {
            this.router.navigateByUrl('task/index');
        })
    }
}

