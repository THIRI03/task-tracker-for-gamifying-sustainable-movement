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
        
        const userRewardList = document.getElementById("userRewardList");
        if(responseStatus == 404){
            const errorMessage = document.createElement("div");
            errorMessage.className = "alert alert-danger";
            errorMessage.innerHTML = "You don't have any rewards yet. :(. Please come again.";
            userRewardList.appendChild(errorMessage);
            return;
        }
        const displayItem = document.createElement("div");
        displayItem.className = "";
        displayItem.innerHTML = `
            <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">User Reward ID</th>
                <th scope="col">Reward</th>
                <th scope="col">Date Claimed</th>
              </tr>
            </thead>
            <tbody>
              ${getRewardDetails(responseData)}
            </tbody>
          </table>
          `;
        userRewardList.appendChild(displayItem);
    };

    fetchMethod(`${currentUrl}/api/userRewardRel/${user_id}`, callback);

    function getRewardDetails(data) {
        let tbodyContent = '';
        data.forEach(userRewardsRel => {
            tbodyContent += `
                <tr>
                    <th scope="row">${userRewardsRel.userReward_id}</th>
                    <td>${userRewardsRel.reward}</td>
                    <td>${userRewardsRel.date_claimed}</td>
                </tr>
            `;
        });
        return tbodyContent;
    }
});
