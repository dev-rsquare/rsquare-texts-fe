import * as React from 'react';

interface P {
    className?: string;
    create(textId, text);
    update(id, textId, text);
    items: IText[];
    fetching: boolean;
}
interface S {
    match: boolean;
}

export class InputCell extends React.Component<P, S> {
    private id;
    private textId;
    private text;
    private public;

    state = {match: false};

    constructor(props) {
        super(props);
        this.submit           = this.submit.bind(this);
        this.handleChangeId   = this.handleChangeId.bind(this);
        this.handleChangeText = this.handleChangeText.bind(this);
    }

    render() {
        const {className, fetching} = this.props;
        const {match}               = this.state;
        
        return (
            <form className={className} onSubmit={this.submit}>
                <input className="form-control -id col-lg-2 col-12" ref={r => this.textId = r} placeholder="STRING_ID" onChange={this.handleChangeId}/>
                <textarea className="form-control -text col-lg-8 col-12" ref={r => this.text = r} placeholder="TEXT" onChange={this.handleChangeText}/>
                <button className="-button-bg col-lg-1 col-12" type="submit" disabled={fetching}>
                    <span className="-button-text">{match ? 'update' : 'create'}</span>
                </button>
                <div className="col-lg-1 col-12">
                    <input type="checkbox" ref={r => this.public = r} />
                    <span className="-checkbox">&nbsp;public</span>
                </div>
            </form>
        );
    }

    private setTextAreaRows() {
        this.text.style.height = `${this.text.value.split('\n').length * 30}px`;
    }

    submit(e) {
        e.preventDefault();
        this.text.style.height = `30px`;

        console.log('public', this.public.value);
        if (this.state.match) {
            this.props.update(this.id, this.textId.value, this.text.value);
        } else {
            this.props.create(this.textId.value, this.text.value);
        }
    }

    handleChangeId() {
        this.setState({match: this.props.items.some(item => item.getTextId() === this.textId.value)});
    }

    handleChangeText(e) {
        this.setTextAreaRows()
    }

    setData(id, textId, text) {
        this.id = id;
        this.textId.value   = textId;
        this.text.value = text;
        this.handleChangeId();
        this.setTextAreaRows();
    }
}
