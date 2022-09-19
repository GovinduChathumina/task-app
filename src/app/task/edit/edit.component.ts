import { Component, OnInit } from '@angular/core';

import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Task } from '../task';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

    id!: number;
    task!: Task;
    form!: FormGroup;

    constructor(
        public taskService: TaskService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.taskService.find(this.id).subscribe((data: Task)=>{
          this.task = data;
          console.log(this.task);
      });

      this.form = new FormGroup({
          title:  new FormControl('', [ Validators.required ]),
          description:  new FormControl('', [ Validators.required ]),
          days:  new FormControl(''),
          start_date:  new FormControl(formatDate(new Date(), "yyyy-MM-dd", "en"), [ Validators.required ]),
          end_date:  new FormControl('')
      });
    }

    get f() {
        return this.form.controls;
    }

    addBusinessDaysToDate(date:Date, days:number) {
        var day = date.getDay();
        date = new Date(date.getTime());
        date.setDate(date.getDate() + days + (day === 6 ? 2 : +!day) + (Math.floor((days - 1 + (day % 6 || 1)) / 5) * 2));
        return date;
    }
    
    getEndDate(date:Date, days:number){
        console.log(date,days);
        
        var newDate = this.addBusinessDaysToDate(date, days);
        this.form.value.end_date = newDate;
        console.log(newDate.toString().replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, '$2-$1-$3')); // alerts "28-Dec-2011"
    }

    submit() {
        this.getEndDate(new Date(this.form.value.start_date),this.form.value.days);
        this.taskService.update(this.id, this.form.value).subscribe(res => {
            this.router.navigateByUrl('task/index');
        })
    }
}
