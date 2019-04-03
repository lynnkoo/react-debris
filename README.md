# React Debris

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
