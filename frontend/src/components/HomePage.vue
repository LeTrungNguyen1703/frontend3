<template>
  <div class="container mt-5">
    <div class="jumbotron">
      <h1 class="display-4">
        <i class="fas fa-address-book"></i> Contact Book
      </h1>
      <p class="lead">Welcome to your Contact Management Application</p>
      <hr class="my-4">
      <p>Manage your contacts efficiently with our easy-to-use interface.</p>
      <router-link to="/contacts" class="btn btn-primary btn-lg">
        <i class="fas fa-users"></i> View Contacts
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
};
</script>

<style scoped>
.jumbotron {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 3rem 2rem;
}
</style>

