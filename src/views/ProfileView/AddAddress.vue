<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
import FormInput from '@/components/FormInput.vue'
</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <h4 class="fw-bold m-0">Adicionar Endereço</h4>
    <ButtonComponent button-style="buttonBlack smallRadius" button-text="+ Adicionar Endereço" />
  </div>

  <div class="container-fluid border-1 border-dark border-opacity-10 rounded-1">
    <div class="title-info m-3">
      <h4 class="fw-bold">Informações do Endereço</h4>
      <p>Preencha os dados do seu novo endereço de entrega</p>

      <div class="row mb-4">
        <div class="col-12 col-lg-12 d-flex">
          <div class="addressType px-2">
            <input type="radio" name="addressType" id="addressType1" value="residential" />
            <label class="ml-1 form-check-label" for="addressType1">Residencial</label>
          </div>
          <div class="addressType px-2">
            <input type="radio" name="addressType" id="addressType2" value="commercial" />
            <label class="ml-1 form-check-label" for="addressType2">Comercial</label>
          </div>
          <div class="addressType px-2">
            <input type="radio" name="addressType" id="addressType3" value="other" />
            <label class="ml-1 form-check-label" for="addressType3">Outro</label>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-12 col-lg-6">
          <FormInput
            input-for="street"
            input-type="text"
            form-label="Rua/Avenida:"
            input-placeholder="Rua exemplo"
          />
        </div>
        <div class="col-12 col-lg-6">
          <FormInput
            input-for="number"
            input-type="text"
            form-label="Número:"
            input-placeholder="Número exemplo"
          />
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-6">
          <FormInput
            input-for="zip"
            input-type="text"
            form-label="CEP:"
            input-placeholder="CEP exemplo"
          />
        </div>
        <div class="col-6">
          <FormInput
            input-for="city"
            input-type="text"
            form-label="Cidade:"
            input-placeholder="Cidade exemplo"
          />
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-6">
          <FormInput
            input-for="state"
            input-type="text"
            form-label="Estado:"
            input-placeholder="Estado"
          />
        </div>
        <div class="col-6">
          <FormInput
            input-for="country"
            input-type="text"
            form-label="Estado:"
            input-placeholder="País"
          />
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-12">
          <div class="form-check form-switch d-flex align-items-center">
            <input
              class="form-check-input border-0 shadow-none"
              type="checkbox"
              role="switch"
              id="switchCheckDefault"
            />
            <div class="d-flex flex-column">
              <label class="form-check-label" for="switchCheckDefault"
                ><i class="bi bi-star"></i> Definir como endereço padrão</label
              >
              <label class="form-check-label" for="switchCheckDefault"
                >Este endereço será usado automaticamente nas suas compras</label
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-12 d-flex justify-content-between">
          <ButtonComponent
            class="border-1"
            button-style="buttonDelete bigRadius"
            button-text="Excluir Conta"
          />
          <ButtonComponent
            button-type="submit"
            button-style="buttonBlack bigRadius"
            button-text="Salvar Alterações"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-check-input {
  background-color: #e0e0e0; /* Cor de fundo do switch */
  box-shadow: none !important;
}

/* O "círculo" interno do switch (thumb) */

.form-check-input:checked {
  background-color: #000; /* cor da área ativa */
  border-color: #000;
}

/* Círculo interno (o thumb) */
.form-check-input::after {
  background-color: #ff0000 !important; /* nova cor do círculo */
}
</style>
