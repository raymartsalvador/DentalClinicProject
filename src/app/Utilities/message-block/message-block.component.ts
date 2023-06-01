import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-block',
  templateUrl: './message-block.component.html',
  styleUrls: ['./message-block.component.scss']
})
export class MessageBlockComponent implements OnInit{
  @Input() showMessageBlock: boolean = false;
  @Input() message: string = '';
  @Input() messageBlockType: string = '';
  isSuccessful: boolean = false;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    this.onIfSuccess();
  }

  onIfSuccess(){
    if(this.messageBlockType === 'success'){
      this.isSuccessful = true;
    }else{
      this.isSuccessful = false;
    }
  }


  close(): void {
    this.onClose.emit();
  }
}
