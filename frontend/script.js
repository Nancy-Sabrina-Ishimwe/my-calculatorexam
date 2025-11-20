async function calculate() {
    const expression = document.getElementById("expression").value;
    const result = eval(expression); 

    document.getElementById("result").innerText = result;

    // Save to API
    await fetch("http://localhost:3000/calculations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression, result })
    });

    loadCalculations();
}

async function loadCalculations() {
    const res = await fetch("http://localhost:3000/calculations");
    const data = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(item => {
        const li = document.createElement("li");
        li.innerText = `${item.expression} = ${item.result}`;
        list.appendChild(li);
    });
}

loadCalculations();
