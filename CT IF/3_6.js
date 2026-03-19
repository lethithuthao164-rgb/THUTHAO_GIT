let a = 3;
let b = 4;
let c = 5;

if ((a + b > c) && (a + c > b) && (b + c > a) && (a > 0) && (b > 0) && (c > 0)) {

    if ((a*a == b*b + c*c) || (b*b == a*a + c*c) || (c*c == a*a + b*b)) {
        console.log("tam giac vuong");
    }
    else if (a == b && b == c) {
        console.log("tam giac deu");
    }
    else {
        console.log("tam giac thuong");
    }

} else {
    console.log("khong phai tam giac");
}