<script>
export default {
  props: {
    contact: { type: Object, required: true },
  },
  emits: ["edit", "delete"],
  methods: {
    editContact() {
      this.$emit("edit", this.contact);
    },
    deleteContact() {
      this.$emit("delete", this.contact);
    },
  },
};
</script>

<template>
  <div>
    <div class="p-1"><strong>Tên:</strong> {{ contact.name }}</div>
    <div class="p-1"><strong>Email:</strong> {{ contact.email }}</div>
    <div class="p-1"><strong>Địa chỉ:</strong> {{ contact.address }}</div>
    <div class="p-1"><strong>Điện thoại:</strong> {{ contact.phone }}</div>
    <div class="p-1">
      <strong>Liên hệ yêu thích:&nbsp;</strong>
      <i v-if="contact.favorite" class="fas fa-check"></i>
      <i v-else class="fas fa-times"></i>
    </div>
    <div class="mt-3">
      <button class="btn btn-sm btn-warning" @click="editContact">
        <i class="fas fa-edit"></i> Sửa
      </button>
      <button class="btn btn-sm btn-danger ml-2" @click="deleteContact">
        <i class="fas fa-trash"></i> Xóa
      </button>
    </div>
  </div>
</template>