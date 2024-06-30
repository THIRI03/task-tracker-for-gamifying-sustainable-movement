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
`

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const userPetList = document.getElementById("userPetList");
        if(responseStatus == 404){
            const errorMessage = document.createElement("div");
            errorMessage.className = "alert alert-danger";
            errorMessage.innerHTML = "You don't have any pets yet. :(";
            userPetList.appendChild(errorMessage);
            return;
        }
        responseData.forEach((pet) => {
            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-4 col-lg-3 col-md-4 col-sm-6 col-12 p-3";
            const pet_id = pet.pet_id;
            const ownership_id = pet.ownership_id;
            displayItem.innerHTML = `
                <center>
                    <div class="card" style="background-color: #E0CCBE;">
                        <div class="card-body">
                            <h5 class="card-title">${pet.pet_name}</h5>
                            <p class="card-text">
                                Type: ${pet.type}<br>
                                Breed: ${pet.pet_breed}<br>
                                Hunger Level: ${pet.hunger_level}<br>
                            </p>
                            <div class="row">
                                <div class="col-md-6">
                                <center>
                                    <a href="#" class="btn btn-danger" id="deletePet">Delete</a>
                                </center>

                                </div>
                                
                            </div>
                        </div>
                    </div>
                </center>
            `;

            userPetList.appendChild(displayItem);

            const deleteButton = document.getElementById("deletePet");
            deleteButton.addEventListener("click", (event) => {
                event.preventDefault();
                const callbackForDelete = (responseStatus, responseData) => {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);
                    window.location.reload();
                };

                fetchMethod(`${currentUrl}/api/ownership/${ownership_id}`, callbackForDelete, 'DELETE');
            });
        });
    };

    fetchMethod(currentUrl + `/api/ownership/${user_id}/pet`, callback);
});
