import * as React from 'react';
import {connect} from 'react-redux';
import {addLocaleData, FormattedMessage, FormattedRelative, FormattedPlural, FormattedHTMLMessage, IntlProvider} from 'react-intl';
import * as ko from 'react-intl/locale-data/ko'

addLocaleData(ko);

interface P {
}
interface C {
    items: IText[];
    fetching: number;
    messages: any;
}
interface D {
}
interface S {
}

const state2props = (state: MasterState): C => {
    const {items, fetching, messages} = state.texts;
    return {items, fetching, messages};
};

export const ExamIntl = connect<C, D, P>(state2props)(
    class extends React.Component<C & D & P, S> {
        render() {
            const {items = [], messages} = this.props;
            if (!messages) {
                return null;
            }
            return (
                messages &&
                <IntlProvider locale={navigator.language} messages={messages}>
                    <div>
                        <div className="row">
                            <div className="col-md-12">
                                <h1>FormattedMessage</h1>
                                <div>{items.map(item => <FormattedMessageRow key={item.getId()} {...item.getRawData()}/>)}</div>
                            </div>
                        </div>
                        {/*<div className="row">*/}
                        {/*FormattedRelative*/}
                        {/*<div>{items.map(item => <FormattedRelativeRow key={item.getId()} {...item.getRawData()}/>)}</div>*/}
                        {/*</div>*/}
                        {/*<div className="row">*/}
                        {/*FormattedPlural*/}
                        {/*<div>{items.map(item => <FormattedPluralRow key={item.getId()} {...item.getRawData()}/>)}</div>*/}
                        {/*</div>*/}
                        <div className="row">
                            <div className="col-md-12">
                                <h1>FormattedFormattedHTMLMessageRow</h1>
                                <div>{items.map(item => <FormattedFormattedHTMLMessageRow key={item.getId()} {...item.getRawData()}/>)}</div>
                            </div>
                        </div>
                    </div>
                </IntlProvider>
            );
        }
    }
);

const RowFactory                       = element => ({id}) =>
    <div style={{float: 'left', border: '1px solid green', margin: '0 10px 10px 0'}}>
        <div style={{borderBottom: '1px solid green'}}>
            {id}
        </div>
        <div style={{float: 'left'}}>
            <code>&lt;span&gt;</code>
            {React.createElement(element, {id})}
            <code>&lt;/span&gt;</code>
        </div>

        <div style={{float: 'left', borderLeft: '1px solid green'}}>
            <code>&lt;pre&gt;</code>
            {React.createElement(element, {id, tagName: 'pre'})}
            <code>&lt;/pre&gt;</code>
        </div>

        <div style={{float: 'left', borderLeft: '1px solid green'}}>
            <code>&lt;div&gt;</code>
            {React.createElement(element, {id, tagName: 'div'})}
            <code>&lt;/div&gt;</code>
        </div>
    </div>;
const FormattedMessageRow              = RowFactory(FormattedMessage);
const FormattedRelativeRow             = RowFactory(FormattedRelative);
const FormattedPluralRow               = RowFactory(FormattedPlural);
const FormattedFormattedHTMLMessageRow = RowFactory(FormattedHTMLMessage);

