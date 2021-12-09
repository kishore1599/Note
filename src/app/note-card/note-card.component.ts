import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild,  } from '@angular/core';


@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements AfterViewInit {

  @Input()
  title!: string;
  @Input()
  body!: string;
  @Input()
  link!: string;

  @Output('delete') deleteEvent:EventEmitter<void> = new EventEmitter();

  @ViewChild('truncator', { static: true })
  truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText', { static: true })
  bodyText!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    // work out if there is a text overflow and if not , then hide the truncator

    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let ViewableHeight = parseInt(style.getPropertyValue("height"), 10);

    if (this.bodyText.nativeElement.scrollHeight > ViewableHeight){
      //if there is a text overflow, show the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
    } else {
      //else (there is a text overflow), hide the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none')
    }
  }



  onXButtonClick(){
    this.deleteEvent.emit();
  }
}
