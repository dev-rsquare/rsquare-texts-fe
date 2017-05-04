import * as React from 'react';
import * as classNames from 'classnames';

interface P {
    className?: string;
    create(id, text): Promise<boolean>;
    items: IText[];
}
interface S {
    match: boolean;
}

export class InputCell extends React.Component<P, S> {
    private id;
    private text;
    state = {match: false};

    constructor(props) {
        super(props);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    render() {
        const {className} = this.props;
        const {match} = this.state;
        return (
            <form className={classNames('-text -input row', className)} onSubmit={this.submit}>
                <input className="form-control -id col-md-2" ref={r => this.id = r} placeholder="STRING_ID" onChange={this.handleChange}/>
                <input className="form-control -text col-md-8" ref={r => this.text = r} placeholder="TEXT"/>
                <button className="-button-bg col-md-2" type="submit">
                    <span className="-button-text">{match ? 'update' : 'create'}</span>
                </button>
            </form>
        );
    }
    submit(e) {
        e.preventDefault();
        this.props.create(this.id.value, this.text.value);
    }
    handleChange() {
        this.setState({match: this.props.items.some(item => item.getId() === this.id.value)});
    }
    setData(id, text) {
        this.id.value = id;
        this.text.value = text;
        this.handleChange();
    }
}
