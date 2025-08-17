import React, { Component } from "react";
// Removed Material UI imports
import { Link } from "react-router-dom";
import "./NavMenu.css";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);
    this.state = { anchorEl: null };
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    return (
      <nav className="bg-gray-800 p-4 mb-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-white text-xl font-bold">
            Star Wars Api
          </Link>
        </div>
      </nav>
    );
  }
}
