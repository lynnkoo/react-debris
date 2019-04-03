var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import cx from 'classnames';
var POPUP_LAYER_ID = 'DebrisPopupLayer';
var createPopupLayer = function () {
    var node = document.createElement('div');
    node.id = POPUP_LAYER_ID;
    document.body.style.overflow = 'hidden';
    document.body.appendChild(node);
    return node;
};
var removePopupLayer = function (rootNode) {
    if (rootNode.children.length === 0) {
        document.body.style.overflow = 'auto';
        document.body.removeChild(rootNode);
    }
};
var PopupComponent = function (props) {
    var rootNode = document.getElementById(POPUP_LAYER_ID) || createPopupLayer();
    rootNode.className = cx('h-popup-layer', props.className);
    React.useEffect(function () {
        return function () {
            // WORKAROUND 延迟 10 毫秒关闭弹出层确保组件已经关闭并且没有新的弹窗出现
            setTimeout(function () {
                removePopupLayer(rootNode);
            }, 10);
        };
    });
    return ReactDOM.createPortal(React.cloneElement(props.children), rootNode);
};
export var PopoverGroup = function (props) {
    var children = props.children;
    var componentHooks = [];
    var onCloseGroup = function () {
        componentHooks.forEach(function (hooks) { return hooks.hide(); });
    };
    var renderChild = null;
    React.Children.forEach(children, function (child) {
        if (!child || typeof child === 'string' || typeof child === 'number') {
            return;
        }
        var hooks = child.props.hooks;
        componentHooks.push(hooks);
        if (hooks.isShown) {
            renderChild = React.cloneElement(child, { hooks: hooks, onCloseGroup: onCloseGroup });
        }
    });
    return renderChild;
};
var createPopupRef = function () {
    return { hooks: { show: function () { } } };
};
var enhancePopupComponent = function (WrappedComponent, layerClassName) { return function (props) {
    var hooks = props.hooks || usePopupHooks();
    if (props.popupRef) {
        props.popupRef.hooks = hooks;
    }
    return hooks.isShown && (React.createElement(PopupComponent, { className: layerClassName },
        React.createElement(WrappedComponent, __assign({}, props, { hooks: hooks }))));
}; };
var usePopupHooks = function () {
    var _a = React.useState(false), isShown = _a[0], setShown = _a[1];
    return {
        isShown: isShown,
        show: function () {
            if (!isShown) {
                setShown(true);
            }
        },
        hide: function () {
            if (isShown) {
                setShown(false);
            }
        },
    };
};
export var Popup = {
    usePopupHooks: usePopupHooks,
    enhancePopupComponent: enhancePopupComponent,
    createPopupRef: createPopupRef,
};
