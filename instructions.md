## Getting Started

The checkpoints below should be implemented as pairs. In pair programming, there are two roles: supervisor and driver.

The supervisor makes the decision on what step to do next. Their job is to describe the step using high level language ("Let's create a new model called Photo"). The supervisor normally has a browser open in case they need to do any research. The driver is typing and their role is to translate the high level task into code (rails generate model Photo).

After you finish each checkpoint, switch the supervisor and driver roles. The person on the right will be the first supervisor.

## Milestone 1: Setup Instagram and create-react-app

- Register an [Instagram App](https://www.instagram.com/developer/clients/register/)
  - Setup redirect to `http://localhost:3000`
  - Add users to sandbox
  - Enable implicit authentication
- `npm install -g create-react-app`
- `create-react-app instaclone`
- `cd instaclone`
- `yarn start`

## Milestone 2: Examine generated app

- Look at generated code
  - `public/index.html` => the html needed
  - `App.js` => your main application
  - `index.js` => mounts your main application onto `public/index.html`

- Add console.log() to render method
App.js
```
class App extends Component {
  render() {
    console.log('App.render'); # add this
    ...
  }
}
```

- Open console

- Reload your page

- See what happens

- Add a button that changes state
  - Difference between props and state
  - Let's have a title set by state with props as a fallback

- Constructor to set state

**App.js**
```
  constructor(props) {
    super(props)
    this.state = {
    }
  }
```

- Add a display for this state and add fallback prop

**App.js**
```
<h1 className="App-title">{this.state.title || this.props.title}</h1>
```

**index.js**
```
ReactDOM.render(<App title="React test fallback"/>, document.getElementById('root'));
```
- Check it out

- Add a method to change this state
App.js
```
const toggleTitle = () => {
  const newState = this.state.title ? null : 'Toggled state';
  this.setState({
    title: newState
  });
}
```
```
<a href="#" onClick={toggleTitle}>
  <img src={logo} className="App-logo" alt="logo" />
</a>
```

- Click button

== Milestone 3: Basic visuals using fake data ==

- Create some fake JSON data re: the posts you want to show
  - Maybe 3 posts
  - Steal urls from Instagram
    - Open up the chrome console and examine some urls
  - Fake up some JSON data to put into state
App.js
```
this.state = {
  posts: [
    {
      id: 1,
      image: "https://instagram.fsgn4-1.fna.fbcdn.net/t51.2885-15/e35/23594930_126440671464105_1598861271686447104_n.jpg",
      caption: "#Fall #celebrations at #home, as we are giving thanks to friends, family, and work accomplishments- and an #abundant life.",
      likes: 25
    },
    {...},
    {...}
  ]
}
```

- Create InstaList.js
InstaList.js
```
import React from 'react';

export default class InstaList extends React.Component {
  render() {
    return (
      <h2>Hi</h2>
    );
  }
}
```

- Link InstaList
App.js
```
import InstaList from 'InstaList.js';
```
```
<InstaList posts={this.state.posts}/>
```
InstaList.js
```
const posts = this.props.posts && this.props.posts.map((post) => {
  return (<img src={post.image}/>);
});
return (
  <div>
  {posts}
  </div>
);
```

- Create InstaPost.js
InstaPost.js
```
import React from 'react';

export default class InstaPost extends React.Component {
  render() {
    return (
      <img src={this.props.image}/>
    );
  }
}
```
InstaList.js
```
import InstaPost from './InstaPost.js';
```
```
const posts = this.props.posts && this.props.posts.map((post) => {
  return (<InstaPost {...post} />);
});
```

- Finish up InstaPost.js
InstaPost.js
```
<div>
  <img src={this.props.image}/>
  <p>{this.props.caption}</p>
  <p>{this.props.likes} Likes</p>
</div>
```

== Milestone 4: Sessions ==

- Understand implicit OAuth flow => request a token, get back a token on redirect
  - Not explicit OAuth flow where it trades code for token
  - Need an access token to make any API call

- Go to OAuth url
https://www.instagram.com/oauth/authorize/?client_id=e80738afb2c44cb08b8b2f60a6748221&redirect_uri=http://localhost:3000&response_type=token

- Note that it redirects to your localhost with a token in a hash

- We want to store token in sessionStorage
App.js
```
componentWillMount() {
  const key = 'token';
  console.log('mounted');
  const existingToken = sessionStorage.getItem(key);
  console.log(existingToken);
  const accessToken = window.location.hash.split("=")[1];
  console.log(accessToken);
}  
```
- redirect to OAuth url if we don't have a token
App.js
```
if (!accessToken && !existingToken) {
  window.location.replace(oauthUrl);
}
```

- If we got a new access token
```
if (accessToken) {
  console.log(`New access token: ${accessToken}`);
  sessionStorage.setItem("token", accessToken);
  this.setState({
    token: accessToken
  });
}
```

- Set state if we have in sessionStorage
```
if (existingToken) {
  this.setState({
    token: existingToken
  });
}
```
  
- Use state.token to make a single call
  - Just console.log the results of this

== Milestone 5: Link API call ==
- Distinguish between containers and display components

- Create a container component InstaContainer.js and rewire state
InstaContainer.js
```
import React from 'react';
import InstaList from './InstaList.js';

export default class InstaContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [...]
    }
  }  

  render() {
    return (
      <InstaList posts={this.state.posts}/>
    );
  }
}
```
App.js
```
import InstaContainer from './InstaContainer.js';
-- import InstaList
```
```
constructor(props) {
  super(props)
  this.state = {};
}
```
```
<InstaContainer token={this.state.token}/>
```

- create a loadData method in the container
`yarn add fetch-jsonp`

InstaContainer.js
```
import fetchJsonp from 'fetch-jsonp';
```
```
this.state = {};
```

https://www.instagram.com/developer/endpoints/users/
```
componentWillMount() {
  this.loadData.bind(this)();
}

loadData() {
    this.setState({
      loading: true
    });
    
    fetchJsonp(`https://api.instagram.com/v1/users/self/media/recent?access_token=${this.props.token}`)
      .then((data) => {
        return data.json();
      }).then((json) => {
        this.setState({
          posts: json,
          loading: false
        })
      });  
}
```

- Link loading into display container
InstaContainer.js
```
render() {
  console.log(this.state.posts);
  return (
    <InstaList 
      posts={[]} loading={this.state.loading} />
  );
}
```
InstaList.js
```
import logo from './logo.svg';
```
```
return (
  <div>
    <img src={logo} 
             className="App-logo" 
             alt="logo"
             hidden={!this.props.loading}/> 
    {posts}
  </div>
);
```

- Check out loading dynamics

- Link data into your display component
InstaContainer.js
```
render() {
  const posts = this.state.posts && this.state.posts.data;
  return (
    <InstaList posts={posts} loading={this.state.loading}/>
  );
}
```
InstaPost.js
```
console.log(this.props);
```

- Link data into InstaPost.js
InstaPost.js
```
<div>
  <img src={this.props.images.standard_resolution.url}/>
  <p>{this.props.caption.text}</p>
  <p>{this.props.likes.count} Likes</p>
</div>
```

== Bonus 1: Make it look good ==

importing css and using css to style

== Bonus 2: Like and unlike photos ==

passing functions from container into display

== Bonus 3: Display different sets of photos ==

routing

- yarn add react-router-dom
- https://www.instagram.com/developer/endpoints/users/
  - self/liked
  - specific user
  - locations
  - tags

== Bonus 4: Profile page ==


== Bonus 5: View a set of likes or comments ==

- yarn add react-modal
- https://www.instagram.com/developer/endpoints/likes/
- https://www.instagram.com/developer/endpoints/comments/
- A list of 
