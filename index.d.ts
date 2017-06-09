interface ResponseData {
    createdAt: number;
    updatedAt: number;
}
interface DataWithUI extends ResponseData {
    ui: {createdAt: string, updatedAt: string};
}
interface Text extends ResponseData {
    id: string;
    text: string;
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

interface RootState {
    texts: TextsState;
    auth: AuthState;
}
interface TextsState {
    items: IText[];
    canUpdate: boolean;
    count: number;
    messages: any;
    fetching: number;
}
interface AuthState {
    token: string;
}
interface DecodedToken {
    
}