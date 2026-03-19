let m1=10;
let m2=20;
let m3=30;
let s=160;
let t=0;
if (s<=100) {
    t*=s*m1
}
else if (s<=150) {
    t=(100*m1)+((s-100)*m2)
}
else if (s>=151) {
    t=(100*m1)+(50*m2)+((s-150)*m3)
}
console.log(t)
