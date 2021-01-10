import React, {Component} from "react";

class Welcome extends Component {

    constructor() {
        super();
        this.state = {
            img: "./background1.jpg"
        }
    }

    render() {
        return (
            <div>
                <img src={this.state.img}/>
            </div>
        );
    }
}

export default Welcome