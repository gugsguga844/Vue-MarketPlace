<script setup>
import FormInput from '@/components/FormInput.vue';
import { createCoupon } from '@/services/HttpService';
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/auth';
import ProfileCardTitle from '@/components/ProfileCardTitle.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';
import ListTable from '@/components/ListTable.vue';
import ModalComponent from '@/components/ModalComponent.vue';
import { useCouponStore } from '@/stores/couponStore';

const auth = useAuthStore()
const toast = useToast()
const couponCode = ref('')
const couponPercentage = ref('')
const couponStartDate = ref('')
const couponEndDate = ref('')
const useCoupons = useCouponStore()

async function saveCoupon() {
  const token = auth.token
  const response = await createCoupon(token, {
    code: couponCode.value,
    discount_percentage: couponPercentage.value,
    start_date: couponStartDate.value,
    end_date: couponEndDate.value,
  })

  if (response.status === 201) {
    toast.success('Cupom criado com sucesso')
    useCoupons.saveNewCoupon(response.data)
    cleanCoupon()
  } else {
    toast.error('Erro ao criar cupom')
  }
}

function cleanCoupon() {
  couponCode.value = ''
  couponPercentage.value = ''
  couponStartDate.value = ''
  couponEndDate.value = ''
}

async function removeCoupon(coupon_id) {
  const token = auth.token
  const response = await removeCoupon(coupon_id, token)

  if (response.status === 204) {
    toast.success('Cupom removido com sucesso')
  } else {
    toast.error('Erro ao remover cupom')
  }
}

onMounted(() => {
  useCoupons.saveCoupons()
})
</script>

<template>
  <form @submit.prevent="saveCoupon" class="container-fluid border-3 border-dark border-opacity-10 rounded-1 p-4 mb-4">
    <ProfileCardTitle
      profile-card-title="Adicionar Novo Cupom"
      profile-card-description="Adicione um novo cupom ao sistema."
    />
    <div class="row">
      <div class="col-12 col-md-6">
        <FormInput
          input-for="descricao"
          input-type="text"
          form-label="Descrição do Desconto"
          input-placeholder="Descrição do desconto"
          v-model="couponCode"
        />
      </div>
      <div class="col-12 col-md-6">
        <FormInput
          input-for="percentage"
          input-type="number"
          form-label="Porcentagem do Desconto"
          input-placeholder="Porcentagem do desconto"
          v-model="couponPercentage"
        />
      </div>
    </div>
    <div class="row">

      <div class="col-md-6">
        <FormInput
          input-for="estoque"
          input-type="date"
          form-label="Data de Início do Desconto"
          input-placeholder="Data de início do desconto"
          v-model="couponStartDate"
        />
      </div>

      <div class="col-md-6">
        <FormInput
          input-for="estoque"
          input-type="date"
          form-label="Data de Fim do Desconto"
          input-placeholder="Data de fim do desconto"
          v-model="couponEndDate"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-md-12">
        <div class="d-flex gap-4">
          <ButtonComponent
            class="w-100"
            button-type="submit"
            button-style="buttonBlack smallRadius"
            button-text="Cadastrar Cupom"
          />
        </div>
      </div>
    </div>
  </form>

  <div class="container-fluid border-3 border-dark border-opacity-10 rounded-1 p-4">
    <ProfileCardTitle profile-card-title="Gerenciar Cupons" profile-card-description="Gerencie os cupons do sistema." />
    <ListTable
      :headers="['Código do Cupom', 'Porcentagem', 'Data de Início', 'Data de Fim', 'ID do Cupom']"
      :rows="useCoupons.coupons"
      @edit="editCoupon"
      @remove="removeCoupon"
    />
    <ModalComponent
      :show="showModal"
      modal-title="Editar Cupom"
      @close="showModal = false"
      @save="saveEditedCoupon"
    >
      <template #body>
        <div class="row">
          <div class="col-12">
            <FormInput
              input-for="code"
              input-type="text"
              form-label="Código do Cupom"
              input-placeholder="Código do cupom"
              v-model="editCode"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <FormInput
              input-for="percentage"
              input-type="number"
              form-label="Porcentagem do Cupom"
              input-placeholder="Porcentagem do cupom"
              v-model="editPercentage"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <FormInput
              input-for="start_date"
              input-type="date"
              form-label="Data de Início do Cupom"
              input-placeholder="Data de início do cupom"
              v-model="editStartDate"
            />
          </div>
        </div>
        <div class="row mb-4">
          <div class="col-12">
            <FormInput
              input-for="end_date"
              input-type="date"
              form-label="Data de Fim do Cupom"
              input-placeholder="Data de fim do cupom"
              v-model="editEndDate"
            />
          </div>
        </div>
      </template>
    </ModalComponent>
  </div>
</template>
