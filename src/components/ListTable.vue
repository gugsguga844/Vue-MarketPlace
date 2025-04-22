<script setup>
defineProps(['headers', 'rows'])
</script>

<template>
  <table class="table table-striped">
    <thead>
      <tr class="text-center">
        <th v-for="(header, index) in headers" :key="index">
          {{ header }}
        </th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex" class="text-center align-middle">
        <td v-for="(value, colIndex) in Object.values(row)" :key="colIndex">
          {{ value }}
        </td>
        <td>
          <div class="d-flex justify-content-center gap-2">
            <a class="bg-white rounded-3 border-1 border-dark-subtle p-2">
              <i class="bi bi-pencil-square text-black fa-lg"></i>
            </a>
            <button @click.prevent="$emit('remove', row.id)" class="bg-danger rounded-3 border-1 border-dark-subtle p-2">
              <i class="bi bi-trash3 text-white fa-lg"></i>
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>