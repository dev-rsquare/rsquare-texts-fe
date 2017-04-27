interface Text {
    id: string;
    text: string;
}
type Texts = Text[];

declare module "*.svg" {
    var resource: string;
    export = resource;
}
