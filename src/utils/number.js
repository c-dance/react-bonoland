/* === 한국 숫자 단위로 산출 === */
export const getLocalNumber = (value = 0) => {    
    return isNaN(value)? value : (Number(value)).toLocaleString();
};

/* === 억 단위 통화 산출 === */
export const getLocalCurrent = value => {
    const unit = "억";
    const eok = 100000000;
    let num;
    
    if(typeof value === "string") num = getNumber(num);

    if(isNaN(num)) return '-';

    num = parseFloat(CALCULATOR.divide(num, 100000000)).toFixed(2) ;

    return (num.toString() + unit);
};

/* === NUMBER 타입 숫자로 산출 === */
export const getNumber = (strValue = "") => {
    let value = strValue.toString().replaceAll(',', '');
    return isNaN(value)? value : Number(value);
};

/* === 계산식 === */
export const CALCULATOR = {
    sum: (numbers = []) => {
        let result;
        for(let num of numbers) result += getNumber(num);
        return result;
    },
    divide: (x = 0, y = 0, fixNum = 0) => {
        let result;
        if(fixNum === 0) {
            result = parseInt(getNumber(x) / getNumber(y));
        } else { 
            result = parseFloat(getNumber(x) / getNumber(y)).toFixed(fixNum);
        }
        return result;
    },
    multiply: (x = 0, y = 0, fixNum = 0) => {
        let result;
        if(fixNum === 0) {
            result = parseInt(getNumber(x) * getNumber(y));
        } else { 
            result = parseFloat(getNumber(x) * getNumber(y)).toFixed(fixNum);
        }
        return result;
    }
};