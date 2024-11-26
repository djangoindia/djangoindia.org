function capitalizeFirstWord(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function splitAndCapitalize(str: string): string {
  const words = str.split('_');
  const capitalizedWords = words.map((word) => capitalizeFirstWord(word));
  return capitalizedWords.join(' ');
}
