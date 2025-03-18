export function formatCurrency(number) {
  if (typeof number !== "number") {
    throw new TypeError("Input must be a number");
  }
  if (number < 1) return number;
  return number.toLocaleString("en-US");
}

export function roundToNineDecimalPlaces(value) {
  return Math.round(value * 1e9) / 1e9;
}

export const classNameById = {
  1: {
    bgColor: "bg-[#0A9357]",
    classMain:
      "border-[#0A9357] shadow-[0px_0px_10px_0px_#0A935780] bg-[#0A9357]",
    mainColor: "#0A9357",
    classButton:
      "border-[#0A9357] shadow-[0px_2px_0px_0px_#226436] bg-[#0A9357]",
  },
  2: {
    bgColor: "bg-[#3EA8FF]",
    classMain:
      "border-[#3EA8FF] shadow-[0px_0px_10px_0px_#3EA8FF80] bg-[#3EA8FF]",
    mainColor: "#3EA8FF",
    classButton:
      "border-[#3EA8FF] shadow-[0px_2px_0px_0px_#225664] bg-[#3EA8FF]",
  },
  3: {
    bgColor: "bg-[#E56E50]",
    classMain:
      "border-[#E56E50] shadow-[0px_0px_10px_0px_#E56E5080] bg-[#E56E50]",
    mainColor: "#E56E50",
    classButton:
      "border-[#E56E50] shadow-[0px_2px_0px_0px_#643922] bg-[#E56E50]",
  },
  4: {
    bgColor: "bg-[#FFD646]",
    classMain:
      "border-[#FFD646] shadow-[0px_0px_10px_0px_#FFD64680] bg-[#FFD646]",
    mainColor: "#FFD646",
    classButton:
      "border-[#FFD646] shadow-[0px_2px_0px_0px_#644D22] bg-[#FFD646]",
  },
  5: {
    bgColor: "bg-[#FFFFFF]",
    classMain:
      "border-[#FFFFFF] shadow-[0px_0px_10px_0px_#FFFFFF80] bg-[#FFFFFF]",
    mainColor: "#FFFFFF",
    classButton:
      "border-[#FFFFFF] shadow-[0px_2px_0px_0px_#282828] bg-[#FFFFFF]",
    classColorText: "text-[#240B0E]",
  },
};
