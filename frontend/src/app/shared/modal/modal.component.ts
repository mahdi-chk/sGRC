import { AfterContentInit, Component, ContentChild, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements AfterContentInit {
  @Input() title = '';
  @Input() body = '';
  @Output() close = new EventEmitter<void>();

  @ContentChild('projected', { read: ElementRef }) projectedContent: ElementRef | null = null;
  hasProjectedContent = false;
  hasProjectedFooter = false;

  ngAfterContentInit(): void {
    this.hasProjectedContent = !!this.projectedContent;
    // footer detection isn't strict here; it's fine to leave false when not projected
  }

  onClose() {
    this.close.emit();
  }
}
