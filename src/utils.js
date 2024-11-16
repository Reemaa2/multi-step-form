export const formatAddOns = (addOn) => {
  const splitIndex = addOn.search(/[A-Z]/);

  if(splitIndex > 0) {
    let firstWord = addOn.slice(0, splitIndex);
    let secondWord = addOn.slice(splitIndex);

    firstWord = firstWord.charAt(0).toUpperCase() + firstWord.slice(1).toLowerCase();
    secondWord = secondWord.charAt(0).toLowerCase() + secondWord.slice(1);

    return `${firstWord} ${secondWord}`;
  }
} 


export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}