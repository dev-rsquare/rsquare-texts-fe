import * as React from 'react';
import * as List from 'react-list';
import {FormattedRelative} from 'react-intl';

type relativeDate = boolean;

interface P {
    items: IText[];
    onClick(id, textId, text: string);
    remove(id: string);
}
interface S {
    relativeCreatedAt: relativeDate;
    relativeUpdatedAt: relativeDate;
}

export class TextList extends React.Component<P, S> {
    state = {relativeCreatedAt: true, relativeUpdatedAt: true};

    constructor(props) {
        super(props);

        this.renderItem                    = this.renderItem.bind(this);
        this.handleRowClicked              = this.handleRowClicked.bind(this);
        this.handleToggleRelativeCreatedAt = this.handleToggleRelative.bind(this, 'relativeCreatedAt');
        this.handleToggleRelativeUpdatedAt = this.handleToggleRelative.bind(this, 'relativeUpdatedAt');
    }

    render() {
        const {items} = this.props;
        return (
            <div>
                <div className="-text -header row">
                    <strong className="-id col-lg-2 col-md-3 col-10">ID</strong>
                    <strong className="-text col-lg-6 col-md-8 col-6 clearfix hidden-sm-down">text</strong>
                    <div className="row col-3 clearfix hidden-md-down">
                        <strong className="col-lg-6 col-6" onClick={this.handleToggleRelativeCreatedAt}>created at</strong>
                        <strong className="col-lg-6 col-6" onClick={this.handleToggleRelativeUpdatedAt}>updated at</strong>
                    </div>
                </div>
                <List type="simple" itemRenderer={this.renderItem} length={items.length}/>
                <hr/>
            </div>
        );
    }

    renderItem(index) {
        const {items}                                = this.props;
        const item: IText                            = items[index];
        const id                                     = item.getId();
        const textId                                 = item.getTextId();
        const {createdAt, updatedAt}                 = item.getRawData();
        const {relativeCreatedAt, relativeUpdatedAt} = this.state;

        return (
            <div className="-text row" key={id} data-id={id} onClick={this.handleRowClicked}>
                <span className="-id col-lg-2 col-9 col-md-3 ">{textId}</span>
                <span className="-text col-lg-6 col-md-7 clearfix hidden-sm-down">{item.getText()}</span>
                <div className="row col-3 clearfix hidden-md-down">
                    <span className="-text col-lg-6 col-6">
                        {relativeCreatedAt ? <FormattedRelative value={createdAt}/> : item.getCreatedAt()}
                    </span>
                    <span className="-text col-lg-6 col-6">
                        {relativeUpdatedAt ? <FormattedRelative value={updatedAt}/> : item.getUpdatedAt()}
                    </span>
                </div>
                <button className="-button-bg -gray col-lg-1 col-md-2 col-3" onClick={_ => this.props.remove(id)}>
                    <span className="-button-text">delete</span>
                </button>
            </div>
        );
    }

    handleRowClicked(e) {
        const text = this.props.items.find(item => item.getId() === e.currentTarget.dataset.id);
        this.props.onClick(text.getId(), text.getTextId(), text.getText());
    }

    handleToggleRelative(property) {
        this.setState({[property]: !this.state[property]});
    }

    handleToggleRelativeCreatedAt() {
        throw new Error('must override by handleToggleRelative');
    }

    handleToggleRelativeUpdatedAt() {
        throw new Error('must override by handleToggleRelative');
    }
}
