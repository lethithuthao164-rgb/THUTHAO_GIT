
function Sochan(n) {
    let kq=""
    for (let i=2;i<=n;i+=2) {
        kq+=i+" "
    }
    return kq;
}
function inkq(n,X) {
    console.log(X)
}
let n=10;
let kq=Sochan(n)
inkq(n,kq)