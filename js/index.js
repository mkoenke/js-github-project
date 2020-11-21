//DOM elements
const form = document.querySelector("#github-form")
const userList = document.querySelector("#user-list")
const repoList = document.querySelector("#repos-list")


//event listeners
form.addEventListener("submit", handleForm)

//fetches user results

function handleForm(event){
    event.preventDefault()
    const name = event.target.search.value
    fetch(`https://api.github.com/search/users?q=${name}`)
    .then(response => response.json())
    .then(returnedObj => renderUsers(returnedObj.items));
}

//iterate through users array

function renderUsers(usersArray){
    usersArray.forEach(createUser)
}

//render Users on page

function createUser(user){
    userList.innerHTML = ""
    repoList.innerHTML = ""
    const userDiv = document.createElement("div")
   const avatar = document.createElement("img")
   avatar.src = user.avatar_url
   const username = document.createElement("h2")
   username.textContent = user.login
   const link = document.createElement("a")
   link.href = user.html_url
   link.textContent = "Link to Profile"
   const br = document.createElement("br")
   const br2 = document.createElement("br")
   const button = document.createElement("button")
   button.textContent = "Get User Repos"
   button.dataset.id = user.login
   userList.append(userDiv)
   userDiv.append(avatar, username, link, br, br2, button)
   button.addEventListener("click", fetchRepos)
}

//fetch user and repos

function fetchRepos(event){
    const login = event.target.dataset.id
    fetch(`https://api.github.com/users/${login}/repos`)
    .then(response => response.json())
    .then(reposArray => renderRepos(reposArray))
}

function renderRepos(reposArray){
    reposArray.forEach(createRepo)
}

function createRepo(repo){
    const li = document.createElement("li")
    li.textContent = repo.name
    repoList.append(li)
}