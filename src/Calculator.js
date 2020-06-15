import React from 'react';
import './App.css';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: "",
            error: false,
        };

        this.clear = this.clear.bind(this);
        this.del = this.del.bind(this);

        this.buttons = [
            {value: 'AC', type: "operation",id: 'clear', class:"del" ,onClick: this.clear},
            {value: "Del", type: "operation",id: "delete",class:"del", onClick: this.del},
            {value: "=", type: "operation",id: "equal", class: "equal", onClick: this.solve},
            {value: "/", type: "operation",id: "divide",class:"operation", onClick: this.display},
            {value: "7", type: "number",id: "7", onClick: this.display},
            {value: "8", type: "number",id: "8", onClick: this.display},
            {value: "9", type: "number",id: "9", onClick: this.display},
            {value: "*", type: "operation",id: "multiply",class:"operation", onClick: this.display},
            {value: "4", type: "number",id: "4", onClick: this.display},
            {value: "5", type: "number",id: "5", onClick: this.display},
            {value: "6", type: "number",id: "6", onClick: this.display},
            {value: "-", type: "operation",id: "subtract",class:"operation", onClick: this.display},
            {value: "1", type: "number",id: "1", onClick: this.display},
            {value: "2", type: "number",id: "2", onClick: this.display},
            {value: "3", type: "number",id: "3", onClick: this.display},
            {value: "+", type: "operation",id: "add",class:"operation", onClick: this.display},
            {value: "0", type: "number",id: "0", class: "zero", onClick: this.display},
            {value: ".", type: "number",id: "dot", onClick: this.display},
            {value: "%", type: "operation",id: "percentile",class:"operation", onClick: this.display},
        ]
    }

    display(button) {
        let result = this.state.result;
        result = result + "" + button.value;


        if(result === "Math Error") {
            result = button.value;
        }
        this.setState({
            result: result,
            error: false,
        })
    }

    solve() {
        let result = this.state.result;


        try {
            result = Function('"use strict";return (' + result + ')')();
            if (!isFinite(result)) {
                this.setState({
                    error: true,
                    result: "",
                })
            } else {
                this.setState({
                    result: result,
                })
            }
        } catch (e) {
            this.setState({
                error: true,
                result: "",
            })
        }

    }

    del() {
        let result = this.state.result || "";
        if (result) {
            result.trim()
        }
        this.setState({
            result: result.slice(0, result.length - 1).trim(),
            error: false,
        })
    }

    clear() {
        this.setState({
            result: "",
            error: false,
        })
    }

    render() {
        var self = this;
        return (
            <div className="calculator">
                <div className={"header"}>Simple Calculator</div>
                <div>
                    <input
                        id={"result"}
                        className={"result"}
                        disabled={true}
                        value={this.state.error ? "Math Error" : (this.state.result || "0")}
                    />
                </div>
                <div className={"buttons"}>
                    {
                        this.buttons.map(function (btn, index) {
                            return (<div
                                className={(btn.class || "") + " btn"}
                                key={"btn_" + index}
                                id={btn.id}
                                onClick={(e) => {btn.onClick.call(self,btn,e)}}
                            >
                                {btn.value}
                            </div>);
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Calculator;
