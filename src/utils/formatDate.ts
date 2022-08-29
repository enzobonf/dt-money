export const formatDate = (date: Date | string): string => {
  return new Intl.DateTimeFormat("pt-br").format(new Date(date));
};
