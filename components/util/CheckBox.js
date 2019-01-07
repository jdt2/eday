import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';

export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheck: false,
      hasChanged: false,
    };
  }

  componentDidMount() {
  }

  checkClicked = async () => {
    if(this.props.checked) {
      await this.setState({
        isCheck: false,
      }); // setState is async function.
    } else {
      await this.setState(prevState => ({
        isCheck: !prevState.isCheck,
      })); // setState is async function.
    }
    if(!this.state.hasChanged) {
      await this.setState({hasChanged: true});
    }

    // Call function type prop with return values.
    this.props.clicked && this.props.clicked(this.props.value, this.state.isCheck);
  }

  render() {

    let icon = "";
    if(this.state.hasChanged) {
      icon = this.state.isCheck ? "check-box" : "check-box-outline-blank";
    } else {
      /* if(this.props.checked && !this.state.isCheck) {
        this.setState({isCheck: this.props.checked});
        alert(this.state.isCheck);
      } */
      if(this.props.checked === undefined || this.props.checked === null) {
        icon = "check-box-outline-blank";
      } else {
        /* console.log("this.props.checked: " + this.props.checked); */
        icon = this.props.checked ? "check-box" : "check-box-outline-blank";
      }
    }

    return (
      <TouchableOpacity onPress={this.checkClicked} style={this.props.style}>
        <Icon
          name={icon}
          type="MaterialIcons"
          style={{fontSize: 24, color: "#3FB0B9"}}
        />
      </TouchableOpacity>
    )
  }
}


/* const products = [
  {
    id: 1
  },
  {
    id: 2
  },
  {
    id: 3
  }
]; */

/* export default class CheckBoxScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
    }
  }

  toggleCheckBox = (id, isCheck) => {
    let { checkSelected } = this.state;
    if (isCheck) {
      checkSelected.push(id);
    } else { // remove element
      var index = checkSelected.indexOf(id);
      if (index > -1) {
        checkSelected.splice(index, 1);
      }
    }

    this.setState({ checkSelected });

    alert(this.state.checkSelected); // logging
  }

  render() {
    const checkboxs = products.map(({id}) =>
      <CheckBox style={{marginTop: 50,}}key={id} value={id} clicked={(id, isCheck) => this.toggleCheckBox(id, isCheck)}></CheckBox>
    )

    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        {checkboxs}
      </View>
    );
  }
} */