import {Directive, effect, ElementRef} from "@angular/core";

@Directive({
    standalone: true,
    selector: "[editRowFocus]"
})
export class EditRowFocusDirective {
    constructor(private readonly el: ElementRef<HTMLElement>) {
        effect(() => setTimeout(() => {
                this.el.nativeElement.focus(
                    {
                        preventScroll: true
                    }
                );
            })
        );
    }
}