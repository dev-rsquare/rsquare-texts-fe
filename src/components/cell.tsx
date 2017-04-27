import * as React from 'react';
import * as classNames from 'classnames';

interface PText {
    id: string;
    text: string;
    update(id, text: string): Promise<boolean>;
    className?: string;
}
interface SText {
    placeholder: string;
    dirty: boolean;
}
export class TextCell extends React.Component<PText, SText> {
    private input;

    constructor(props) {
        super(props);

        this.state = {placeholder: props.text, dirty: false};
        this.modify = this.modify.bind(this);
        this.revert = this.revert.bind(this);
        this.clear = this.clear.bind(this);
    }
    render() {
        const {text, className = ''} = this.props;
        const {dirty} = this.state;
        return (
            <form onSubmit={this.modify} className={`input-group -text col-md-8 ${className} ${dirty}`}>
                <input type="text" className="form-control" placeholder={text} ref={r => this.input = r}/>
                <span className="input-group-btn">
                    <button className="btn btn-primary" type="submit">modify</button>
                </span>
                <span className="input-group-btn">
                    <button className="btn btn-secondary" type="button" onClick={this.revert}>revert</button>
                </span>
            </form>
        );
    }
    async modify(e) {
        e.preventDefault();
        const {id, update} = this.props;
        const {input: {value}} = this;

        try {
            const response = await update(id, value);
            if (!response) {
                return this.revert();
            }
            console.log('modified');
        } catch(ex) {
            return this.revert();
        }
    }
    revert() {
        console.log('revert', this.props.text);
        this.setState({placeholder: this.props.text}, this.clear);
    }
    private clear() {
        console.log('clear');
        this.input.value = '';
    }
}

interface PInput {
    className?: string;
    create(id, text): Promise<boolean>;
}
interface SInput {}

export class InputCell extends React.Component<PInput, SInput> {
    constructor(props) {
        super(props);

        this.submit = this.submit.bind(this);
    }
    render() {
        const {className} = this.props;
        return (
            <form className={classNames("-text row", className)} onSubmit={this.submit}>
                <input className="-id col-md-2" placeholder="STRING_ID"/>
                <input className="-text col-md-8" placeholder="TEXT"/>
                <button className="-button col-md-2" type="submit">save</button>
            </form>
        );
    }
    submit(e) {
        e.preventDefault();
        console.log('submit', this);
    }
}
