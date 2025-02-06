import Cryptr from 'cryptr';

export const decrypt = (text: string) => {
  const secretKey = 'k2eAKApPHZqPPic4PI9slkZjGd5K0EyDZHIxvr+SpdU=';

  if (secretKey) {
    const cryptr = new Cryptr(secretKey);

    const encryptedString = cryptr.decrypt(text);
    return encryptedString;
  }
};
