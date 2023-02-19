export const getFirstFile = (file: HTMLInputElement): File => {
  const firstFileNumber = 0;

  return file.files![firstFileNumber];
};
