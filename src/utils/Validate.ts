export enum ValidationFields {
  Email = "email",
  Name = "name",
  Login = "login",
  Password = "password",
  Phone = "phone",
  Message = "message",
}

export const validate = (
  value: string,
  field: ValidationFields
): [boolean, string] => {
  const validationFields = {
    email: {
      // eslint-disable-next-line max-len
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Некорректный email",
    },
    name: {
      reg: /^[A-ZА-Я][a-zа-я-]{3,}$/,
      message: "Должно начинаться с заглавной буквы",
    },
    login: {
      reg: /^[a-zA-Z][a-zA-Z0-9_-]{3,}$/,
      message: "Минимум 3 символа без пробелов",
    },
    password: {
      reg: /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      message: "Минимум 8 символов, 1 заглавная буква и 1 цифра",
    },
    phone: {
      reg: /\+?[0-9]{10,15}/,
      message: "Некорректный номер телефона",
    },
    message: {
      reg: /^[\s\S]/,
      message: "Поле не должно быть пустым",
    },
  };

  return [
    validationFields[field].reg.test(value),
    validationFields[field].message,
  ];
};
