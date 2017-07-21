import aframe from 'aframe';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import 'aframe-mouse-cursor-component';
import {Entity, Scene, Options} from 'aframe-react';
import React from 'react';
import Profile from './VRProfile.jsx';

class VRProfiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliceIndex: 5,
      friends: this.props.friends,
      friendsToShow: this.props.friends.slice(0, 5)
    };
    this.onMoreFriendsClick = this.onMoreFriendsClick.bind(this);
  }

  onMoreFriendsClick() {
    if (this.state.sliceIndex > this.state.friends.length) {
      this.setState({
        friendsToShow: this.props.friends.slice(0, 5),
        sliceIndex: 5
      });
    } else {
      this.setState({
        friendsToShow: this.state.friends.slice(this.state.sliceIndex, this.state.sliceIndex + 5),
        sliceIndex: this.state.sliceIndex + 5
      });
    }
  }



  render() {
    let x = -6;
    return (
      <Entity>

        <Entity
          geometry={{primitive: 'box', width: 1, height: 1, depth: 0.15}}
          material={{color: 'white', opacity: 0.5}}
          position={{x: -6, y: 0, z: -3.1}}
          events={{click: (() => this.onLeftClick())}}></Entity>

        <Entity
          text={{value: '<', align: 'center', color: 'white', width: 20}}
          position={{x: -6, y: 0, z: -3}}></Entity>

        <Entity
          geometry={{primitive: 'box', width: 1, height: 1, depth: 0.15}}
          material={{color: 'white', opacity: 0.5}}
          position={{x: 8.3, y: 0, z: -3.1}}
          events={{click: (() => this.onRightClick())}}></Entity>

        <Entity
          text={{value: '>', align: 'center', color: 'white', width: 20}}
          position={{x: 8.3, y: 0, z: -3}}></Entity>

        {
          this.state.friendsToShow.map((friend, i) => {
            x += 2.3;
            return (
              <Profile
                i={i}
                x={x}
                key={i}
                friend={friend}
                currentStory={this.props.currentStory}
                onFriendClick={this.props.onFriendClick}
              />
            );
          })
        }
      </Entity>
    );
  }
}

export default VRProfiles;
