import { Block } from "../../utils/Block";
import template from "./labelInput.hbs";
import { validate, ValidationFields } from "../../utils/Validate";

interface ILabelInputProps {
  label?: string;
  validation?: ValidationFields;
}

export class LabelInput extends Block {
  constructor({ label = "", validation, ...props }: ILabelInputProps) {
    super({
      ...props,
      label,
      onBlur: (e: FocusEvent) => {
        const target = e.target as HTMLInputElement;
        const value = target.value;

        if (validation) {
          const [isValid, message] = validate(value, validation);

          this.setProps({
            error: !isValid ? message : "",
            value,
          });
        }
      },
    });
  }

  render() {
    return this.compile(template, {
      ...this.props,
      label: this.props.label,
      error: this.props.error,
      children: this.children,
      onBlur: this.props.onBlur,
    });
  }
}
