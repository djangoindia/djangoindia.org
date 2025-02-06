import Cryptr from 'cryptr';

export const encrypt = (text: string) => {
  const secretKey = 'k2eAKApPHZqPPic4PI9slkZjGd5K0EyDZHIxvr+SpdU=';

  if (secretKey) {
    const cryptr = new Cryptr(secretKey);
    const encryptedString = cryptr.encrypt(text);
    return encryptedString;
  }
};
