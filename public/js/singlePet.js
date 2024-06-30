// Name: Thiri Lae Win
// Class: DIT/1B/10
// ADM NO: 2340739
document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const petId = urlParams.get("pet_id");
  
    const callbackForSinglePetInfo = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const singlePetInfo = document.getElementById("singlePetInfo");
  
      if (responseStatus == 404) {
        singlePetInfo.innerHTML = `${responseData.message}`;
        return;
      }
  
      singlePetInfo.innerHTML = `
          <div class="card" style="background-color: #487697;">
              <div class="card-body">
                  <p class="card-text" style="color: white;">
                  Pet ID: ${responseData.pet_id} <br>
                      Pet Name: ${responseData.pet_name} <br>
                      Pet Type: ${responseData.type} <br>
                      Hunger Level: ${responseData.hunger_level} <br>
                      Activity Needed: ${responseData.activity} <br>
                      Grooming Needed: ${responseData.grooming} <br>
                      Created On: ${responseData.created_on}
                  </p>
              </div>
          </div>
      `;
    };
  
    fetchMethod(currentUrl + `/api/pet/${petId}`, callbackForSinglePetInfo);
  });