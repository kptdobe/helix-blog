export interface JsonContent {
    owner: string;
    repo: string;
    ref: string;
    path: string;
    request: Object;
    resource: {
        intro: string;
        title: string;
        meta: string;
        children: string[];
        mdast: Object;
        htast: Object;
    }
}