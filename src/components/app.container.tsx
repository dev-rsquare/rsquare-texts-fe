import * as React from 'react';
import './app.css';
import {TextList} from './common/list';
import {InputCell} from './cells/input-cell';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTexts, createText, updateText, deleteText, deployJson} from '../modules/texts/index';
import {ExamIntl} from './exam-intl';
import {addLocaleData, IntlProvider} from 'react-intl';
import * as ko from 'react-intl/locale-data/ko'
import {getDataSource} from '../env';
import {ExamHtml} from './exam-html';
import {RouteComponentProps} from 'react-router';
import {SignInWithGoogle} from './sign-in-with-google';

addLocaleData(ko);

interface P {
}
interface C extends Partial<TextsState> {
}
interface D {
    getTexts();
    createText(id, text: string);
    updateText(id, text: string);
    deleteText(id);
    deployJson();
}
interface S {
    intl: boolean;
    html: boolean;
}

const state2props    = (state: MasterState): C => {
    const {items, fetching, messages, canUpdate} = state.texts;
    return {items, fetching, messages, canUpdate};
};
const dispatch2props = bindActionCreators.bind(null, {
    getTexts,
    createText,
    updateText,
    deleteText,
    deployJson
});

export const App = connect<C, D, RouteComponentProps<P>>(state2props, dispatch2props)(
    class extends React.Component<C & D & RouteComponentProps<P>, S> {
        state = {intl: false, html: true};

        private toggleExamIntl;
        private toggleExamHtml;
        private inputCell;

        constructor(props) {
            super(props);
            this.handleIdClicked = this.handleIdClicked.bind(this);
            this.toggleExamIntl  = this.toggle.bind(this, 'intl');
            this.toggleExamHtml  = this.toggle.bind(this, 'html');
        }

        render() {
            const {items = [], fetching, deleteText, messages, canUpdate} = this.props;
            const {intl, html}                                 = this.state;

            return (
                <IntlProvider locale={navigator.language} messages={messages}>
                    <div className="App">
                        <div className="App-header">
                            <SignInWithGoogle/>
                            <h1>Texts</h1>
                            <h6>connected endpoint: <em>{getDataSource()}</em></h6>
                        </div>
                        <div className="container-fluid">
                            <div className="col-md-12">
                                <InputCell className="row mt-20"
                                           ref={r => this.inputCell = r}
                                           items={items}
                                           create={this.props.createText}
                                           update={this.props.updateText}
                                           deploy={canUpdate && this.props.deployJson}
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
