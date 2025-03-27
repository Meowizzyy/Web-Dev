let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}

let result = 0;

for(let names in salaries){
    result += salaries[names];
}
alert(result);