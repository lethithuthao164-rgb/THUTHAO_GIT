
function LasoNT(x) {
    if (x<2) return false
    let count=0;
    for (let i=2;i<=Math.sqrt(x);i++) {
        if (x%i==0) {
            count+=1;
        }
    }
    if (count===0) {
        return true;
    }
    else {
        return false;
    }
}
function SoHopLe(x) {
    return x<=1
}

function NhapvaDem() {
    let arr=[3,7,4,15,5,1];
    let dem=0;
    for (let i=0; i<arr.length;i++) {
        let num=arr[i]
        if (SoHopLe(num)) {
            break
        }
        if (LasoNT(num)) {
            dem++;
        }
    }
    return dem;
}
function inkq(kq) {
    console.log("co "+ kq+" so nguyen to");
}
let kq=NhapvaDem()
inkq(kq)