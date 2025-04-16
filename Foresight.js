var submit = 0;
var fields = 0;
var currentfields = 0;
// Call createtable when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', createtable);
function createtable() {
    const table = document.createElement("table");
    table.id = "inputtable";
    const headerRow = document.createElement("tr");

    const headers = ["Assessment", "Score", "Total", "Weight"];
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
        document.getElementById("Assessment_input").appendChild(table); 

    });
    table.appendChild(headerRow);
}

function Assessment_declare() {
    if (submit == 0) {
        let Assessment_no = document.getElementById("Assessment_no").value;
        submit++;
        fields += Assessment_no;
        Assessment_set();
    } else {
        document.getElementById("Assessment_no").disabled = true;
    }
}

function Add_field() {
    const assessmentInputsDiv = document.getElementById("Assessment_input");
    let table = document.getElementById("inputtable");
    const headerRow = document.createElement("tr");
    const row = document.createElement("tr");

    const assessmentCell = document.createElement("td");
    assessmentCell.textContent = `Assessment ${currentfields}`;
    row.appendChild(assessmentCell);

    // Score Input Cell
    const scoreCell = document.createElement("td");
    const inputScore = document.createElement("input");
    inputScore.type = "number";
    inputScore.value = "0";
    inputScore.id = `assessmentScore_${currentfields}`;
    inputScore.name = `assessmentScore_${currentfields}`;
    scoreCell.appendChild(inputScore);

    row.appendChild(scoreCell);

    // Total Input Cell
    const totalCell = document.createElement("td");
    const inputTotal = document.createElement("input");
    inputTotal.type = "number";
    inputTotal.value = "1";
    inputTotal.id = `assessmentTotal_${currentfields}`;
    inputTotal.name = `assessmentTotal_${currentfields}`;
    totalCell.appendChild(inputTotal);
    row.appendChild(totalCell);

    // Weight Input Cell
    const weightCell = document.createElement("td");
    const inputWeight = document.createElement("input");
    inputWeight.type = "number";
    inputWeight.id = `assessmentWeight_${currentfields}`;
    inputWeight.name = `assessmentWeight_${currentfields}`;
    weightCell.appendChild(inputWeight);
    row.appendChild(weightCell);

    table.appendChild(row);
    assessmentInputsDiv.appendChild(table);
    currentfields++;

}


function Assessment_set() {
    const assessmentInputsDiv = document.getElementById("Assessment_input");
    let table = document.getElementById("inputtable");
    while (currentfields < fields) {
        const row = document.createElement("tr");

        const assessmentCell = document.createElement("td");
        assessmentCell.textContent = `Assessment ${currentfields}`;
        row.appendChild(assessmentCell);

        // Score Input Cell
        const scoreCell = document.createElement("td");
        const inputScore = document.createElement("input");
        inputScore.type = "number";
        inputScore.value = "0";
        inputScore.id = `assessmentScore_${currentfields}`;
        inputScore.name = `assessmentScore_${currentfields}`;
        scoreCell.appendChild(inputScore);

        row.appendChild(scoreCell);

        // Total Input Cell
        const totalCell = document.createElement("td");
        const inputTotal = document.createElement("input");
        inputTotal.type = "number";
        inputTotal.value = "1";
        inputTotal.id = `assessmentTotal_${currentfields}`;
        inputTotal.name = `assessmentTotal_${currentfields}`;
        totalCell.appendChild(inputTotal);
        row.appendChild(totalCell);

        // Weight Input Cell
        const weightCell = document.createElement("td");
        const inputWeight = document.createElement("input");
        inputWeight.type = "number";
        inputWeight.id = `assessmentWeight_${currentfields}`;
        inputWeight.name = `assessmentWeight_${currentfields}`;
        weightCell.appendChild(inputWeight);
        row.appendChild(weightCell);

        table.appendChild(row);
        currentfields++
    }
    assessmentInputsDiv.appendChild(table);
    const calculateimg = document.createElement("img");
    calculateimg.src = "media/calculate.png";
    calculateimg.className = "darker";
    calculateimg.id = "calculateimg";
    calculateimg.alt = "calculateimg";

    const submitbutton = document.createElement("BUTTON");

    submitbutton.id = "collectbutton";
    submitbutton.appendChild(calculateimg);
    const parentElement = document.getElementById("collectbutton");
    parentElement.appendChild(submitbutton);
    submitbutton.onclick = function () {
        submitbuttonfxn();
    };
}

function calculateFinalGrade() {
    let Finaltotal = 0;
    for (let i = 0; i < currentfields; i++) {
        let score = parseFloat(document.getElementById(`assessmentScore_${i}`).value);
        let total = parseFloat(document.getElementById(`assessmentTotal_${i}`).value);
        let weight = parseFloat(document.getElementById(`assessmentWeight_${i}`).value);
        Finaltotal += (score / total) * weight;
    }
    // Clear previous results
    const finalGradeDiv = document.getElementById("finalgrade");
    finalGradeDiv.innerHTML = '';
    const lostGradeDiv = document.getElementById("lostgrade");
    lostGradeDiv.innerHTML = '';

    const FinalGrade = document.createElement("h2");
    FinalGrade.innerText = "Final grade: " + (Math.round(Finaltotal * 100) / 100).toFixed(2) + "%";
    FinalGrade.id = "resultgrade";
    finalGradeDiv.appendChild(FinalGrade);

    const Gradelost = document.createElement("h3");
    Gradelost.innerText = "Lost grade: " + ((Math.round((100 - Finaltotal) * 100) / 100).toFixed(2)) + "%";
    Gradelost.id = "gradelost";
    lostGradeDiv.appendChild(Gradelost);
}

function submitbuttonfxn() {
    let totalweight = 0;
    for (let i = 0; i < currentfields; i++) {
        let countweight = parseFloat(document.getElementById(`assessmentWeight_${i}`).value);
        totalweight += countweight;
    }
    console.log(totalweight);

    if (Math.abs(totalweight - 100) > 1e-6) { // Use a small tolerance for floating-point comparison
        if (window.confirm("Warning! Weight does not equate to 100%, calculation may be off. Proceed?") == true) {
            calculateFinalGrade();
        }
        // If the user cancels, the button's onclick remains the same, allowing them to edit.
    } else {
        calculateFinalGrade();
    }
}