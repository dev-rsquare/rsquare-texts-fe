import * as React from 'react';
import * as List from 'react-list';
import {TextCell} from './cell';
import {API_URL} from '../constants';

interface P {
    items: Texts;
}
interface S {
    items: Texts;
}

export class TextList extends React.Component<P, S> {
    constructor(props) {
        super(props);
        this.renderItem = this.renderItem.bind(this);
        this.save = this.save.bind(this);
        
        this.state = {items: props.items};
    }

    render() {
        const {items} = this.state;
        return (
            <div>
                <div className="-text row">
                    <strong className="-id col-md-2">id</strong>
                    <strong className="-text col-md-8">text</strong>
                    <strong className="-modification col-md-2">modification</strong>
                </div>
                    <List type="simple" itemRenderer={this.renderItem} length={items.length}/>
                <hr/>
            </div>
        );
    }

    renderItem(index, key) {
        const {items}    = this.props;
        const {id, text} = items[index];
        return (
            <div className="-text row" key={id}>
                <span className="-id col-md-2">{id}</span>
                <TextCell id={id} text={text} update={this.save}/>
                <button className="-button col-md-2" onClick={_ => this.delete(id)}>delete</button>
            </div>
        );
    }
    async save(id, text) {
        if (!Math.round(Math.random())) {
            throw false;
        }
        
        const items = this.props.items;
        const index = items.findIndex(({id: itemId}) => id === itemId);
        items[index].text = text;
        this.setState({items: items});

        return true;

        // try {
        //     return !!(await fetch([API_URL, id].join('/'), {method: 'post', body: JSON.stringify({text})})).ok;
        // } catch(ex) {
        //     return false;
        // }
    }
    async delete(id) {
        return false;
    }
}
