import {
  AfterContentInit,
  afterNextRender,
  afterRender,
  Component,
  contentChild,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control', // new
    '(click)': 'onClick()', // new & recommanded (listen to event on host element)
  },
})
export class ControlComponent implements AfterContentInit {
  // @HostBinding('class') className = 'control';  // old (usage compatibility)

  // old
  /*  @HostListener('click') onClick(){
    console.log('Clicked');
    } */
  label = input.required<string>();
  private el = inject(ElementRef);

  /* @ContentChild('input') private control?: ElementRef<
   HTMLInputElement | HTMLTextAreaElement
   >; */

  private control =
    contentChild.required<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(
      'input'
    );

  constructor() {
    afterRender(() => {
      console.log('🚀 ~ ControlComponent ~ afterRender ~ afterRender:');
    });

    afterNextRender(() => {
      console.log('🚀 ~ ControlComponent ~ afterNextRender ~ afterNextRender:');
    });
  }

  ngAfterContentInit(): void {}

  onClick() {
    console.log('Clicked');
    console.log(this.el);
    console.log(this?.control());
  }
}
