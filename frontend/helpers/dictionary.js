import esWords from "../translate/es.json"

export function getDictionary(lang) {

    let words={}
    switch (lang){
        case 'es':
            words=esWords;
        break;
        case 'en':
            words=enWords;
        break;
        default: words = enWords;
    }

    return words
}