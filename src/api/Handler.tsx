import React, { useState } from "react";
/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Date/Time handler function
 */

export function _dateToString(date: string | number | Date) {
  if (date) {
    let thisD, day, month, dateStr;
    thisD = new Date(date);
    day = thisD.getDate() > 9 ? thisD.getDate() : "0" + thisD.getDate();
    month = thisD.getMonth() + 1;
    dateStr = `${day} ${_getMonthFromNumber(month)} ${thisD.getFullYear()}`;
    return dateStr;
  }
}

export function _dateToAPI(date: string | number | Date) {
  if (date) {
    let thisD, day, month, dateStr;
    thisD = new Date(date);
    day = thisD.getDate() > 9 ? thisD.getDate() : "0" + thisD.getDate();
    month = thisD.getMonth() + 1;
    dateStr = `${thisD.getFullYear()}-${_get2DigitMonth(month)}-${day}`;
    return dateStr;
  }
}

export function _getMonthFromNumber(number: number) {
  switch (number) {
    case 1:
      return "มกราคม";
    case 2:
      return "กุมภาพันธ์";
    case 3:
      return "มีนาคม";
    case 4:
      return "เมษายน";
    case 5:
      return "พฤษภาคม";
    case 6:
      return "มิถุนายน";
    case 7:
      return "กรกฎาคม";
    case 8:
      return "สิงหาคม";
    case 9:
      return "กันยายน";
    case 10:
      return "ตุลาคม";
    case 11:
      return "พฤศจิกายน";
    case 12:
      return "ธันวาคม";
    default:
      console.log(number);
      return "Error Month";
  }
}

export function _getMonthFromNumberEng(number: number) {
  switch (number) {
    case 1:
      return "Jan";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Apr";
    case 5:
      return "May";
    case 6:
      return "June";
    case 7:
      return "July";
    case 8:
      return "Aug";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dec";
    default:
      console.log(number);
      return "Error Month";
  }
}

export function _get2DigitMonth(number: number) {
  switch (true) {
    case number <= 9:
      return `0${number}`;
    case number > 9:
      return number;
    default:
      return number;
  }
}

export function _getDifferenceDate(
  date1: string | number | Date,
  date2: string | number | Date
) {
  if (date1 && date2) {
    const thisDate1: any = new Date(date1);
    const thisDate2: any = new Date(date2);
    const diffTime = Math.abs(thisDate2 - thisDate1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } else {
    return "-";
  }
}

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Layout handler function
 */

export function _getWidth(
  width: number | string,
  minWidth: number | string | null = null
) {
  if (minWidth) {
    return { width: width, minWidth: minWidth };
  }
  return { width: width, minWidth: width };
}

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * String handler function
 */

export function _thousandSeperater(number: number) {
  if (number) {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return "0";
}

export function _capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Number handler function
 */

export function _checkIsNaN(value: any, newValue: any) {
  const val: any = parseInt(value);
  return !isNaN(val) ? val : newValue;
}

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Object and Array handler function
 */

export function _totalFromArray(array: any[], key: string) {
  let total: number = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i][key];
  }
  return total;
}

export function _totalFromArrayObj(
  array: any[],
  key: string,
  obj: { key: string; value: any }
) {
  let total: number = 0;
  for (let i = 0; i < array.length; i++) {
    total += array[i][obj.key] === obj.value ? array[i][key] : 0;
  }
  return total;
}

export function _isObjectEmpty(obj: {} | { [keys: string]: any }) {
  return Object.entries(obj).length === 0 && obj.constructor === Object;
}

/*
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *
 * Other handler function
 */

export const _onEnter = (func: () => any) => (
  event: React.KeyboardEvent<HTMLInputElement>
) => {
  if (event.key === "Enter") {
    func();
  }
};

export function _onLocalhost(
  localhostReturn: any | null | undefined,
  publicReturn: any | null | undefined
) {
  return /localhost/.test(window.location.href)
    ? localhostReturn
      ? localhostReturn
      : null
    : publicReturn
    ? publicReturn
    : null;
}

export function _onLocalhostFn(
  localhostFn: () => any | null | undefined,
  publicFn: () => any | null | undefined
) {
  if (/localhost/.test(window.location.href)) {
    if (localhostFn) {
      localhostFn();
    }
  } else {
    if (publicFn) {
      publicFn();
    }
  }
}

export function stringToPhone(string: any) {
  const phoneNumberString = string.toString();
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return null;
}

export function phoneFormatToNumber(phone: string) {
  var cleaned = ("" + phone).replace(/\D/g, "");
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + match[2] + match[3];
  }
  return null;
}

export async function isSupportsWebp() {
  if (!window.self.createImageBitmap) return false;

  const webpData =
    "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
  const blob = await fetch(webpData).then(r => r.blob());
  return createImageBitmap(blob).then(
    () => true,
    () => false
  );
}

export function getTopupImg({
  customerid,
  requestid,
  type = "webp"
}: {
  customerid: number;
  requestid: number;
  type?: string;
}) {
  if (isSupportsWebp() && type === "webp") {
    return `https://easyrecycle.ml/customer/${customerid}/topup/${requestid}/${requestid}.webp`;
  } else {
    return `https://easyrecycle.ml/customer/${customerid}/topup/${requestid}/${requestid}.jpg`;
  }
}

export const useConfirmDeleteItem = () => {
  const [state, setState] = useState<{ confirmState: boolean; item: any }>({
    confirmState: false,
    item: null
  });

  function onDeleteItem(props: { action: "delete" | "cancel"; item: any }) {
    switch (props.action) {
      case "delete":
        setState({ confirmState: true, item: props.item });
        break;
      case "cancel":
        setState({ confirmState: false, item: null });
        break;
      default:
        break;
    }
  }

  return [state, onDeleteItem, setState];
};

export interface BooleanReducerState {
  [key: string]: boolean;
}
export interface BooleanReducerActions {
  type: string;
  key?: string;
}
export function booleanReducer(
  state: BooleanReducerState,
  action: BooleanReducerActions
): BooleanReducerState {
  const objKey: any = "key" in action ? action.key : "";
  switch (action.type) {
    case "true":
      return { ...state, [objKey]: true };
    case "false":
      return { ...state, [objKey]: false };
    case "toggle":
      return { ...state, [objKey]: !state[objKey] };
    case "falseAll":
      let newObj = state;
      for (const key in newObj) {
        newObj[key] = false;
      }
      return { ...newObj };
    default:
      return { ...state };
  }
}
