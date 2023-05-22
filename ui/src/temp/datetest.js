const addZero = number => {
  return number < 10 ? `0${number}` : number;
}

const dateFormat = date => {
  date = new Date(date);
  return `${addZero(date.getDate())}/${addZero(date.getMonth() + 1)}/${date.getFullYear()} ${addZero(date.getHours())}:${addZero(date.getMinutes())}`
}

console.log(dateFormat(new Date()));