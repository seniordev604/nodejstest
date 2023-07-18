import { customAlphabet } from "nanoid";
const letters = "abcdefghijklmnoqprstuvwxyz";
const nanoid = customAlphabet(`1234567890${letters}${letters.toUpperCase()}`, 7);

export function generateId() {
  return nanoid();
}
