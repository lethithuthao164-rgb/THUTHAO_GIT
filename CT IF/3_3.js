let a=5.5;
let b=0;
let pt="/";
let t;
if (pt=="+") {
    t=a+b
}
else if (pt=="-") {
    t=a-b
}
else if (pt=="*") {
    t=a*b
}
else if (pt=="/") {
    if (b!=0) {
        t=a/b
    }
    else {
        console.log("mau khac 0")
    }
}
else {
    console.log("khong hop le")
}
if (t !== undefined) {
    console.log(t);
}