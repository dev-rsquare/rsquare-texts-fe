import * as React from 'react';
import * as logo from './assets/logo.svg';
import * as github from './assets/github.png';
import './app.css';
import {TextList} from './common/list';
import {InputCell} from './cells/input-cell';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import {getTexts, createText, updateText, deleteText, deployJson} from '../modules/texts/index';
import {addLocaleData, IntlProvider} from 'react-intl';
import * as ko from 'react-intl/locale-data/ko'
import {getDataSource} from '../env';
import {gql, graphql, compose} from 'react-apollo';
import {ExamIntl} from './example/exam-intl';
import {ExamHtml} from './example/exam-html';
import {convertTextModel} from '../modules/texts/index';
import '../graphql';

addLocaleData(ko);

interface P {
}
interface C extends Partial<TextsState> {
}
interface D {
    getTexts();
    createText(args: GraphqlVariables<GQLArgsCreateText>);
    updateText(id, text: string);
    deleteText(id);
    deployJson();

    testQuery();
}
interface S {
    intl: boolean;
    html: boolean;
}

const state2props = (state: MasterState): C => {
    const {items, fetching, messages, canUpdate} = state.texts;
    return {fetching, messages, canUpdate};
};
// const dispatch2props = bindActionCreators.bind(null, {
//     getTexts,
//     createText,
//     updateText,
//     deleteText,
//     deployJson
// });

interface GraphqlVariables<T> {
    variables: T;
}
interface GQLArgsCreateText {
    textId: string;
    text: string;
}
const createText: GraphqlVariables<GQLArgsCreateText> = gql`
    mutation TextsMutation($textId: String!, $text: String!) {
        createText(textId: $textId, text: $text) {
            textId
            text
            version
        }
    }
`;
const allTexts   = gql`
    query TextsQuery {
        texts: allTexts {
            textId
            text
            version
            createdAt
            updatedAt
        }
    }
`;

export const App = compose(
    graphql(allTexts, {
        name: 'allTexts',
        props: ({ownProps, allTexts: {texts}}) => {
            if (!texts) {
                return;
            }
            const items = texts.map(convertTextModel);
            return {items};
        }
    }),
    graphql(createText as any, {name: 'createText'}),
    connect<C, D, P>(state2props)
)(
    class extends React.Component<C & D & P, S> {
        state = {intl: false, html: true};

        private toggleExamIntl;
        private toggleExamHtml;
        private inputCell;

        constructor(props) {
            super(props);
            this.handleIdClicked  = this.handleIdClicked.bind(this);
            this.handleCreateText = this.handleCreateText.bind(this);
            this.handleUpdateText = this.handleUpdateText.bind(this);
            this.handleDeleteText = this.handleDeleteText.bind(this);
            this.toggleExamIntl   = this.toggle.bind(this, 'intl');
            this.toggleExamHtml   = this.toggle.bind(this, 'html');
        }

        render() {
            const {items = [], fetching, deleteText, messages, canUpdate} = this.props;
            const {intl, html}                                            = this.state;
            console.log(this.props);

            return (
                <IntlProvider locale={navigator.language} messages={messages}>
                    <div className="App">
                        <div className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h1>Texts</h1>
                            <span>connected endpoint: <em>{getDataSource()}</em></span>
                            <br/>
                            <span>
                                Do you want to change endpoint?
                                <em>https://texts.surge.sh?endpoint=[YOUR_ENDPOINT]</em>
                            </span>
                            <br/>
                            <span>
                                Are you designer?
                                <em>
                                    check&nbsp;
                                    <a href="http://texts-translator.surge.sh" target="_blank">
                                        http://texts-translator.surge.sh
                                    </a>
                                </em>
                            </span>
                            <a href="https://github.com/deptno/texts-fe" target="_blank">
                                <img className="-github" src={github} alt="github"/>
                            </a>
                        </div>
                        <div className="container-fluid">
                            <div className="col-md-12">
                                <InputCell className="row mt-20"
                                           ref={r => this.inputCell = r}
                                           items={items}
                                           create={this.handleCreateText}
                                           update={this.props.updateText}
                                           deploy={canUpdate && this.props.deployJson}
                                           fetching={!!fetching}/>
                                <hr/>
                                {items.length === 0 && fetching
                                    ? `loading...`
                                    : <TextList items={items} onClick={this.handleIdClicked} remove={deleteText}/>}
                            </div>
                            {/*
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
                             */}
                        </div>
                        <div className="App-footer">
                            author: <a href="mailto:deptno@gmail.com">deptno@gmail.com</a>
                            (<a href="http://blog.bglee.me" target="_blank">bglee.me</a>)
                        </div>
                    </div>
                </IntlProvider>
            );
        }

        componentDidMount() {
            // this.props.getTexts();
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

        private async handleCreateText(textId, text) {
            console.log('handleCreateText', textId, text);
            const result = this.props.createText({variables: {textId, text}});
            console.log(result);
            return true;
        }

        private handleUpdateText(...args) {
            console.log('handleUpdateText', ...args);
        }

        private handleDeleteText(...args) {
            console.log('handleDeleteText', ...args);
        }
    }
);
