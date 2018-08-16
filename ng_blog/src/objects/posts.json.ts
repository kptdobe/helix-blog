import { JsonContent } from "./content.json";

export interface JsonPostsContent extends JsonContent {
    resource: {
        intro: string;
        title: string;
        meta: string;
        children: string[];
        mdast: Object;
        htast: Object;
        posts:JsonContent[];
    }
}