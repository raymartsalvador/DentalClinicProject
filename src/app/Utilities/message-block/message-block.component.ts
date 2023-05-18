import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-block',
  templateUrl: './message-block.component.html',
  styleUrls: ['./message-block.component.scss']
})
export class MessageBlockComponent {
  @Input() showMessageBlock: boolean = false;
  @Input() message: string = '';
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  close(): void {
    this.onClose.emit();
  }
}
