var submit = 0;
var fields = 0;
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


var collect = 0;
function Assessment_set() {
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

    for (let i = 1; i <= fields; i++) {
        const row = document.createElement("tr");

        const assessmentCell = document.createElement("td");
        assessmentCell.textContent = `Assessment ${i}`;
        row.appendChild(assessmentCell);

        // Score Input Cell
        const scoreCell = document.createElement("td");
        const inputScore = document.createElement("input");
        inputScore.type = "number";
        inputScore.value = "0";
        inputScore.id = `assessmentScore_${i}`;
        inputScore.name = `assessmentScore_${i}`;
        scoreCell.appendChild(inputScore);

        row.appendChild(scoreCell);

        // Total Input Cell
        const totalCell = document.createElement("td");
        const inputTotal = document.createElement("input");
        inputTotal.type = "number";
        inputTotal.value = "1";
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
    for (let i = 1; i <= fields; i++) {
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
    for (let i = 1; i <= fields; i++) {
        let countweight = parseFloat(document.getElementById(`assessmentWeight_${i}`).value);
        totalweight += countweight;
    }

    if (Math.abs(totalweight - 100) > 1e-6) { // Use a small tolerance for floating-point comparison
        if (window.confirm("Warning! Weight does not equate to 100%, calculation may be off. Proceed?") == true) {
            calculateFinalGrade();
        }
        // If the user cancels, the button's onclick remains the same, allowing them to edit.
    } else {
        calculateFinalGrade();
    }
}