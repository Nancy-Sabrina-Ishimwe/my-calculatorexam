async function calculate() {
    const expression = document.getElementById("expression").value;
    const result = eval(expression); 

    document.getElementById("result").innerText = result;

    
    await fetch("http://localhost:3000/calculations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expression, result })
    });

    loadCalculations();
}

// Function to load all calculations
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


const clearBtn = document.getElementById("clear");

clearBtn.addEventListener("click", async () => {
    try {
        
        await fetch("http://localhost:3000/calculations", {
            method: "DELETE"
        });

        
        document.getElementById("result").innerText = "";
        document.getElementById("list").innerHTML = "";

        alert("All calculations cleared!");
    } catch (error) {
        console.error("Error clearing calculations:", error);
    }
});


loadCalculations();
