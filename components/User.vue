<template>
  <div>
    <h1 class="title is-1">{{user.username}}</h1>
    <p>
      <strong>_id :</strong> {{user._id}} <br />
      <strong>mail:</strong> {{user.email}} <br />
      <strong>role:</strong> {{user.role.name}} ( {{user.role.description }}) <br />
    </p>
    <pre>{{user}}</pre>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
