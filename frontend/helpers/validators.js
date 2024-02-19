import * as ethUtil from 'ethereumjs-util';
import { isValidAddress } from 'ethereumjs-util';


export function isConnected(userData, currentBlockchainInformation) {
  return userData.some(exintingBlockchain => {
    if ((exintingBlockchain.networkName === currentBlockchainInformation.networkName &&
      exintingBlockchain.publicKey === currentBlockchainInformation.publicKey) || 
      (exintingBlockchain.publicKey === currentBlockchainInformation.publicKey && 
        exintingBlockchain.tokenSymbol === currentBlockchainInformation.tokenSymbol) ) {
      return true;
    }
    return false;
  });



}

// Mayor de edad;
function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const validAge = (birthdate) => {
  const age = getAge(birthdate);
  if (age < 18) {
    return false;
  } else return true;
};


const validMail = (mail) => {
  const email = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.test(mail);
};

const validPhone = (phone) => {
  const phoneReg = /(\+34|0034|34)?[ -]*(6|7|8|9)[ -]*([0-9][ -]*){8}/g;
  return phoneReg.test(phone);
};


const validIBAN = (_iban) => {
  const IBAN =
    /([a-zA-Z]{2})\s*\t*(\d{2})\s*\t*(\d{4})\s*\t*(\d{4})\s*\t*(\d{4})\s*\t*(\d{4})\s*\t*(\d{4})/g;
  return IBAN.test(_iban);
};

const btcAddress = (address) => {
  const btc = new RegExp('([13]|bc1)[A-HJ-NP-Za-km-z1-9]{27,34}');
  return btc.test(address);
};

const validAddress = (address) => {
  const btc = new RegExp('([13]|bc1)[A-HJ-NP-Za-km-z1-9]{27,34}');
  if (isValidAddress(address) || btcAddress(address)) {
    return true;
  } else return false;
};

const validZip = (zip) => {
  const cp = new RegExp("^[1-9]+[0-9]*$");
  return cp.test(zip);
};



const validText = (value) => {
  const testText = new RegExp(
    /^[a-zA-ZÀ-ÿ \u00f1\u00d1]+(s*[a-zA-ZÀ-ÿ \u00f1\u00d1]*)*[a-zA-ZÀ-ÿ \u00f1\u00d1]+$/g
  );
  return testText.test(value);
};


export const validators = {

  email: (value) => {
    let message = "";
    if (!value) {
      message = "El campo email es requerido";
    } else if (!validMail(value)) {
      message =
        "El email introducido no es válido, debe tener el siguiente formato: email@email.com/.es";
    }
    return message;
  },

  birthdate: (value) => {
    let message = "";
    if (!value) {
      message = "El campo edad es requerido";
    } else if (!validAge(value)) {
      message = "La edad introducida no es válida, debe ser mayor de edad.";
    }
    return message;
  },

  IBAN: (value) => {
    let message = "";
    if (!value) {
      message = "El campo IBAN es requerido";
    } else if (!validIBAN(value)) {
      message = "El IBAN introducido no es válido.";
    }
    return message;
  },

  noEmpty: (value) => {
    let message = "";
    if (!value || value === "") {
      message = "Este campo es obligatorio";
    }
    return message;
  },

  noSelected: (value) => {
    let message = "";
    if (typeof value !== "boolean") {
      message = "Debes elegir una opción";
    }
    return message;
  },


};


export const bufferValidator = (nonce, signature) => {
  const msgBuffer = ethUtil.toBuffer(nonce);
  const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
  const signatureBuffer = ethUtil.toBuffer(signature);
  const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
  const publicKey = ethUtil.ecrecover(
    msgHash,
    signatureParams.v,
    signatureParams.r,
    signatureParams.s
  );
  const addressBuffer = ethUtil.publicToAddress(publicKey);
  const address = ethUtil.bufferToHex(addressBuffer);
  return address;
};
