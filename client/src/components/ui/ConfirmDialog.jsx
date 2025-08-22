
import Modal from './Modal'
export default function ConfirmDialog({ open, title='Confirm', message='Are you sure?', onCancel, onConfirm }){
  return (
    <Modal open={open} onClose={onCancel} title={title} footer={(
      <>
        <button onClick={onCancel} className="rounded-lg border px-3 py-2 text-sm">Cancel</button>
        <button onClick={onConfirm} className="rounded-lg bg-red-600 text-white px-3 py-2 text-sm">Delete</button>
      </>
    )}>
      <p className="text-sm text-gray-600">{message}</p>
    </Modal>
  )
}
