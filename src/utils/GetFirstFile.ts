export const getFirstFile = (file: HTMLInputElement): File | undefined => {
  const firstFileNumber = 0;

  return file.files![firstFileNumber];
};
