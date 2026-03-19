function max(a,b,c) {
    let max =a;
    if (b>max) {
        max=b;
    }
    if (c>max) {
        max=c;
    }
    return max;
}
function inkq(kq) {
    console.log("so lon nhat: "+ kq)
}

let a=3;
let b=7;
let c=5;
let kq=max(a,b,c);
inkq(kq)