export function convertToWords(number) {
  // function convertToWordsTK(number) {
  const ones = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const bigs = ["thousand", "million", "billion", "trillion"];

  function convertGroup(number, index) {
    if (number === 0) return "";

    const hundreds = Math.floor(number / 100);
    const tensUnits = number % 100;

    let result = "";
    if (hundreds !== 0) {
      result += ones[hundreds] + " hundred";
      if (tensUnits !== 0) result += " ";
    }

    if (tensUnits < 10) result += ones[tensUnits];
    else if (tensUnits < 20) result += teens[tensUnits - 10];
    else {
      const tensIndex = Math.floor(tensUnits / 10) - 2;
      result += tens[tensIndex];
      if (tensUnits % 10 !== 0) result += "-" + ones[tensUnits % 10];
    }

    if (index > 0) result += " " + bigs[index - 1];
    return result;
  }

  if (number === 0) return "zero taka";

  const integerPart = Math.floor(number);
  const decimalPart = Math.round((number - integerPart) * 100);

  let result = "";
  let chunkCount = 0;

  // Convert integer part
  let remainingIntegerPart = integerPart;
  while (remainingIntegerPart > 0) {
    if (remainingIntegerPart % 1000 !== 0) {
      result =
        convertGroup(remainingIntegerPart % 1000, chunkCount) + " " + result;
    }
    remainingIntegerPart = Math.floor(remainingIntegerPart / 1000);
    chunkCount++;
  }

  // Add decimal part
  if (decimalPart > 0) {
    result +=
      "taka and " +
      (decimalPart < 10 ? "zero" + decimalPart : convertGroup(decimalPart, 0)) +
      " poisha";
  }

  return result.trim() + " only";
}
