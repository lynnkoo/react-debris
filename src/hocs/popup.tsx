import * as React from 'react'
import * as ReactDOM from 'react-dom'
import cx from 'classnames'

const POPUP_LAYER_ID = 'PopupLayer'

const createPopupLayer = (): HTMLElement => {
  const node = document.createElement('div')
  node.id = POPUP_LAYER_ID
  document.body.style.overflow = 'hidden'
  document.body.appendChild(node)
  return node
}


const removePopupLayer = (rootNode: HTMLElement) => {
  if (rootNode.children.length === 0) {
    document.body.style.overflow = 'auto'
    document.body.removeChild(rootNode)
  }
}

const PopupComponent = (props: any) => {
  const rootNode = document.getElementById(POPUP_LAYER_ID) || createPopupLayer()
  rootNode.className = cx('h-popup-layer', props.className)

  React.useEffect(() => {
    return () => {
      // WORKAROUND 延迟 10 毫秒关闭弹出层确保组件已经关闭并且没有新的弹窗出现
      setTimeout(() => {
        removePopupLayer(rootNode)
      }, 10)
    }
  })

  return ReactDOM.createPortal(
    React.cloneElement(props.children),
    rootNode,
  )
}

export const PopoverGroup = (props: any) => {
  const { children } = props

  const componentHooks: any[] = []

  const onCloseGroup = () => {
    componentHooks.forEach((hooks: any) => hooks.hide())
  }

  let renderChild = null

  React.Children.forEach(children, (child) => {
    if (!child || typeof child === 'string' || typeof child === 'number') {
      return
    }
    const { hooks } = child.props
    componentHooks.push(hooks)
    if (hooks.isShown) {
      renderChild = React.cloneElement(child, { hooks, onCloseGroup })
    }
  })

  return renderChild
}

const createPopupRef = () => {
  return { hooks: { show: () => {} } }
}

const enhancePopupComponent = (WrappedComponent: any, layerClassName?: string) => (props: any) => {
  const hooks = props.hooks || usePopupHooks()
  if (props.popupRef) {
    props.popupRef.hooks = hooks
  }
  return hooks.isShown && (
    <PopupComponent className={layerClassName}>
      <WrappedComponent {...props} hooks={hooks}  />
    </PopupComponent>
  )
}

const usePopupHooks = () => {
  const [isShown, setShown] = React.useState(false)
  return {
    isShown,
    show: () => {
      if (!isShown) {
        setShown(true)
      }
    },
    hide: () => {
      if (isShown) {
        setShown(false)
      }
    },
  }
}

export const Popup = {
  usePopupHooks,
  enhancePopupComponent,
  createPopupRef,
}
