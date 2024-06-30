// Name: Thiri Lae Win
// Class: DIT/1B/10
// ADM NO: 2340739
document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const petList = document.getElementById("petList");
        responseData.forEach((pet) => {
            const displayItem = document.createElement("div");
            displayItem.className =
                "col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 p-3";
            displayItem.innerHTML = `
          <div class="card">
              <div class="card-body">
              <h5 class="card-title">${pet.pet_name}</h5>
                  <p class="card-text">
                      Type of Pet: ${pet.type}
                  </p>
                  <a href="showSinglePetDetails.html?pet_id=${pet.pet_id}" class="btn btn-primary">View Details</a>
              </div>
          </div>
          `;
            petList.appendChild(displayItem);
        });
    };

    fetchMethod(currentUrl + "/api/pet", callback);
});