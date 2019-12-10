import validator from 'validator';
import moment from 'moment';
import Axios from 'axios';

let extractContent = (html, length = 0) => {
    return (htmlToText).fromString(html, { ignoreHref: true, ignoreImage: true }).slice(0, length);
}

//validates an email
global['validateMail'] = (email) => {
    return validator.isEmail(email);
}

//validates a mobile phone nimber
global['validatePhone'] = (phone) => {
    return validator.isMobilePhone(phone);
}

//comma seperator for numbers
global["digitSeperator"] = (digits) => {
    return (digits + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

//changes english numbers into farsi
global["toFarsi"] = (str) => {
    str = String(str)
    var numbers = [["0", "۰"], ["1", "۱"], ["2", "۲"], ["3", "۳"], ["4", "۴"], ["5", "۵"], ["6", "۶"], ["7", "۷"], ["8", "۸"], ["9", "۹"]]
    var deepReplace = (theString, findThis, replaceWith) => {
        while (theString.indexOf(findThis) >= 0) {
            theString = theString.replace(findThis, replaceWith);
        }
        return theString;
    }

    numbers.map(n => {
        str = deepReplace(str, n[0], n[1]);
        return '';
    })
    return str;
}

//replace spaces in an string making them browser friendly
global['dasher'] = (str) => {
    return str.replace(" ", "-");
}

//removes dashes from string puts spaces instead
global['undasher'] = (str) => {
    return str.replace("-", " ");
}

global['chunkArray'] = (myArray, chunk_size) => {
    var results = [];
    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }
    return results;
}

global['getStringBetween'] = (str, firstChar, secondChar) => {
    return str.substring(
        str.lastIndexOf(firstChar) + 1,
        str.lastIndexOf(secondChar)
    );
}

global['getStringFrom'] = (str, firstChar) => {
    return str.substring(
        str.lastIndexOf(firstChar) + 1,
    );
}

global['getTimeDiff'] = (due) => {
    return moment(new Date()).diff(new Date(due));
}

global['getCurrentRates'] = async () => {
    try {
        let response = await Axios.get("https://api.exchangeratesapi.io/latest?base=USD");
        return response.data.rates
    } catch (err) {
        throw err
    }
}