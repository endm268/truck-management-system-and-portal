// helper.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Adjust the import path as necessary

export async function getAuthHeaders() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.token) {
    throw new Error("Not authenticated");
  }

  const token = session.user.token;

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const numberToArabicWords = (num: number): string => {
  const arabicNumbers = [
    "صفر", "واحد", "اثنان", "ثلاثة", "أربعة", "خمسة", "ستة", "سبعة", "ثمانية", "تسعة",
  ];
  const arabicTens = [
    "", "عشرة", "عشرون", "ثلاثون", "أربعون", "خمسون", "ستون", "سبعون", "ثمانون", "تسعون",
  ];
  const arabicTeens = [
    "أحد عشر", "اثنا عشر", "ثلاثة عشر", "أربعة عشر", "خمسة عشر", "ستة عشر", "سبعة عشر", "ثمانية عشر", "تسعة عشر",
  ];
  const arabicScales = ["", "ألف", "مليون"];

  if (num === 0) return arabicNumbers[0];

  const convertBelow1000 = (n: number): string => {
    if (n === 0) return "";

    const hundreds = Math.floor(n / 100);
    const remainder = n % 100;

    let result = "";

    if (hundreds > 0) {
      result += `${hundreds === 1 ? "مائة" : `${arabicNumbers[hundreds]} مائة`}`;
    }

    if (remainder > 0) {
      if (hundreds > 0) result += " و ";

      if (remainder < 10) {
        result += arabicNumbers[remainder];
      } else if (remainder > 10 && remainder < 20) {
        result += arabicTeens[remainder - 11];
      } else {
        const tens = Math.floor(remainder / 10);
        const units = remainder % 10;

        if (units === 0) {
          result += arabicTens[tens];
        } else {
          result += `${arabicNumbers[units]} و ${arabicTens[tens]}`;
        }
      }
    }

    return result;
  };

  const convertDecimal = (decimal: string): string => {
    return decimal
      .split("")
      .map((digit) => arabicNumbers[parseInt(digit, 10)])
      .join(" ");
  };

  const [integerPart, decimalPart] = num.toFixed(3).split("."); // Ensure three decimal places
  let scaleIndex = 0;
  let words = "";
  let remaining = parseInt(integerPart, 10);

  while (remaining > 0) {
    const chunk = remaining % 1000;
    if (chunk > 0) {
      const chunkWords = convertBelow1000(chunk);
      const scale = arabicScales[scaleIndex];

      if (words) {
        words = `${chunkWords} ${scale} و ${words}`;
      } else {
        words = `${chunkWords} ${scale}`;
      }
    }

    remaining = Math.floor(remaining / 1000);
    scaleIndex++;
  }

  if (decimalPart && parseInt(decimalPart, 10) > 0) {
    words += ` و ${convertDecimal(decimalPart)} جزء`;
  }

  return words.trim();
};


