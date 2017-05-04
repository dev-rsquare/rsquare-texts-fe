import * as React from 'react';
import {connect} from 'react-redux';
import {addLocaleData, FormattedMessage, FormattedPlural, IntlProvider} from 'react-intl';
import * as ko from 'react-intl/locale-data/ko'

addLocaleData(ko);

interface P {
}
interface C {
    items: Texts;
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
                        <div>{items.map(item => <Row key={item.id} {...item}/>)}</div>
                    </IntlProvider>
            );
        }
    }
);

const Row = ({id}) =>
    <div style={{float: 'left', border: '1px solid green', margin: '0 10px 10px 0'}}>
        <div style={{borderBottom: '1px solid green'}}>
            {id}
        </div>
        <div style={{float: 'left'}}>
            <code>&lt;span&gt;</code>
            <FormattedMessage id={id}/>
            <code>&lt;/span&gt;</code>
        </div>

        <div style={{float: 'left', borderLeft: '1px solid green'}}>
            <code>&lt;pre&gt;</code>
            <FormattedMessage id={id} tagName="pre"/>
            <code>&lt;/pre&gt;</code>
        </div>

        <div style={{float: 'left', borderLeft: '1px solid green'}}>
            <code>&lt;div&gt;</code>
            <FormattedMessage id={id} tagName="div"/>
            <code>&lt;/div&gt;</code>
        </div>
    </div>;

