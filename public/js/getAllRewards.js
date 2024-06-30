// Name: Thiri Lae Win
// Class: DIT/1B/10
// ADM NO: 2340739
document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const rewardList = document.getElementById("rewardList");

        const displayItem = document.createElement("div");
        displayItem.className =
            "";
        displayItem.innerHTML = `
            <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Reward ID</th>
                <th scope="col">Minimum Points</th>
                <th scope="col">Reward</th>
                <th scope="col">Created ON</th>
              </tr>
            </thead>
            <tbody>
            ${getRewardDetails(responseData)}
              
            </tbody>
          </table>
          `;
        rewardList.appendChild(displayItem);
    }


    fetchMethod(currentUrl + "/api/reward", callback);

    function getRewardDetails(data) {
        let tbodyContent = '';
        data.forEach(rewards => {
            tbodyContent += `
                <tr>
                    <th scope="row">${rewards.reward_id}</th>
                    <td>${rewards.minimum_points}</td>
                    <td>${rewards.reward}</td>
                    <td>${rewards.created_on}</td>
                </tr>
            `;
        });
        return tbodyContent;
    }
});