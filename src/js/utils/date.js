export function agoDate (days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  const newDate = date.toISOString().substr(0, 10);
  return newDate;
}

function numberToMonth(x) {
  var month;
  switch (x) {
    case '01':
      month = 'января';
      break;
    case '02':
      month = 'февраля';
      break;
    case '03':
      month = 'марта';
      break;
    case '04':
      month = 'апреля';
      break;
    case '05':
      month = 'мая';
      break;
    case '06':
      month = 'июня';
      break;
    case '07':
      month = 'июля';
      break;
    case '08':
      month = 'августа';
      break;
    case '09':
      month = 'сентября';
      break;
    case '10':
      month = 'октября';
      break;
    case '11':
      month = 'ноября';
      break;
    case '12':
      month = 'декабря';
      break;
    default:
      month = '??'
   }
   return month;
}

export function dateForCard(date) {
  const splitDate = date.split('-');
  const monthName = numberToMonth(splitDate[1]);
  const newDate = `${splitDate[2]} ${monthName}, ${splitDate[0]}`;
  return newDate;
}
