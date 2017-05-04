import * as React from 'react';
import * as List from 'react-list';

interface P {
    items: Texts;
    onClick(id, text: string);
    remove(id: string);
}
interface S {
}

export class TextList extends React.Component<P, S> {
    private id;
    private text;

    constructor(props) {
        super(props);

        this.renderItem = this.renderItem.bind(this);
        this.handleRowClicked = this.handleRowClicked.bind(this);
    }

    render() {
        const {items} = this.props;
        return (
            <div>
                <div className="-text -header row">
                    <strong className="-id col-sm-2 col-md-2">id</strong>
                    <strong className="-text col-sm-8 col-md-8">text</strong>
                    <strong className="-modification col-sm-2 col-md-2">modification</strong>
                </div>
                <List type="simple" itemRenderer={this.renderItem} length={items.length}/>
                <hr/>
            </div>
        );
    }

    renderItem(index, key) {
        const {items} = this.props;
        const {id, text} = items[index];
        return (
            <div className="-text row" key={id} onClick={this.handleRowClicked}>
                <span className="-id col-sm-2 col-md-2">
                    {id}
                </span>
                <span className="-text col-sm-8 col-md-8">
                    {text}
                </span>
                <button className="-button-bg -gray col-md-2 col-sm-2" onClick={_ => this.props.remove(id)}>
                    <span className="-button-text">delete</span>
                </button>
            </div>
        );
    }

    handleRowClicked(e) {
        const [id, text] = e.currentTarget.children;
        this.props.onClick(id.textContent, text.textContent);
    }
}
