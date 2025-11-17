<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>

    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>
      <ContactList
          v-if="filteredContactsCount > 0"
          :contacts="filteredContacts"
          v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có liên hệ nào.</p>

      <div class="mt-3 row">
        <div class="col-4 px-1">
          <button class="btn btn-sm btn-primary btn-block" @click="refreshList()">
            <i class="fas fa-redo"></i> Làm mới
          </button>
        </div>
        <div class="col-4 px-1">
          <button class="btn btn-sm btn-success btn-block" @click="goToAddContact">
            <i class="fas fa-plus"></i> Thêm mới
          </button>
        </div>
        <div class="col-4 px-1">
          <button class="btn btn-sm btn-danger btn-block" @click="removeAllContacts">
            <i class="fas fa-trash"></i> Xóa tất cả
          </button>
        </div>
      </div>
    </div>

    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
        <ContactCard
          :contact="activeContact"
          @edit="goToEditContact"
          @delete="onDeleteContact"
        />
      </div>
    </div>
  </div>
</template>
<script>
import ContactCard from "@/components/ContactCard.vue";
import ContactList from "@/components/ContactList.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactCard,
    ContactList,
    InputSearch,
  },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    contactStrings() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("");
      });
    },
    // Trả về các contact có chứa thông tin cần tìm kiếm.
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((_contact, index) =>
          this.contactStrings[index].includes(this.searchText)
      );
    },
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },
    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    async removeAllContacts() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
    goToEditContact(contact) {
      this.$router.push({
        name: "contact.edit",
        params: { id: contact._id }
      });
    },
    async onDeleteContact(contact) {
      if (confirm(`Bạn có chắc chắn muốn xóa liên hệ "${contact.name}"?`)) {
        try {
          await ContactService.delete(contact._id);
          this.refreshList();
        } catch (error) {
          console.log(error);
          alert("Có lỗi xảy ra khi xóa liên hệ.");
        }
      }
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
