export default function({ store, redirect }) {
  if (!store.state.auth.user) {
    alert('Sorry, only authenticated user can access this page.')
    return redirect('/')
  }
}
