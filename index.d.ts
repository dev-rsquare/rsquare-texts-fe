interface Data {
    createdAt: string;
    updatedAt: string;
}
interface Text extends Data {
    id: string;
    text: string;
}
type Texts = Text[];

interface MasterState {
    texts: TextsState;
}
interface TextsState {
    items: Texts;
    count: number;
    messages: any;
    fetching: number;
}
