# React Debris

The repo will provide some price for react components.
These components only have default layout, so you can set any styles for you like.

**Warning:** The repo is in testing status now. I don't recommend using this in publishing production. But I hope to received suggestion for the repo, thanks.

## Install
  `npm install react-debris`

## Usage

### Modal
  - enhance
``` javascript
const TModal = (props: any) => {
  const onClose = () => {
    props.hooks.hide()
  }
  return (
    <div onClick={onClose}>
      Test Content
    </div>
  )
}
const Modal = Popup.enhancePopupComponent(TModal, 'test-class')
```

  - function component
``` javascript
const TestComponent = () => {
  const hooks = Popup.usePopupHooks()
  const show = () => {
    hooks.show()
  }
  return (
    <div>
      <div onClick={show}>show</div>
      <Modal hooks={hooks} />
    </div>
  )
}
```
  - class component

``` javascript
class App extends React.Component {
  modalRef = Popup.createPopupRef()
  show = () => {
    this.modalRef.hooks.show()
  }
  render () {
    return (
      <div>
        <div onClick={this.show}>show</div>
        <Modal popupRef={this.modalRef} />
      </div>
    )
  }
}
```

And I recommend the repo [react-reasm](https://github.com/lynnkoo/react-reasm) when you using the popup component.

``` javascript
const injectComponents = {
  testModal: (inject: any) => { 
    const hooks = Popup.usePopupHooks()
    inject(hooks)
    return <Modal hooks={hooks} />
  },
}

const TTestComponent = (props: any) => {
  const show = () => {
    props.testModal.show()
  }
  return (
    <div>
      <div onClick={show}>show</div>
    </div>
  )
}
const TestComponent = Injector({
  ...,
  components: injectComponents,
})

```