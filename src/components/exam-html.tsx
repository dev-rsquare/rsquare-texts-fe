import * as React from 'react';

interface P {
    texts: IText[];
}
export class ExamHtml extends React.Component<P, null> {
    render() {
        return (
            <div>
                {this.props.texts.map(text =>
                    <div key={text.getId()} data-text-id={text.getId()}>{text.getId()}</div>
                )}
            </div>
        );
    }
}