let grades = []

async function genGrades() {
    const list = document.querySelector('.gradesList')
    let html = ''
    let grades = ''
    let avg = 0
    let grades_together = 0

    grades = await (await fetch('http://localhost:3010/API/GRADES')).json()
        .then(result => {
            result.forEach(element => {
                grades += `<p class="sub">${element.subject}</p>`
                element.grades.forEach(grade => {
                    if (grade < 3)
                        grades += `<p class="bad">${grade}</p>`;
                    else
                        grades += `<p>${grade}</p>`;
                    avg += grade
                    grades_together += 1
                })

                html += `
                            <div class="grade-line">
                            ${grades}
                            </div>
                        `
                grades = ''
            });
            avg = Math.round(avg / grades_together)
            html += `<div class="extra">
                <p>keskmine</p>
                <p class="avg">${avg}</p>
            </div>`
            list.innerHTML = html
        })


    html = ''

    const subject_list = document.querySelector('.classesList')
    await (await fetch('http://localhost:3010/API/SUBJECT_BY_USER')).json()
        .then(result => {
            console.log(result)
            result.forEach(element => {
                if (element.progress == "läbikukkunud") {
                    html += `
                <div class="classFailed class">
                    <h5>${element.name}</h5>
                    <h5>${element.progress}</h5>
                </div>`
                } else if (element.progress == "läbitud") {
                    html += `
                <div class="classCompleted class">
                    <h5>${element.name}</h5>
                    <h5>${element.progress}</h5>
                </div>`
                } else {
                    html += `
                <div class="class">
                    <h5>${element.name}</h5>
                    <h5>${element.progress}</h5>
                </div>`
                }
            })
            subject_list.innerHTML = html
        })

}

async function genSchedule() {
    const list = document.querySelector(".scheduleList")
    let schedule
    let html = ""

    schedule = await (await fetch('http://localhost:3010/API/SCHEDULE')).json()
        .then(result => {
            result.forEach(element => {
                html += `<div class="class">
                    <div class="info">
                        <h3>${element.name}</h3>
                        <h6>${element.subjects}</h6>
                    </div>
                    <div class="info2">
                        <p>${element.time}</p>
                        <p>${element.teacher}</p>
                    </div>
                </div>`
            })
            list.innerHTML = html
        })

}

async function genLetter() {
    const testlist = document.querySelector('.diaryList')
    let letters
    let html = ""

    letters = await (await fetch('http://localhost:3010/API/LETTERS')).json()
        .then(result => {
            result.forEach(element => {
                html += `<div class="diary">
                        <h5>${element.text}</h5>
                        <div class="extra">
                            <p>${element.class}</p>
                            <p>${element.teacher}</p>
                        </div>
                </div>`
            })
            testlist.innerHTML = html
        })
}

genGrades()

genSchedule()

genLetter()

function showH() {
    document.querySelector("#hBtn").classList.add("active")
    document.querySelector("#pBtn").classList.remove("active")
    document.querySelector("#tpBtn").classList.remove("active")

    document.querySelector(".grades").classList.remove("d-none")
    document.querySelector(".schedule").classList.add("d-none")
    document.querySelector(".diary").classList.add("d-none")
}

function showTp() {
    document.querySelector("#hBtn").classList.remove("active")
    document.querySelector("#pBtn").classList.remove("active")
    document.querySelector("#tpBtn").classList.add("active")

    document.querySelector(".grades").classList.add("d-none")
    document.querySelector(".schedule").classList.remove("d-none")
    document.querySelector(".diary").classList.add("d-none")
}

function showP() {
    document.querySelector("#hBtn").classList.remove("active")
    document.querySelector("#pBtn").classList.add("active")
    document.querySelector("#tpBtn").classList.remove("active")

    document.querySelector(".grades").classList.add("d-none")
    document.querySelector(".schedule").classList.add("d-none")
    document.querySelector(".diary").classList.remove("d-none")
}