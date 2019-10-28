let entryPoint = document.querySelector('.cards')

/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

axios
	.get("https://api.github.com/users/briannakeune")
	.then(resp => {
		entryPoint.appendChild(gitUserCard(resp.data));
		axios
			.get(resp.data.followers_url)
			.then(respTwo => {
				respTwo.data.forEach(i => {
					axios
						.get(i.url)
						.then(respThree => {
							entryPoint.appendChild(gitUserCard(respThree.data));
						})
						.catch(err => {
							console.log(err);
						});
				});
			})
			.catch(err => {
				console.log(err);
			});
	})
	.catch(err => {
		console.log(err);
  });
  
  /* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = [
//   tetondan,
//   dustinmyers,
//   justsml,
//   luishrd,
//   bigknell
// ];

// array method for 'followers'
// followersArray.forEach(i => {
//   axios.get('https://api.github.com/users/' + i)
//   .then((response) => {
//     entryPoint.appendChild(gitUserCard(response.data));
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// })

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function gitUserCard(user) {
	//elements
	const newCard = document.createElement("div");
	newCard.classList.add("card");

	const newImg = document.createElement("img");
	newImg.src = user.avatar_url;

	const cardInfo = document.createElement("div");
	cardInfo.classList.add("card-info");

	const name = document.createElement("h3");
	name.classList.add("name");
	name.textContent = user.name;

	const username = document.createElement("p");
	username.classList.add("username");
	username.textContent = `${user.login}`;

	const location = document.createElement("p");
	location.textContent = user.location;

	const profile = document.createElement("p");
	profile.textContent = `Profile: `;

	const profileLink = document.createElement("a");
	profileLink.setAttribute("href", "user.html_url");
	profileLink.textContent = `${user.html_url}`;

	const followers = document.createElement("p");
	followers.textContent = `Followers: ${user.followers}`;

	const following = document.createElement("p");
	following.textContent = `Following: ${user.following}`;

	const bio = document.createElement("p");
	bio.textContent = `Bio: ${user.bio || "none"}`;

	//appending
	newCard.appendChild(newImg);
	newCard.appendChild(cardInfo);
	cardInfo.appendChild(name);
	cardInfo.appendChild(username);
	cardInfo.appendChild(location);
	cardInfo.appendChild(profile);
	profile.appendChild(profileLink);
	cardInfo.appendChild(followers);
	cardInfo.appendChild(following);
	cardInfo.appendChild(bio);

	return newCard;
}
