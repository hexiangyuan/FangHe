function getDay(day: number): string {
  const today = new Date();
  const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds); // 注意，这行是关键代码

  // const tYear = today.getFullYear();
  let tMonth = today.getMonth();
  let tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tMonth + "-" + tDate;
}

function doHandleMonth(month) {
  let m = month;
  if (month.toString().length === 1) {
    m = "0" + month;
  }
  return m;
}

export function getDateList(day: number): Array<string> {
  return [...new Array(day).keys()].map(item => {
    return getDay(item);
  });
}

export function getCurrentHouseFloor(): Array<string> {
  const currentDate = new Date();
  const hours = currentDate.getHours();
  const leftHours = 24 - hours - 1;
  return [...new Array(leftHours).keys()].map(item => `${hours + item + 1}:00-${hours + item + 2}:00`);
}

export function getHoursTotalDay(): Array<string> {
  return [...new Array(24).keys()].map(item => `${item}:00-${item + 1}:00`);
}
