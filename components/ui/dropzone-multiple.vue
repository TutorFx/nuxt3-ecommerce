<template>
  <div @drop.prevent="drop" @change="selectedFile">
    <div
      @dragenter.prevent="toggleActive"
      @dragleave.prevent="toggleActive"
      @dragover.prevent
      @drop.prevent="toggleActive"
      :class="{ 'active-dropzone': active }"
      class="dropzone"
    >
      <span>Drag or Drop File</span>
      <span>OR</span>
      <label for="dropzoneFile">Select File</label>
      <input type="file" id="dropzoneFile" class="dropzoneFile" />
    </div>
  </div>
  <div>
    <span class="max-w-4 max-h-4 aspect-square bg-gray-500" v-for="(image, i) in dropzoneFile" :key="i"
      ><nuxt-img
        width="200px"
        height="200px"
        class="object-cover"
        :src="URL.createObjectURL(image)"
      ></nuxt-img
    ></span>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "DropZone",
  setup() {
    const active = ref(false);

    const toggleActive = () => {
      active.value = !active.value;
    };

    let dropzoneFile = ref([]);

    const drop = (e) => {
      if (!e.dataTransfer.files[0].type.startsWith("image/")) return console.error("The dropped file is not an image!");
      if (e.dataTransfer.files[0].size > 5242880) return console.error("The dropped file is larger than 5MB!");
        dropzoneFile.value.push(e.dataTransfer.files[0]);
      
    };
    const selectedFile = () => {
      try {
        const file = document.querySelector(".dropzoneFile").files[0];
        if (!file.type.startsWith("image/")) return console.error("The selected file is not an image!");
        if (file.size > 5242880) return console.error("The dropped file is larger than 5MB!");
          dropzoneFile.value.push(file);
      } catch (e){
        console.error("Selection stopped by user.");
      }
      
    };

    return { active, toggleActive, dropzoneFile, drop, selectedFile, URL };
  },
};
</script>

<style scoped lang="scss">
.dropzone {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  @apply border-dashed border-2 rounded-xl;
  background-color: #fff;
  transition: 0.3s ease all;

  label {
    padding: 8px 12px;
    color: #fff;
    @apply bg-blue-600;
    transition: 0.3s ease all;
  }

  input {
    display: none;
  }
}

.active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: #41b883;

  label {
    background-color: #fff;
    color: #41b883;
  }
}
</style>
