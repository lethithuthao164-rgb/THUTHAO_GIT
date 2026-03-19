let n=1479;
let map=["A","B", "C", "D","E","F","G","H","K","L"];
let str=n.toString();
let kq="";
for (let i=0;i<str.length;i++) {
    kq+=map[str[i]]
}
console.log(kq)