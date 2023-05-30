import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value?: boolean | undefined;
        truthy?: string | undefined;
        falsy?: string | undefined;
        trueClass?: string | undefined;
        falseClass?: string | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type BooleanDisplayProps = typeof __propDef.props;
export type BooleanDisplayEvents = typeof __propDef.events;
export type BooleanDisplaySlots = typeof __propDef.slots;
export default class BooleanDisplay extends SvelteComponentTyped<BooleanDisplayProps, BooleanDisplayEvents, BooleanDisplaySlots> {
}
export {};
