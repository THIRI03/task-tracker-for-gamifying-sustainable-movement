// Name: Thiri Lae Win
// Class: DIT/1B/10
// ADM NO: 2340739
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const user_id = urlParams.get("user_id");
    navBar.innerHTML = `
    <div class="collapse navbar-collapse" id="navbarNav">
    <!-- me-auto: margin-right: auto -->
    <ul class="navbar-nav me-auto">
        <li class="nav-item">
            <a class="nav-link" href="profile.html?user_id=${user_id}">Profile</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="showUserOwnedPets.html?user_id=${user_id}">Pets</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="showUserTask.html?user_id=${user_id}">Tasks</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="showUserRewards.html?user_id=${user_id}">Rewards</a>
        </li>
        <li class="nav-item">
            <a id="padLetLink" class="nav-link" href="showAllMessages.html?user_id=${user_id}">Padlet</a>
        </li>
    </ul>

    <div class="d-flex align-items-center">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a id="myMessagesLink" href="singleUserMessage.html?user_id=${user_id}" class="nav-link">My Messages</a>
            </li>
            <li class="nav-item">
                <a id="newMessageLink" href="addNewMessage.html?user_id=${user_id}" class="nav-link">New Message</a>
            </li>
        </ul>

        <div id="userLogo" style="width: 100px; margin-left: auto;">
            <img src="./images/user.png" alt="" style="width: 50%;">
        </div>
    </div>
</div>
    `;
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const userTaskList = document.getElementById("userTaskList");
        if(responseStatus == 404){
            const errorMessage = document.createElement("div");
            errorMessage.className = "alert alert-danger";
            errorMessage.innerHTML = "You don't have any progress yet. :(. Please come again.";
            userTaskList.appendChild(errorMessage);
            return;
        }
        // Rest of the code will be added here
        const displayItem = document.createElement("div");
        displayItem.className =
            "";
        displayItem.innerHTML = `
            <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Task Progress ID</th>
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
          userTaskList.appendChild(displayItem);
    }


    fetchMethod(currentUrl + `/api/taskProgress/${user_id}`, callback);

    function getTaskDetails(data) {
        let tbodyContent = '';
        data.forEach(taskprogress => {
            tbodyContent += `
                <tr>
                    <th scope="row">${taskprogress.progress_id}</th>
                    <td>${taskprogress.title}</td>
                    <td>${taskprogress.description}</td>
                    <td>${taskprogress.points}</td>
                </tr>
            `;
        });
        return tbodyContent;
    }
});