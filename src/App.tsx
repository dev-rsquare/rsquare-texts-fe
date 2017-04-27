import * as React from 'react';
import * as logo from './logo.svg';
import './App.css';
import {TextList} from './components/list';
import {InputCell} from './components/cell';

interface P {
}
export class App extends React.Component<P, null> {
    render() {
        const items = [
            {id: 'id-01', text: 'test 01'} as Text,
            {id: 'id-02', text: 'test 02'} as Text,
            {id: 'id-03', text: 'test 03'} as Text,
            {id: 'id-04', text: 'test 04'} as Text,
            {id: 'id-05', text: 'test 05'} as Text
        ];
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Texts</h2>
                </div>
                <div className="container-fluid">
                    <TextList items={items}/>
                    <div className="row justify-content-md-center">
                        <InputCell className="col-md-10" create={this.createId}/>
                    </div>
                </div>
            </div>
        );
    }
    async createId() {
        return false;
    }
}
