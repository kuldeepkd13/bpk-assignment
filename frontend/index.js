const studentForm = document.getElementById('studentForm');
const url = "https://enchanting-slug-fez.cyclic.app/Student/";
const tbodyEl = document.querySelector("tbody");

studentForm.addEventListener("submit", async (e) => {
    e.preventDefault();


    const enteredDOB = document.getElementById('dob').value;
    const currentDate = new Date();
    const enteredDate = new Date(enteredDOB);

    
    if (enteredDate > currentDate) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "DOB cannot be a future date",
            showConfirmButton: false,
            timer: 1500,
        });
        return; 
    }

    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        studentId: document.getElementById('studentId').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
    };

    try {
        await postData(`${url}/add/`, formData);
        Swal.fire({
            position: "center",
            icon: "success",
            title: "New Student Added",
            showConfirmButton: false,
            timer: 1500,
        });
        document.getElementById('firstName').value = "";
        document.getElementById('lastName').value = "";
        document.getElementById('studentId').value = "";
        document.getElementById('dob').value = "";
        document.getElementById('gender').value = "";
        document.getElementById('address').value = "";

        fetchData();
    } catch (error) {
        console.error(error);
        Swal.fire({
            position: "center",
            icon: "error",
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 1500,
        });
    }
});

async function postData(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}


fetchData();

async function fetchData() {
    try {
        const res = await fetch(`${url}/allStudent`);
        const data = await res.json();
        displayData(data.students);
    } catch (error) {
        console.error(error);
    }
}

function displayData(data) {
    tbodyEl.innerHTML = "";

    data.forEach(element => {
        let tr = document.createElement("tr");
        let firstName = document.createElement("td");
        let lastName = document.createElement("td");
        let studentId = document.createElement("td");
        let dob = document.createElement("td");
        let gender = document.createElement("td");
        let address = document.createElement("td");
        let update = document.createElement("td");
        let edit = document.createElement("td")
        let updatebtn = document.createElement("button")
        let deletebtn = document.createElement("button")


        firstName.innerText = element.firstName
        lastName.innerText = element.lastName;
        studentId.innerText = element.studentId;
        const date = new Date(element.dob);
        const formattedDate = date.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        dob.innerText = formattedDate
        gender.innerText = element.gender;
        address.innerText = element.address;
        updatebtn.innerText = "Update"
        updatebtn.className = "updatebtn"
        updatebtn.setAttribute("data-id", element._id);
        deletebtn.innerText = "Delete"
        deletebtn.className = "deletebtn"
        deletebtn.setAttribute("data-id", element._id);


        

        update.append(updatebtn);
        edit.append(deletebtn)
        tr.append(firstName, lastName, studentId, dob, gender, address, update, edit)
        tbodyEl.append(tr);
    });


}


let currentStudentId = null;

document.addEventListener('click', (e) => {
    if (e.target.classList.contains("updatebtn")) {
        currentStudentId = e.target.getAttribute("data-id");
        updateStudent(currentStudentId);
    } else if (e.target.classList.contains("deletebtn")) {
        const studentId = e.target.getAttribute("data-id");
        deleteStudent(studentId);
    }
});


async function updateStudent(studentId) {
    try {
        const response = await fetch(`${url}/${studentId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

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

    } catch (error) {
        console.error(error);
    }
}

const studentUpdateForm = document.getElementById('studentupdateForm');

studentUpdateForm.addEventListener("submit", async (e) => {
    e.preventDefault();


    const enteredDOB = document.getElementById('dob1').value;
    const currentDate = new Date();
    const enteredDate = new Date(enteredDOB);

    
    if (enteredDate > currentDate) {
        Swal.fire({
            position: "center",
            icon: "error",
            title: "DOB cannot be a future date",
            showConfirmButton: false,
            timer: 1500,
        });
        return; 
    }


    const updatedData = {
        firstName: document.getElementById('firstName1').value,
        lastName: document.getElementById('lastName1').value,
        studentId: document.getElementById('studentId1').value,
        dob: document.getElementById('dob1').value,
        gender: document.getElementById('gender1').value,
        address: document.getElementById('address1').value,
    };



    try {
        await putData(`${url}/update/${currentStudentId}`, updatedData);

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Student updated",
            showConfirmButton: false,
            timer: 1500,
        });

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
    } catch (error) {
        console.error(error);

        Swal.fire({
            position: "center",
            icon: "error",
            title: `${error.message}`,
            showConfirmButton: false,
            timer: 1500,
        });
    }
});


async function deleteStudent(studentId) {
    try {
        const response = await fetch(`${url}/delete/${studentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

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
    } catch (error) {
        console.error(error);
    }
}

async function putData(url, data) {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    return response.json();
}