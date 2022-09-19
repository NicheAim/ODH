export function getTodayWithoutHours() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth(); // values from 0 (jan) - 11 (dec)
  const day = now.getDate(); // values from 1 - 31
  const hours = 0;
  const minutes = 0;
  const seconds = 0;

  return new Date(year, month, day, hours, minutes, seconds);
}

export function parseStringToDate(stringDate) {
  const splitedText = stringDate.split(/[-\s:T+]/g);
  let year = 2000;
  let month = 0; // values from 0 (jan) - 11 (dec)
  let day = 1; // values from 1 - 31
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (splitedText.length >= 6) {
    let date = new Date(stringDate);
    date.toLocaleDateString('en-US');

    return date;
  }

  if (splitedText.length >= 3) {
    year = parseInt(splitedText[0]);
    month = parseInt(splitedText[1]) - 1; // values from 0 (jan) - 11 (dec)
    day = parseInt(splitedText[2]); // values from 1 - 31
  }

  return new Date(year, month, day, hours, minutes, seconds);
}

export function parseStringUsFormatToDate(stringDate) {
  const splitedText = stringDate.split(/[\/+]/g);
  let year = 2000;
  let month = 0; // values from 0 (jan) - 11 (dec)
  let day = 1; // values from 1 - 31
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  if (splitedText.length === 3) {
    year = parseInt(splitedText[2]);
    month = parseInt(splitedText[0]) - 1; // values from 0 (jan) - 11 (dec)
    day = parseInt(splitedText[1]); // values from 1 - 31
    const parsedDate = new Date(year, month, day, hours, minutes, seconds);
    return parsedDate;
  }

  return undefined;
}

export function dateTimeZoneET(date) {
  return new Date(date).toLocaleString('en-US', { timeZone: 'America/New_York' });
}
