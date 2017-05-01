interface Text {
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
    fetching: number;
}
