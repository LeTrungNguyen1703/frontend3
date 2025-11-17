<template>
  <div class="page">
    <h4 class="mt-4">
      {{ isEditMode ? 'Chỉnh sửa Liên hệ' : 'Thêm Liên hệ mới' }}
      <i class="fas fa-user-edit"></i>
    </h4>
    <form @submit.prevent="saveContact">
      <div class="form-group">
        <label for="name">Tên *</label>
        <input
            id="name"
            type="text"
            class="form-control"
            v-model="contact.name"
            required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
            id="email"
            type="email"
            class="form-control"
            v-model="contact.email"
        />
      </div>
      <div class="form-group">
        <label for="address">Địa chỉ</label>
        <input
            id="address"
            type="text"
            class="form-control"
            v-model="contact.address"
        />
      </div>
      <div class="form-group">
        <label for="phone">Điện thoại</label>
        <input
            id="phone"
            type="tel"
            class="form-control"
            v-model="contact.phone"
        />
      </div>
      <div class="form-group form-check">
        <input
            id="favorite"
            type="checkbox"
            class="form-check-input"
            v-model="contact.favorite"
        />
        <label class="form-check-label" for="favorite">
          <i class="fas fa-heart"></i> Liên hệ yêu thích
        </label>
      </div>

      <div class="form-group">
        <button type="submit" class="btn btn-primary">
          <i class="fas fa-save"></i> Lưu
        </button>
        <button
            type="button"
            class="btn btn-danger ml-2"
            v-if="isEditMode"
            @click="deleteContact"
        >
          <i class="fas fa-trash"></i> Xóa
        </button>
        <button
            type="button"
            class="btn btn-secondary ml-2"
            @click="goBack"
        >
          <i class="fas fa-arrow-left"></i> Quay lại
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ContactService from "@/services/contact.service";

export default {
  data() {
    return {
      contact: {
        name: "",
        email: "",
        address: "",
        phone: "",
        favorite: false,
      },
      message: "",
    };
  },
  computed: {
    isEditMode() {
      return !!this.$route.params.id;
    },
    contactId() {
      return this.$route.params.id;
    },
  },
  methods: {
    async getContact(id) {
      try {
        this.contact = await ContactService.get(id);
      } catch (error) {
        console.log(error);
        this.message = "Không thể tải thông tin liên hệ.";
      }
    },
    async saveContact() {
      try {
        if (this.isEditMode) {
          await ContactService.update(this.contactId, this.contact);
          this.message = "Cập nhật liên hệ thành công!";
        } else {
          await ContactService.create(this.contact);
          this.message = "Thêm liên hệ thành công!";
        }
        setTimeout(() => {
          this.$router.push({ name: "contactbook" });
        }, 500);
      } catch (error) {
        console.log(error);
        this.message = "Có lỗi xảy ra khi lưu liên hệ.";
      }
    },
    async deleteContact() {
      if (confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) {
        try {
          await ContactService.delete(this.contactId);
          this.message = "Xóa liên hệ thành công!";
          setTimeout(() => {
            this.$router.push({ name: "contactbook" });
          }, 500);
        } catch (error) {
          console.log(error);
          this.message = "Có lỗi xảy ra khi xóa liên hệ.";
        }
      }
    },
    goBack() {
      this.$router.push({ name: "contactbook" });
    },
  },
  mounted() {
    if (this.isEditMode) {
      this.getContact(this.contactId);
    }
  },
};
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: auto;
}
</style>

