exports.ToforeNumberString = (number) => {
    var numberString = number + ""

    switch(numberString.length){
        case 1 : numberString = "000" + numberString
        break;
        case 2 : numberString = "00" + numberString
        break;
        case 3 : numberString = "0" + numberString
        break;
        case 4 : numberString = numberString
        break
    }

    return numberString;
}

exports.MonthString = (month) => {
    var monthStr = month + ""
    if(monthStr.length == 1){
        monthStr = "0" + monthStr
    }

    return monthStr
}