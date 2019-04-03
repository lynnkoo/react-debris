/// <reference types="react" />
export declare const PopoverGroup: (props: any) => null;
export declare const Popup: {
    usePopupHooks: () => {
        isShown: boolean;
        show: () => void;
        hide: () => void;
    };
    enhancePopupComponent: (WrappedComponent: any, layerClassName?: string | undefined) => (props: any) => JSX.Element;
    createPopupRef: () => {
        hooks: {
            show: () => void;
        };
    };
};
