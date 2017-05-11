import * as React from 'react';
import * as logo from './assets/logo.svg';
import * as github from './assets/github.png';
import './app.css';
import {TextList} from './common/list';
import {InputCell} from './cells/input-cell';
import {connect} from 'react-redux';
// import {getTexts, createText, updateText, deleteText, deployJson} from '../modules/texts/index';
import {addLocaleData, IntlProvider} from 'react-intl';
import * as ko from 'react-intl/locale-data/ko'
import {getDataSource} from '../env';
import {gql, graphql, compose, InjectedGraphQLProps} from 'react-apollo';
import {ExamIntl} from './example/exam-intl';
import {ExamHtml} from './example/exam-html';
import {convertTextModel} from '../modules/texts/index';
import {queries} from '../graphql'; import {mutations} from '../graphql/mutations/index';
import {MText} from "../models/index";
import {responseToModel} from '../modules/common/index';
import {GraphQLDataProps} from 'react-apollo/lib/graphql';

addLocaleData(ko);

interface P {
}
interface C extends Partial<TextsState> {
}
interface D {
    allTexts: GraphQLDataProps & {data: IText[]},
    createText(args: GraphqlVariables<Text>);
    updateText(args: GraphqlVariables<Text>);
    deleteText(args: GraphqlVariables<Text>);
    deployJson();

    testQuery();
}
interface S {
    intl: boolean;
    html: boolean;
}
type Props = C&D&P;

const state2props = (state: MasterState): C => {
    // const {items, fetching, messages, canUpdate} = state.texts;
    // return {fetching, messages, canUpdate};
    return {};
};

interface GraphqlVariables<T> {
    variables: Partial<T>;
}

@graphql(queries.allTexts, responseToModel({name: 'allTexts'}, MText))
@graphql(mutations.createText, {name: 'createText'})
@graphql(mutations.updateText, {name: 'updateText'})
@graphql(mutations.deleteText, {name: 'deleteText'})
class _App extends React.Component<Props, S> {
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
        const {allTexts: {data: texts = []} = {}, fetching, messages, canUpdate} = this.props;
        const {intl, html}                                            = this.state;

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
                                       items={texts}
                                       create={this.handleCreateText}
                                       update={this.handleUpdateText}
                                       deploy={canUpdate && this.props.deployJson}
                                       fetching={!!fetching}/>
                            <hr/>
                            {texts.length === 0 && fetching
                                ? `loading...`
                                : <TextList items={texts} onClick={this.handleIdClicked} remove={this.handleDeleteText}/>}
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
                         {html && <ExamHtml texts={texts}/>}
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

    private handleIdClicked(id, textId, text) {
        this.inputCell.setData(id, textId, text);
    }

    private toggle(property) {
        this.setState({[property]: !this.state[property]});
    }

    private strShow(state: boolean) {
        return state ? '(show)' : '(hide)';
    }

    private async refetchTexts() {
        return this.props.allTexts.refetch();
    }
    private async handleCreateText(textId, text) {
        const response = await this.props.createText({variables: {textId, text}});
        return response.data ? this.refetchTexts() : false;
    }

    private async handleUpdateText(id, textId, text) {
        const response = await this.props.updateText({variables: {id, textId, text}});
        return response.data ? this.refetchTexts() : false;
    }

    private async handleDeleteText(id) {
        const response = await this.props.deleteText({variables: {id}});
        return response.data ? this.refetchTexts() : false;
    }
}

export const App = connect<C, D, P>(state2props)(_App);
