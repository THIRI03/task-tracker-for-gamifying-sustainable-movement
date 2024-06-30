// Name: Thiri Lae Win
// Class: DIT/1B/10
// ADM NO: 2340739
document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const user_id = urlParams.get("user_id");


    const callbackForUserInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const userInfo = document.getElementById("userInfo");

        if (responseStatus === 404) {
            userInfo.innerHTML = `${responseData.message}`;
            return;
        }
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
        

        userInfo.innerHTML = `
    <div class="card">
    <div class="card-body">
        <center>
            <p class="card-text">
                <h5 class="card-title">${responseData.username}</h5>
                User ID: ${responseData.user_id} <br>
                User Name: ${responseData.username} <br>
                Email: ${responseData.email} <br>
                Total Points: ${responseData.total_points}
            </p>
            <div class="row">
                <div class="col-md-6">
                    <a href="updateProfile.html?user_id=${user_id}" class="btn btn-outline-info">UPDATE PROFILE</a>
                </div>
                <div class="col-md-6">
                    <a href="#" class="btn btn-danger" id="deleteProfile">DELETE PROFILE</a>
                </div>
            </div>
        </center>
    </div>
</div>
`;

        const deleteButton = document.getElementById("deleteProfile");
        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            const callbackForDelete = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                window.location.href = "index.html";
            };
            fetchMethod(currentUrl + `/api/user/${user_id}`, callbackForDelete, 'DELETE');
        });
    };

    fetchMethod(currentUrl + `/api/user/${user_id}/points`, callbackForUserInfo);
});
