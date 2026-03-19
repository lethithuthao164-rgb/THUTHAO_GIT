let str="-1 2 -3 4 5 6";
let arr=str.split(" ");
let am=0;
let duong=0;
for (let i=0; i<arr.length;i++) {
    let num=parseInt(arr[i])

    if (num<0) {
        am+=1
    }
    else {
        duong+=1;
    }
}

console.log("so am", am);
console.log("so duong",duong)