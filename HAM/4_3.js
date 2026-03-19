function giaipt(a,b,c) {
    let dl=(b*b)-(4*a*c)
    if (dl<0) {
        return "phuong trinh vo nghiem"
    }
    else if (dl==0) {
        let x=-b/(2*a);
        return "nghiem kep x= "+x
    }
    else {
        let x1=(-b+Math.sqrt(dl))/(2*a);
        let x2=(-b-Math.sqrt(dl))/(2*a);
        return "x1= "+ x1+ ", x2= "+ x2;
    }
}
function inkq(a,b,c,kq){
    console.log("ket qua "+ kq)

}
let a=1;
let b=-3;
let c=2;
let kq=giaipt(a,b,c);
inkq(a,b,c,kq)