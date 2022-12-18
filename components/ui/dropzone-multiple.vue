<template>
  <div>
    <div @drop.prevent="drop" @change="selectedFile">
      <div
        @dragenter.prevent="toggleActive"
        @dragleave.prevent="toggleActive"
        @dragover.prevent
        @drop.prevent="toggleActive"
        :class="{ 'active-dropzone': active }"
        class="dropzone"
      >
        <span>Arraste</span>
        <span>ou</span>
        <label for="dropzoneFile" class="rounded-md">Selecione seu Arquivo</label>
        <input type="file" id="dropzoneFile" ref="dropRef" class="dropzoneFile" />
      </div>
    </div>
    <div
      v-if="dropzoneFile?.length > 0"
      ref="parent"
      @click.prevent
      class="grid gap-4 grid-cols-3 mt-4 mb-4"
    >
      <div
        class="rounded-lg relative"
        style="aspect-ratio: 1"
        v-for="(image, i) in dropzoneFile"
        :key="i"
      >
        <nuxt-img
          v-if="image"
          class="object-cover rounded-lg w-full h-full"
          :src="url.createObjectURL(image)"
        />
        <XMarkIcon
          class="absolute right-0 top-0 h-6 w-6 bg-white rounded-full m-2 p-1"
          @click="dropzoneFile.splice(i, 1)"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline/index.js";
import { useAutoAnimate } from "@formkit/auto-animate/vue";

const emit = defineEmits(["update:dropzoneFile"]);
const props = defineProps({
  dropzoneFile: {
    required: true,
    type: Array,
  },
}); 
const dropzoneFile = ref(props.dropzoneFile);
const dropRef = ref(null);


const active = ref(false);
const toggleActive = () => {
  active.value = !active.value;
};

let url = URL;

const drop = (e) => {
  if (!e.dataTransfer.files[0].type.startsWith("image/"))
    return console.error("The dropped file is not an image!");
  if (e.dataTransfer.files[0].size > 5242880)
    return console.error("The dropped file is larger than 5MB!");
  dropzoneFile.value.push(e.dataTransfer.files[0]);
};
const selectedFile = () => {
  try {
    const file = dropRef.value.files[0];
    if (!file.type.startsWith("image/"))
      return console.error("The selected file is not an image!");
    if (file.size > 5242880)
      return console.error("The dropped file is larger than 5MB!");
    dropzoneFile.value.push(file);
  } catch (e) {
    console.error("Selection stopped by user.");
  }
};
// emit to parent on change

watch(
  () => dropzoneFile,
  (newValue, oldValue) => {
    emit("update:dropzoneFile", newValue);
  },
  { deep: true }
);
// animate
const [parent] = useAutoAnimate();
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
  @apply bg-black border-none;

  label {
    background-color: #fff;
    @apply text-black;
  }
}
</style>
