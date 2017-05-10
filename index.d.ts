interface ResponseData {
    createdAt: number;
    updatedAt: number;
}
interface DataWithUI extends ResponseData {
    ui: {createdAt: string, updatedAt: string};
}
interface Text extends ResponseData {
    textId: string;
    text: string;
    version: number;
}
interface IModel<T> {
    getRawData(): T;
}
interface IText extends IModel<Text> {
    getId(): string;
    getText(): string;
    getCreatedAt(): string;
    getUpdatedAt(): string;
}
type Texts = Text[];

interface MasterState {
    texts: TextsState;
}
interface TextsState {
    items: IText[];
    canUpdate: boolean;
    count: number;
    messages: any;
    fetching: number;
}
