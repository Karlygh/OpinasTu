import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-soundtracks',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './soundtracks.component.html',
  styleUrl: './soundtracks.component.css'
})
export class SoundtracksComponent {

}
