export const getLocalNumber = (value) => {
    if(isNaN(value)) return value;
    
    return (Number(value)).toLocaleString();
} 