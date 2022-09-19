import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    task: Task[] = [];

    constructor(
        public taskService: TaskService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.taskService.getAll().subscribe((data: Task[])=>{
        this.task = data;
        })
    }

    delete(id:any){
        this.taskService.delete(id).subscribe(res => {
            this.task = this.task.filter(item => item.id !== id);
            this.router.navigateByUrl('task/index');
            console.log('Task deleted successfully!');
        })
    }
}
