import * as React from 'react';
import * as logo from './logo.svg';
import './App.css';
import {TextList} from './components/list';
import {InputCell} from './components/cell';
import {IntlProvider, addLocaleData, FormattedMessage} from 'react-intl';
import * as packageInfo from '../package.json';

interface S {
    items: Texts;
    fetching: boolean;
}
export class App extends React.Component<null, S> {
    private endpoint = packageInfo.texts.endpoint;
    private inputCell;
    private intl: {[key: string]: string;}|any = {
        test: {
            defaulitMessage: `default message {name}`,
            value: {name: 'test default message'}
        }
    };
    state = {items: [], fetching: false};
    constructor(props) {
        super(props);
        this.createId = this.createId.bind(this);
        this.handleIdClicked = this.handleIdClicked.bind(this);
    }
    render() {
        const {items, fetching} = this.state;
        console.log(this.intl);
        return (
            <IntlProvider locale="ko" messages={this.intl}>
                <div className="App">
                    <FormattedMessage id="test_id_01"
                                      defaultMessage={`Hello {name}`}
                                      values={{name: <b>{this.intl.test_id_01}</b>}}
                    />
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h2>Texts</h2>
                    </div>
                    <div className="container-fluid">
                        {items.length === 0 && fetching
                            ? `loading...`
                            : <TextList items={items} onClick={this.handleIdClicked}/>}
                        <div className="row justify-content-md-center">
                            <InputCell ref={r => this.inputCell = r} className="col-md-10 col-sm-10" create={this.createId}/>
                        </div>
                    </div>
                </div>
            </IntlProvider>
        );
    }
    async componentDidMount() {
        this.setState({fetching: true});
        const items = await this.getTexts();
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
            this.setTexts(items);
            return items;
        } catch(ex) {
            throw new Error('check package.json.texts.endpoint');
        }
    }
    setTexts(items: Texts) {
        this.intl = {
            ...this.intl,
            ...items.reduce((output, {id, text}) => {
                output[id] = text;
                return output;
            }, {})
        };

        addLocaleData({locale: 'ko'});
    }
    handleIdClicked(id) {
        console.log('id', id);
        this.inputCell.setData(id);
    }
}
