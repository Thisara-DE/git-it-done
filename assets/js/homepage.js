var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function(event){
    event.preventDefault();
    
    var userName = nameInputEl.value.trim();

    if(userName) {
        getUserRepos(userName);
        nameInputEl.value = "";
    }
    else {
        alert("Please enter a GitHub username");
    }
} 

var displayRepos = function(repos, searchTerm) {
    // check if api returned any repos
    if(repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for(var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create span element to hold the repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if(repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        
        // append to container
        repoEl.appendChild(statusEl)

        // append container to DOM
        repoContainerEl.appendChild(repoEl);
    }

}

var getUserRepos = function(user) {
    // format the github API URL
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the URL    
    fetch(apiUrl)
        .then(function(response) {
            // if the HTTP request status code is in the 200s, ok will return true
            if(response.ok) {
                response.json().then(function(data) {
                    displayRepos(data, user);
                }); 
            } else {
                    alert("Error: GitHub User Not Found");
                }
        })
        .catch(function(error) {
            // notice this '.catch()' getting chained into the end of the '.then()'
            alert("Unable to connect to GitHub");
        });
}





userFormEl.addEventListener("submit", formSubmitHandler);