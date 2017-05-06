import * as React from 'react';
import * as logo from './assets/logo.svg';
import './app.css';
import {TextList} from './common/list';
import {InputCell} from './cells/input-cell';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTexts, createText, updateText, deleteText} from '../modules/texts/index';
import {ExamIntl} from './exam-intl';
import {addLocaleData, IntlProvider} from 'react-intl';
import * as ko from 'react-intl/locale-data/ko'
import {getDataSource} from '../env';
import {ExamHtml} from './exam-html';

addLocaleData(ko);

interface P {
}
interface C {
    items: IText[];
    fetching: number;
    messages: any;
}
interface D {
    getTexts();
    createText(id, text: string);
    updateText(id, text: string);
    deleteText(id);
}
interface S {
    intl: boolean;
    html: boolean;
}

const state2props    = (state: MasterState): C => {
    const {items, fetching, messages} = state.texts;
    return {items, fetching, messages};
};
const dispatch2props = bindActionCreators.bind(null, {
    getTexts,
    createText,
    updateText,
    deleteText
});

export const App = connect<C, D, P>(state2props, dispatch2props)(
    class extends React.Component<C&D&P, S> {
        state = {intl: false, html: true};

        private toggleExamIntl;
        private toggleExamHtml;
        private inputCell;

        constructor(props) {
            super(props);
            this.handleIdClicked = this.handleIdClicked.bind(this);
            this.toggleExamIntl = this.toggle.bind(this, 'intl');
            this.toggleExamHtml = this.toggle.bind(this, 'html');
        }

        render() {
            const {items = [], fetching, deleteText, messages} = this.props;
            const {intl, html} = this.state;
            
            return (
                <IntlProvider locale={navigator.language} messages={messages}>
                    <div className="App">
                        <div className="App-header">
                            <div>
                                <img src={logo} className="App-logo" alt="logo"/>
                            </div>
                            <h1>Texts</h1>
                            <span>
                                connected endpoint: <em>{getDataSource()}</em>
                            </span>
                            <br/>
                            <span>
                                are you designer? check&nbsp;
                                <a href="http://texts-translator.surge.sh" target="_blank">
                                    http://texts-translator.surge.sh
                                </a>
                            </span>
                        </div>
                        <div className="container-fluid">
                            <div className="col-md-12">
                                <InputCell className="row mt-20"
                                           ref={r => this.inputCell = r}
                                           items={items}
                                           create={this.props.createText}
                                           fetching={!!fetching}/>
                                <hr/>
                                {items.length === 0 && fetching
                                    ? `loading...`
                                    : <TextList items={items} onClick={this.handleIdClicked} remove={deleteText}/>}
                            </div>
                            <div className="col-md-12">
                                <h1 onClick={this.toggleExamIntl}>
                                    <mark>react-intl {this.strShow(intl)}</mark>
                                </h1>
                                {intl && <ExamIntl/>}
                            </div>
                            <div className="col-md-12">
                                <h1 onClick={this.toggleExamHtml}>
                                    <mark>texts-translator {this.strShow(html)}</mark>
                                </h1>
                                {html && <ExamHtml texts={items}/>}
                            </div>
                        </div>
                    </div>
                </IntlProvider>
            );
        }

        componentDidMount() {
            this.props.getTexts();
        }

        private handleIdClicked(id, text) {
            this.inputCell.setData(id, text);
        }

        private toggle(property) {
            this.setState({[property]: !this.state[property]});
        }

        private strShow(state: boolean) {
            return state ? '(show)' : '(hide)';
        }
    }
);
