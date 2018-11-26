<template>
  <div>
    <BulmaGrid :items="users" itemsByRow="3">
      <template slot-scope="{item}">
        <UserCard :user="item"/>
      </template>
    </BulmaGrid>
  </div>
</template>

<script>
import BulmaGrid from './BulmaGrid'
import UserCard from './UserCard'
export default {
  components: {
    BulmaGrid,
    UserCard
  },
  props: {
    users: {
      type: Array,
      required: true
    }
  }
}
</script>
