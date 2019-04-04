import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 's2si-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, OnChanges {

  @Input() fullname = '';
  @Input() size = 1;
  @Input() largeCdn = '';
  @Input() smallCdn = '';
  @Input() bgColor = '#fff';
  @Input() fgColor = '#673ab7';

  cdn = '';
  initials = 'NA';
  imgerror = false;

  constructor() { }

  ngOnInit() {
    this.generateInitials();
    this.tryImageLoad();
  }

  ngOnChanges(changes: SimpleChanges) {
    const fullnameChange: SimpleChange = changes.fullname;
    if (fullnameChange) {
      this.fullname = fullnameChange.currentValue;
      this.generateInitials();
    }

    const smallCdnChange: SimpleChange = changes.smallCdn;
    let imgChange = false;
    if (smallCdnChange) {
      this.smallCdn = smallCdnChange.currentValue;
      imgChange = true;
    }
    const largeCdnChange: SimpleChange = changes.largeCdn;
    if (largeCdnChange) {
      this.largeCdn = largeCdnChange.currentValue;
      imgChange = true;
    }
    if (imgChange) {
      this.tryImageLoad();
    }
  }

  private generateInitials() {
    const letter1Arr = /^(.)/i.exec(this.fullname);
    const letter2Arr = /.*\s(.)/i.exec(this.fullname);
    this.initials = (letter1Arr ? letter1Arr[1].toUpperCase() : 'N') + (letter2Arr ? letter2Arr[1].toUpperCase() : 'A');
  }

  private tryImageLoad() {
    this.cdn = this.smallCdn;
    if (this.smallCdn === '' || this.smallCdn === null) {
      this.cdn = this.largeCdn;
      if (this.largeCdn === '' || this.largeCdn === null) {
        this.imgerror = true;
      }
    }
    if (this.size > 10 && this.largeCdn !== '' && this.largeCdn !== null) {
      // If size is large, try and load largeCdn
      this.cdn = this.largeCdn;
    }
  }

  error(event: Event) {
    this.imgerror = true;
  }

}
