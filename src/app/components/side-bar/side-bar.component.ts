import { Component } from '@angular/core'
import { IconDefinition, faCircleDot, faCloud } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  public links: {path: string, label: string, icon: IconDefinition}[] = [
    { path: '/equipment', label: 'Equipment', icon: faCloud },
    { path: '/point', label: 'Point', icon: faCircleDot },
  ]

  constructor() {}
}
