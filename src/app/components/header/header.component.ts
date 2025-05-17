import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-header',
    imports: [CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
}
