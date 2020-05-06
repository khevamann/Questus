export const generateGameCode = (itemNum: number) => {
  const startNum = 65 + (itemNum / 3 - 1) * 6;
  let code = randChar(startNum, 6);
  code += randChar(49, 9);
  code += randChar(65, 26);
  code += randChar(49, 9);
  return code;
};
export const getGameFromChar = (code: string) => {
  const charCode = code.charCodeAt(0);
  if (code[0] === 'Y' || code[0] === 'Z') return 6;
  return Math.floor((charCode - 65) / 6 + 1) * 3;
};

function randChar(start: number, count: number) {
  const char = String.fromCharCode(start + Math.floor(Math.random() * count));
  if (char === 'Q') return 'Y';
  if (char === 'O') return 'Z';
  return char;
}
