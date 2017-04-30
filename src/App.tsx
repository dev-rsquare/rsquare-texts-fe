import * as React from 'react';
import * as logo from './logo.svg';
import './App.css';
import {TextList} from './components/list';
import {InputCell} from './components/cell';
import * as packageInfo from '../package.json';

interface S {
    items: Texts;
    fetching: boolean;
}
export class App extends React.Component<null, S> {
    private endpoint = packageInfo.texts.endpoint;
    private inputCell;
    state = {items: [], fetching: false};
    constructor(props) {
        super(props);
        this.createId = this.createId.bind(this);
        this.handleIdClicked = this.handleIdClicked.bind(this);
    }
    render() {
        const {items, fetching} = this.state;
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Texts</h2>
                </div>
                <div className="container-fluid">
                    {items.length === 0 && fetching
                        ? `데이터를 가져오는 중`
                        : <TextList items={items} onClick={this.handleIdClicked}/>}
                    <div className="row justify-content-md-center">
                        <InputCell ref={r => this.inputCell = r} className="col-md-10 col-sm-10" create={this.createId}/>
                    </div>
                </div>
            </div>
        );
    }
    async componentDidMount() {
        this.setState({fetching: true});
        const items = await this.getTexts();
        console.log(items);
        this.setState({fetching: false, items});
    }
    async createId(id, text) {
        let ret = false;
        let items = this.state.items;
        this.setState({fetching: true});
        try {
            await fetch([this.endpoint, id].join('/'), {method: 'post', body: JSON.stringify({text})});
            items = await this.getTexts();

            ret = true;
        } catch(ex) { }
        this.setState({fetching: false, items});
        return ret;
    }
    async getTexts(): Promise<Texts> {
        try {
            const response = await fetch(this.endpoint);
            const {items} = await response.json();

            return items;
        } catch(ex) {
            throw new Error('check package.json.texts.endpoint');
        }
    }
    handleIdClicked(id) {
        console.log('id', id);
        this.inputCell.setData(id);
    }
}
