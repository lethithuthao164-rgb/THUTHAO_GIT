function giaithua(n) {
    let kq=1;
    for (let i=1;i<=n;i++) {
        kq*=i
    }
    return kq
}
function inkq(n,X) {
    console.log(n+"!="+X);
    
}
let n=5;
let kq=giaithua(n);
inkq(n,kq)