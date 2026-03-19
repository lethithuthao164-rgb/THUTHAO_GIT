let n=7;
for (let i=1; i<=n;i++) {
    console.log(i)
}

let count=0;
for (let i=1; i<=n; i++) {
    process.stdout.write(i + " ");
    count++;
    if (count==5) {
        console.log();
        count=0
    }
}

for (let i=1; i<=n;i++) {
    let row="";
    for (let j=1; j<=n; j++) {
        row+=j+" "
    }
    console.log(row)
}