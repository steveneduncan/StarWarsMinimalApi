import { Component } from "react";
import { NavMenu } from "./NavMenu";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <NavMenu />
        <div className="container mx-auto px-4" role="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}
