import dayjs from 'dayjs';

import { logger } from './helper';

export enum CalendarFormate {}

export enum DateFormate {
  DD_MM_YYY = 'DD-MM-YYYY',
  DD_MMM_YYY = 'DD-MMM-YYYY',
  SERVER_DATE = 'DD-MMM-YYYY',
  DISPLAY_DATE = 'DD-MMM-YYYY',
  DEFAULT = 'DD-MMM-YYYY',
}

export const getCurrentDate = ({
  formate = DateFormate.DEFAULT,
}: {
  formate?: DateFormate;
}) => {
  return dayjs().format(formate);
};

export const dateFormate = ({
  date,
  formate = DateFormate.DEFAULT,
}: {
  date: string | Date | dayjs.Dayjs;
  formate?: DateFormate;
}) => {
  try {
    return dayjs(date).format(formate);
  } catch (e) {
    logger(`Unable to convert date ${date} with ${formate} format due to ${e}`);
    return null;
  }
};

export const isBefore = ({
  date1,
  date2,
}: {
  date1: string | Date | dayjs.Dayjs;
  date2: string | Date | dayjs.Dayjs;
}) => {
  try {
    return dayjs(date1).isBefore(dayjs(date2));
  } catch (e) {
    logger(`Unable to check past date ${date1} - ${date2} due to ${e}`);
    return null;
  }
};

export const isAfter = ({
  date1,
  date2,
}: {
  date2: string | Date | dayjs.Dayjs;
  date1: string | Date | dayjs.Dayjs;
}) => {
  try {
    return dayjs(date1).isAfter(dayjs(date2));
  } catch (e) {
    logger(`Unable to check isAfter date ${date1} - ${date2} due to ${e}`);
    return null;
  }
};

export const isSame = ({
  date1,
  date2,
  formate = DateFormate.DEFAULT,
}: {
  date1: string | Date | dayjs.Dayjs;
  date2: string | Date | dayjs.Dayjs;
  formate: DateFormate;
}) => {
  try {
    return dayjs(dateFormate({ date: date1, formate: formate })).isSame(
      dayjs(dateFormate({ date: date1, formate: formate }))
    );
  } catch (e) {
    logger(`Unable to check isSame date ${date1} - ${date2} due to ${e}`);
    return null;
  }
};
