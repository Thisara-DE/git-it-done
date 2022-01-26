var getUserRepos = function(user) {
    // format the github API URL
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the URL    
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });

    });
}

getUserRepos("microsoft");