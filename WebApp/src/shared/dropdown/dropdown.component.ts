import {
	Component,
	ContentChild,
	ElementRef,
	forwardRef,
	HostListener,
	Input,
	OnInit,
	TemplateRef,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DropdownOptionDirective } from "./dropdown-option.directive";
import { DropdownSelectedDirective } from "./dropdown-selected.directive";

@Component({
	selector: "app-dropdown",
	templateUrl: "./dropdown.component.html",
	styleUrls: ["./dropdown.component.scss"],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => DropdownComponent),
			multi: true,
		},
	],
})
export class DropdownComponent<T> implements OnInit, ControlValueAccessor {
	@Input() options: Array<T> = [];
	@Input() disabled: boolean = false;
	@Input() name: string;

	@ContentChild(DropdownSelectedDirective, { read: TemplateRef })
	dropdownSelectedTemplate: TemplateRef<DropdownSelectedDirective>;
	@ContentChild(DropdownOptionDirective, { read: TemplateRef })
	dropdownOptionTemplate: TemplateRef<DropdownOptionDirective>;

	showDropdown: boolean = false;
	selected: T;

	constructor(private element: ElementRef) {}

	@HostListener("document:click", ["$event"])
	clickOutside(event: Event): void {
		if (!this.element.nativeElement.contains(event.target)) {
			this.showDropdown = false;
		}
	}

	@Input() public set value(value: T) {
		if (!this.disabled) {
			this.selected = value;
			this.onChange(value);
		}
	}

	public get value(): T {
		return this.selected;
	}

	public onChange: any = () => {};
	public onTouch: any = () => {};

	ngOnInit(): void {}

	writeValue(obj: T): void {
		this.value = obj;
	}

	registerOnChange(fn: T): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: T): void {
		this.onTouch = fn;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	setOption(option: T): void {
		this.writeValue(option);
	}
}
