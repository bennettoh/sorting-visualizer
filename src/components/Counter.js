import React from 'react';


export default class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: []
        };
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(Math.floor(Math.random() * 100));
        }
        this.setState(array);
    }

    render() {
        const array = this.state;
        return (
            <div className="array-container">
                <button onClick={() => this.resetArray()}>Generate New Array</button>
            </div>
        );
    }
}