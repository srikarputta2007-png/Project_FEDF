// Application State (Reactive State)
    let students = [
      { id: 1, name: "Rahul", status: "Present" },
      { id: 2, name: "Anjali", status: "Absent" }
    ];

    // Virtual DOM Representation
    let virtualDOM = [];

    // Render Function (Declarative UI)
    function renderUI() {

      // Create Virtual DOM Copy
      virtualDOM = [...students];

      const studentList = document.getElementById("studentList");

      // Clear Real DOM
      studentList.innerHTML = "";

      // Reconciliation Logic
      virtualDOM.forEach(student => {

        const studentDiv = document.createElement("div");
        studentDiv.className = "student";

        studentDiv.innerHTML = `
          <div>
            <h3>${student.name}</h3>
            <p class="${student.status === 'Present' ? 'present' : 'absent'}">
              Status: ${student.status}
            </p>
          </div>

          <div>
            <button class="toggle-btn" onclick="toggleAttendance(${student.id})">
              Toggle
            </button>

            <button class="delete-btn" onclick="deleteStudent(${student.id})">
              Delete
            </button>
          </div>
        `;

        // Real DOM Update
        studentList.appendChild(studentDiv);
      });
    }

    // Add Student
    function addStudent() {
      const input = document.getElementById("studentName");

      if (input.value.trim() === "") {
        alert("Please enter student name");
        return;
      }

      // Immutability Concept
      students = [
        ...students,
        {
          id: students.length + 1,
          name: input.value,
          status: "Absent"
        }
      ];

      input.value = "";

      renderUI();
    }

    // Toggle Attendance
    function toggleAttendance(id) {

      students = students.map(student => {

        if (student.id === id) {
          return {
            ...student,
            status: student.status === "Present"
              ? "Absent"
              : "Present"
          };
        }

        return student;
      });

      renderUI();
    }

    // Delete Student
    function deleteStudent(id) {

      students = students.filter(student => student.id !== id);

      renderUI();
    }

    // Initial Rendering Pipeline
    renderUI();
