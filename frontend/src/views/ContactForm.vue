<template>
  <div class="page">
    <h4 class="mt-4">
      Thêm Liên hệ mới
      <i class="fas fa-user-plus"></i>
    </h4>
    <ContactForm :contact="contact" @submit:contact="createContact" />
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactForm,
  },
  data() {
    return {
      contact: {
        name: "",
        email: "",
        address: "",
        phone: "",
        favorite: false,
      },
    };
  },
  methods: {
    async createContact(data) {
      try {
        await ContactService.create(data);
        alert("Thêm liên hệ thành công!");
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.log(error);
        alert("Có lỗi xảy ra khi lưu liên hệ.");
      }
    },
  },
};
</script>

<style scoped>

.page {
  max-width: 600px;
  margin: auto;
}
</style>

