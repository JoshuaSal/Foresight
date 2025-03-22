
function Assessment_declare() {
    let Assessment_no = document.getElementById("Assessment_no").value;
    Assessment_set(Assessment_no)
}


function Assessment_set(x) {
    const assessmentInputsDiv = document.getElementById("Assessment_input");

    const table = document.createElement("table");
    const headerRow = document.createElement("tr");

    const headers = ["Assessment", "Score", "Total", "Weight"];
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    for (let i = 1; i <= x; i++) {
        const row = document.createElement("tr");

        const assessmentCell = document.createElement("td");
        assessmentCell.textContent = `Assessment ${i}`;
        row.appendChild(assessmentCell);

        // Score Input Cell
        const scoreCell = document.createElement("td");
        const inputScore = document.createElement("input");
        inputScore.type = "number";
        inputScore.id = `assessmentScore_${i}`;
        inputScore.name = `assessmentScore_${i}`;
        scoreCell.appendChild(inputScore);
    
        row.appendChild(scoreCell);

        // Total Input Cell
        const totalCell = document.createElement("td");
        const inputTotal = document.createElement("input");
        inputTotal.type = "number";
        inputTotal.id = `assessmentTotal_${i}`;
        inputTotal.name = `assessmentTotal_${i}`;
        totalCell.appendChild(inputTotal);
        row.appendChild(totalCell);

        // Weight Input Cell
        const weightCell = document.createElement("td");
        const inputWeight = document.createElement("input");
        inputWeight.type = "number";
        inputWeight.id = `assessmentWeight_${i}`;
        inputWeight.name = `assessmentWeight_${i}`;
        weightCell.appendChild(inputWeight);
        row.appendChild(weightCell);

        table.appendChild(row);
    }
    assessmentInputsDiv.appendChild(table);

    const submitbutton = document.createElement("BUTTON")
    submitbutton.onclick = function() {collect_Assessment(x)};
    submitbutton.id = "collectbutton"
    submitbutton.innerText  = 'Collect Assessment';
    const collectbutton = document.getElementById("collectbutton");
    collectbutton.appendChild(submitbutton);

}

function collect_Assessment(x){

    let Finaltotal = 0;
    for (let i = 1; i<=x; i++){
        let score = document.getElementById(`assessmentScore_${i}`).value;
        let total = document.getElementById(`assessmentTotal_${i}`).value;
        let weight = document.getElementById(`assessmentWeight_${i}`).value;
        
        Finaltotal += (score/total)*weight;
    }
    const FinalGrade = document.createElement("h2");
    FinalGrade.innerText ="Final grade: " + (Math.round(Finaltotal * 100) / 100).toFixed(2) + "%";
    const final = document.getElementById("finalgrade");
    final.appendChild(FinalGrade);

    const Gradelost = document.createElement("h3")
    Gradelost.innerText = "Lost grade: " + ((Math.round((100-Finaltotal) * 100) / 100).toFixed(2)) + "%";
    const lost = document.getElementById("lostgrade");
    lost.appendChild(Gradelost);
}
