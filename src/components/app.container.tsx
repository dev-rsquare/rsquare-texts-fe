import * as React from 'react';
import * as logo from './assets/logo.svg';
import './app.css';
import {TextList} from './common/list';
import {InputCell} from './input/cell';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTexts, createText, updateText, deleteText} from '../modules/texts/index';

interface P {}
interface C {
    items: Texts;
    fetching: number;
}
interface D {
    getTexts();
    createText(id, text: string);
    updateText(id, text: string);
    deleteText(id);
}
interface S {}

const state2props = (state: MasterState): C => {
    const {items, fetching} = state.texts;
    return {items, fetching};
};
const dispatch2props = bindActionCreators.bind(null, {
    getTexts,
    createText,
    updateText,
    deleteText
});

export const App = connect<C, D, P>(state2props, dispatch2props)(
    class extends React.Component<C&D&P, null> {
        private inputCell;

        constructor(props) {
            super(props);
            this.handleIdClicked = this.handleIdClicked.bind(this);
        }
        render() {
            const {items = [], fetching, deleteText} = this.props;
            return (
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1>Texts</h1>
                    </div>
                    <div className="container-fluid">
                        {items.length === 0 && fetching
                            ? `loading...`
                            : <TextList items={items} onClick={this.handleIdClicked} remove={deleteText}/>}
                            <InputCell className="row"
                                       ref={r => this.inputCell = r}
                                       items={items}
                                       create={this.props.createText}/>
                    </div>
                </div>
            );
        }
        componentDidMount() {
            this.props.getTexts();
        }
        handleIdClicked(id, text) {
            this.inputCell.setData(id, text);
        }
    }
);