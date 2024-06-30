// Name: Thiri Lae Win
// Class: DIT/1B/10
// ADM NO: 2340739
document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const taskList = document.getElementById("taskList");

        const displayItem = document.createElement("div");
        displayItem.className =
            "";
        displayItem.innerHTML = `
            <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Task ID</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
            ${getTaskDetails(responseData)}
              
            </tbody>
          </table>
          `;
        taskList.appendChild(displayItem);
    }


    fetchMethod(currentUrl + "/api/task", callback);

    function getTaskDetails(data) {
        let tbodyContent = '';
        data.forEach(task => {
            tbodyContent += `
                <tr>
                    <th scope="row">${task.task_id}</th>
                    <td>${task.title}</td>
                    <td>${task.description}</td>
                    <td>${task.points}</td>
                </tr>
            `;
        });
        return tbodyContent;
    }
});