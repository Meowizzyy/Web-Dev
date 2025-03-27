function pow(number,mult){
    for(let i = 1;i < mult;i++){
        number*=number;
    }
    return number;
}

let x = prompt("x?", '');
let n = prompt("n?", '');

if (n < 1) {
  alert(`Power ${n} is not supported, use a positive integer`);
} else {
  alert( pow(x, n) );
}