import * as React from 'react';
// import {IntlProvider, addLocaleData} from 'react-intl';
import {App} from './app.container';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

interface P {}
interface C {}
interface D {}
interface S {}

const state2props = (state): C => ({});
const dispatch2props = bindActionCreators.bind(null, {});

type WrapperProps = C&D&P;

export const Wrapper = connect<C, D, P>(state2props, dispatch2props)(
    class extends React.Component<WrapperProps, S> {
        render() {
            return <App/>;
        }
    }
);
