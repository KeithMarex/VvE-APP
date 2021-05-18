import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-vves-svg',
    templateUrl: './vves.svg',
    styleUrls: ['./vves.component.scss']
})

export class VveSvgComponent implements OnInit {
    fillColor = 'rgb(255, 0, 0)';

    constructor(
        private router: Router
    ) {}

    ngOnInit(): void {
        //TODO assign proper css class
    }

    logActive()
    {
        console.log(this.router.url);
    }
}
