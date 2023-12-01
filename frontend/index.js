const studentForm = document.getElementById('studentForm');
const url = "https://studentmanagement-1phx.onrender.com/Student/";

studentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const studentId = document.getElementById('studentId').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;

    fetch(`${url}/add/`, {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, studentId, dob, gender, address }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.message === "New Student Added") {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "New Student Added",
                    showConfirmButton: false,
                    timer: 1500,
                });

            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${data.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
            document.getElementById('firstName').value = "";
            document.getElementById('lastName').value = "";
            document.getElementById('studentId').value = "";
            document.getElementById('dob').value = "";
            document.getElementById('gender').value = "";
            document.getElementById('address').value = "";
            fetchData();
        })
        .catch((err) => {
            console.log(err);
        });
});

fetchData();

async function fetchData() {
    try {
        const res = await fetch(`${url}/allStudent`);
        const data = await res.json();
        displayData(data.students)
    } catch (error) {
        console.log(error);
    }
}


let tbodyEl = document.querySelector("tbody");

function displayData(data) {
    tbodyEl.innerHTML = "";

    data.forEach(element => {
        let tr = document.createElement("tr");

        let firstName = document.createElement("td");
        firstName.innerText = element.firstName
        let lastName = document.createElement("td");
        lastName.innerText = element.lastName;
        let studentId = document.createElement("td");
        studentId.innerText = element.studentId;
        let dob = document.createElement("td");
        const date = new Date(element.dob);
        const formattedDate = date.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

        dob.innerText = formattedDate

        let gender = document.createElement("td");
        gender.innerText = element.gender;
        let address = document.createElement("td");
        address.innerText = element.address;

        let update = document.createElement("td");
        let edit = document.createElement("td")
        let updatebtn = document.createElement("button")
        let deletebtn = document.createElement("button")

        updatebtn.innerText = "Update"
        updatebtn.className = "updatebtn"
        updatebtn.setAttribute("data-id", element._id);
        deletebtn.innerText = "Delete"
        deletebtn.className = "deletebtn"
        deletebtn.setAttribute("data-id", element._id);


        updatebtn.addEventListener("click", (e) => {
            if (e.target.classList.contains("updatebtn")) {
                const studentId = e.target.getAttribute("data-id");
                updateStudent(studentId);
            }
        })

        deletebtn.addEventListener("click", (e) => {
            if (e.target.classList.contains("deletebtn")) {
                const studentId = e.target.getAttribute("data-id");
                deleteStudent(studentId);
            }
        })

        update.append(updatebtn);
        edit.append(deletebtn)
        tr.append(firstName, lastName, studentId, dob, gender, address, update, edit)
        tbodyEl.append(tr);
    });


}

function deleteStudent(studentId) {
    fetch(`${url}/delete/${studentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            if (data.message === "Student data deleted") {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Student Data Deleted",
                    showConfirmButton: false,
                    timer: 1500,
                });
                fetchData();
            } else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${data.message}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        })
        .catch((err) => {
            console.log(err);
        });
}


function updateStudent(studentId) {
    fetch(`${url}/${studentId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.student);
            
            const date = new Date(data.student.dob);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;



            document.getElementById('firstName1').value = data.student.firstName;
            document.getElementById('lastName1').value = data.student.lastName;
            document.getElementById('studentId1').value = data.student.studentId;
            document.getElementById('dob1').value = formattedDate;
            document.getElementById('gender1').value = data.student.gender;
            document.getElementById('address1').value = data.student.address;

            const updateCards = document.getElementsByClassName('studentupdatecard');
            for (const card of updateCards) {
                card.style.display = 'flex';
            }

            const studentForm = document.getElementById('studentupdateForm');

            const Id = data.student._id

            studentForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const firstName = document.getElementById('firstName1').value;
                const lastName = document.getElementById('lastName1').value;
                const studentId = document.getElementById('studentId1').value;
                const dob = document.getElementById('dob1').value;
                const gender = document.getElementById('gender1').value;
                const address = document.getElementById('address1').value;

                fetch(`${url}/update/${Id}`, {
                    method: "PUT",
                    body: JSON.stringify({ firstName, lastName, studentId, dob, gender, address }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.message === "Student updated") {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Student updated",
                                showConfirmButton: false,
                                timer: 1500,
                            });

                        } else {
                            Swal.fire({
                                position: "center",
                                icon: "error",
                                title: `${data.message}`,
                                showConfirmButton: false,
                                timer: 1500,
                            });
                        }
                        document.getElementById('firstName1').value = "";
                        document.getElementById('lastName1').value = "";
                        document.getElementById('studentId1').value = "";
                        document.getElementById('dob1').value = "";
                        document.getElementById('gender1').value = "";
                        document.getElementById('address1').value = "";

                        const updateCards = document.getElementsByClassName('studentupdatecard');
                        for (const card of updateCards) {
                            card.style.display = 'none';
                        }

                        fetchData();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });

        })
        .catch((err) => {
            console.log(err);
        });
}