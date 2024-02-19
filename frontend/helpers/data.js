

const years = [];

const daysArr = (x) => {
  return Array(x)
    .fill()
    .map((x, i) => i + 1);
};

const months = [
  { id: 0, name: "Enero", days: daysArr(31), daysB: daysArr(31) },
  { id: 1, name: "Febrero", days: daysArr(28), daysB: daysArr(29) },
  { id: 2, name: "Marzo", days: daysArr(31), daysB: daysArr(31) },
  { id: 3, name: "Abril", days: daysArr(30), daysB: daysArr(30) },
  { id: 4, name: "Mayo", days: daysArr(31), daysB: daysArr(31) },
  { id: 5, name: "Junio", days: daysArr(30), daysB: daysArr(30) },
  { id: 6, name: "Julio", days: daysArr(31), daysB: daysArr(31) },
  { id: 7, name: "Agosto", days: daysArr(31), daysB: daysArr(31) },
  { id: 8, name: "Septiembre", days: daysArr(30), daysB: daysArr(30) },
  { id: 9, name: "Octubre", days: daysArr(31), daysB: daysArr(31) },
  { id: 10, name: "Noviembre", days: daysArr(30), daysB: daysArr(30) },
  { id: 11, name: "Diciembre", days: daysArr(31), daysB: daysArr(31) },
];

const getId = (x) => {
  for (let i = 0; i <= months.length; i++) {
    if (months[i].name === x) {
      return i;
    }
  }
};

const getName = (x) => {
  months.forEach((m) => {
    if (m.id === Number(x) - 1) {
      return m.name;
    }
  });
};

for (let i = 0; i <= 120; i++) {
  // years.push({value:Number(1900+i), bisiesto:Number(1900+i)%4 === 0});
  years.push({
    value: Number(1900 + i),
    months: [],
  });

  for (let x = 0; x < months.length; x++) {
    // years.push({value:Number(1900+i), bisiesto:Number(1900+i)%4 === 0});
    years[i].months.push({
      value: months[x]?.name,
      days: Number(1900 + i) % 4 === 0 ? months[x]?.daysB : months[x]?.days,
    });
  }
}

export const referral = {
  legalId: "", // "23456789K"
  firstName: "", // "Ana"
  lastName: "", // "Torroja"
  blockchainId: {
    privateKey: "", // "2.4197857200151253e+37"
    publicKey: "", // "5.373003642731685e+21"
  },
};

const intro = [
  {
    big: "text",
    small: "text",
  },{
    big: "text",
    small: "text",
  },{
    big: "text",
    small: "text",
  },{
    big: "text",
    small: "text",
  },{
    big: "text",
    small: "text",
  },{
    big: "text",
    small: "text",
  }
];

const user = {
  img: "/Form/Avatar.svg",
};

const referrals = ["Amigos", "Familiares"];
const countries = [
  { value: "AFGANA", label: "AF" },
  { value: "ALEMANA", label: "DE" },
  { value: "ÁRABE", label: "AE" },
  { value: "ARGENTINA", label: "AR" },
  { value: "AUSTRALIANA", label: "AU" },
  { value: "BELGA", label: "BE" },
  { value: "BOLIVIANA", label: "BO" },
  { value: "BRASILEÑA", label: "BR" },
  { value: "CAMBOYANA", label: "KH" },
  { value: "CANADIENSE", label: "CA" },
  { value: "CHILENA", label: "CL" },
  { value: "CHINA", label: "CN" },
  { value: "COLOMBIANA", label: "CO" },
  { value: "COREANA", label: "KR" },
  { value: "COSTARRICENSE", label: "CR" },
  { value: "CUBANA", label: "CU" },
  { value: "DANESA", label: "DK" },
  { value: "DOMINICANA", label: "DO" },
  { value: "ECUATORIANA", label: "EC" },
  { value: "EGIPCIA", label: "EG" },
  { value: "SALVADOREÑA", label: "SV" },
  { value: "ESCOCESA", label: "GB" },
  { value: "ESPAÑOLA", label: "ES" },
  { value: "ESTADOUNIDENSE", label: "US" },
  { value: "ESTONIA", label: "EE" },
  { value: "ETIOPE", label: "ET" },
  { value: "FILIPINA", label: "PH" },
  { value: "FINLANDESA", label: "FI" },
  { value: "FRANCESA", label: "FR" },
  { value: "GALESA", label: "GB" },
  { value: "GRIEGA", label: "GR" },
  { value: "GUATEMALTECA", label: "GT" },
  { value: "HAITIANA", label: "HT" },
  { value: "HOLANDESA", label: "NL" },
  { value: "HONDUREÑA", label: "HN" },
  { value: "INDONESA", label: "ID" },
  { value: "INGLESA", label: "GB" },
  { value: "IRAQUÍ", label: "IQ" },
  { value: "IRANÍ", label: "IR" },
  { value: "IRLANDESA", label: "IE" },
  { value: "ISRAELÍ", label: "IL" },
  { value: "ITALIANA", label: "IT" },
  { value: "JAPONESA", label: "JP" },
  { value: "JORDANA", label: "JO" },
  { value: "LAOSIANA", label: "LA" },
  { value: "LETONA", label: "LV" },
  { value: "LETONESA", label: "LV" },
  { value: "MALAYA", label: "MY" },
  { value: "MARROQUÍ", label: "MA" },
  { value: "MEXICANA", label: "MX" },
  { value: "NICARAGÜENSE", label: "NI" },
  { value: "NIGERIANA", label: "NG" },
  { value: "NORUEGA", label: "NO" },
  { value: "NEOZELANDESA", label: "NZ" },
  { value: "PANAMEÑA", label: "PA" },
  { value: "PARAGUAYA", label: "PY" },
  { value: "PERUANA", label: "PE" },
  { value: "POLACA", label: "PL" },
  { value: "PORTUGUESA", label: "PT" },
  { value: "PUERTORRIQUEÑA", label: "PR" },
  { value: "RUMANA", label: "RO" },
  { value: "RUSA", label: "RU" },
  { value: "SUECA", label: "SE" },
  { value: "SUIZA", label: "CH" },
  { value: "TAILANDESA", label: "TH" },
  { value: "TAIWANESA", label: "TW" },
  { value: "TURCA", label: "TR" },
  { value: "UCRANIANA", label: "UA" },
  { value: "URUGUAYA", label: "UY" },
  { value: "VENEZOLANA", label: "VE" },
  { value: "VIETNAMITA", label: "VN" }
];


   


export { years, intro, user, months, referrals, countries, getId, getName };