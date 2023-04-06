export default function intDateToString(intDate) {
  let str = intDate.toString();
  if(str.length == 5) str = `0${str}`;
  str = `${str.substring(0, 2)}/${str.substring(2,4)}/${str.substring(4, 6)}`;
  return str;
}